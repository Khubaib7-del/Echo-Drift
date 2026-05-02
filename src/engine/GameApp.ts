import * as PIXI from 'pixi.js';
import type { LevelData, Rect } from './levels';
import { LEVELS } from './levels';

export class GameApp {
   public app: PIXI.Application;
   private player!: PIXI.Graphics;
   private echo!: PIXI.Graphics;
   private timelineDelay: number = 60 * 3.5; // 3.5 seconds at 60fps
   private history: { x: number, y: number }[] = [];

   // Inputs
   private keys: Record<string, boolean> = {};

   // Player physics state
   private velocity: { x: number, y: number } = { x: 0, y: 0 };
   private readonly gravity = 0.5;
   private readonly jumpStrength = -12;
   private readonly speed = 5;
   private currentLevelIndex: number = 1;
   private onWinCallback?: (levelPassed: number) => void;
   private onFailCallback?: () => void;
   private isGrounded = false;
   private isGameOver = false;
   public onStabilityUpdate?: (stability: number) => void;
   private currentStability = 100;
   private lastStability = -1;
   public onVelocityUpdate?: (velocity: number) => void;
   private lastVelocity = -1;

   public onDashUpdate?: (cooldown: number) => void;
   public onProximityUpdate?: (distance: number) => void;
   public onProgressUpdate?: (progress: number) => void;

   private shakeTime = 0;
   private shakeAmount = 0;

   // Dash Protocol
   private dashCooldown = 0;
   private readonly dashDuration = 10; // frames
   private dashTime = 0;
   private dashVelocity = { x: 0, y: 0 };
   private isDashing = false;

    // Stats for Telemetry
    private maxVelocityObserved = 0;
    private closeCallCount = 0;
    private dashCount = 0;
    private hasReachedCloseRange = false;

   private particles: { graphics: PIXI.Graphics, vx: number, vy: number, life: number }[] = [];

   private triggerShake(amount: number) {
       this.shakeTime = 15; // 0.25s
       this.shakeAmount = amount;
   }

   private spawnParticles(x: number, y: number, color: number, count: number) {
       for (let i = 0; i < count; i++) {
           const p = new PIXI.Graphics();
           p.rect(0, 0, 4, 4);
           p.fill(color);
           p.x = x;
           p.y = y;
           this.particles.push({
               graphics: p,
               vx: (Math.random() - 0.5) * 10,
               vy: (Math.random() - 0.5) * 10,
               life: 1.0
           });
           this.app.stage.addChild(p);
       }
   }

   private performDash() {
       if (!this.player || this.dashCooldown > 0 || this.isDashing) return;
       this.isDashing = true;
       this.dashTime = this.dashDuration;
       this.dashCooldown = 60; // 1 second cooldown
       this.dashCount++;
       const dir = this.keys['arrowright'] || this.keys['d'] ? 1 : (this.keys['arrowleft'] || this.keys['a'] ? -1 : 0);
       this.dashVelocity = { x: dir * 20, y: 0 };
       this.spawnParticles(this.player.x, this.player.y, 0xffffff, 10);
   }

   // Level specific mechanics
   private levelData!: LevelData;
   private platforms: { 
     graphics: PIXI.Graphics, 
     rect: import('./levels').Rect, 
     type: 'stable' | 'fragile' | 'trap' | 'moving', 
     isCrumbling: boolean, 
     crumbleTimer: number, 
     isGone: boolean,
     trapTimer: number,
     isTrapOpen: boolean
   }[] = [];
   private movingPlatforms: {
     graphics: PIXI.Graphics,
     data: import('./levels').MovingPlatformData,
     originX: number,
     originY: number,
     time: number
   }[] = [];
   private doors: { graphics: PIXI.Graphics, rect: Rect, isOpen: boolean }[] = [];
   private buttons: { graphics: PIXI.Graphics, rect: Rect, targetDoorIndex: number, isPressed: boolean }[] = [];
   private goalGraphics!: PIXI.Graphics;
   private hazards: PIXI.Graphics[] = [];
   private enemies: { graphics: PIXI.Graphics, data: import('./levels').EnemyData, originX: number, originY: number, time: number }[] = [];
   private collectibles: { graphics: PIXI.Graphics, data: import('./levels').CollectibleData }[] = [];

   constructor() {
      this.app = new PIXI.Application();
   }

   public async init(canvas: HTMLCanvasElement, onWin?: (levelPassed: number) => void, onFail?: () => void) {
      this.onWinCallback = onWin;
      this.onFailCallback = onFail;

      await this.app.init({
         canvas,
         resizeTo: window,
         backgroundAlpha: 0,
         resolution: window.devicePixelRatio || 1,
         autoDensity: true,
      });

      this.setupBackground();
      this.setupInput();

      this.app.ticker.add((time) => {
         if (this.levelData && !this.isGameOver && !this.isPaused) this.update(time.deltaTime);
      });
   }

   private isPaused = true;

   public stopGame() {
      this.isPaused = true;
   }

   public loadLevel(levelIndex: number) {
    this.isPaused = false;
    this.currentLevelIndex = levelIndex;
    this.levelData = LEVELS[levelIndex - 1] || LEVELS[0];

    // Scale echo delay: starts at 3.5s (210 frames), drops to 1s (60 frames) at level 55
    const delayFrames = Math.max(60, 210 - (levelIndex - 1) * 2.8);
    this.timelineDelay = Math.floor(delayFrames);

    // Clear previous
    this.platforms.forEach(p => p.graphics?.destroy());
    this.movingPlatforms.forEach(p => p.graphics?.destroy());
    this.doors.forEach(d => d.graphics?.destroy());
    this.buttons.forEach(b => b.graphics?.destroy());
    this.hazards.forEach(h => h?.destroy());
    this.enemies.forEach(e => e.graphics?.destroy());
    this.collectibles.forEach(c => c.graphics?.destroy());
    if (this.goalGraphics) this.goalGraphics.destroy();
    if (this.player) this.player.destroy();
    if (this.echo) this.echo.destroy();

      this.platforms = [];
      this.movingPlatforms = [];
      this.doors = [];
      this.buttons = [];
      this.hazards = [];
      this.enemies = [];
      this.collectibles = [];
      this.isGameOver = false;

      this.setupLevel();
      this.setupEntities();
   }

   private setupBackground() {
      const grid = new PIXI.Graphics();
      for (let i = 0; i < 2000; i += 100) {
         grid.moveTo(i, 0).lineTo(i, 2000);
         grid.moveTo(0, i).lineTo(2000, i);
      }
      grid.stroke({ width: 1, color: 0x006970, alpha: 0.2 });
      this.app.stage.addChild(grid);
   }

   private setupLevel() {
      // Platforms
      this.levelData.platforms.forEach(p => {
         const g = new PIXI.Graphics();
         g.rect(p.x, p.y, p.w, p.h);
         
         let color = 0x1b1b20;
         let stroke = 0x006970;
         if (p.type === 'fragile') { color = 0x2b2b10; stroke = 0xaaaa00; }
         if (p.type === 'trap') { color = 0x2b1010; stroke = 0xaa0000; }
         
         g.fill(color);
         g.stroke({ width: 2, color: stroke });
         this.platforms.push({ 
            graphics: g, 
            rect: { ...p }, 
            type: p.type || 'stable', 
            isCrumbling: false, 
            crumbleTimer: 0, 
            isGone: false,
            trapTimer: 0,
            isTrapOpen: false
         });
         this.app.stage.addChild(g);
      });

      // Moving Platforms
      this.levelData.movingPlatforms?.forEach(p => {
          const g = new PIXI.Graphics();
          g.rect(0, 0, p.w, p.h);
          g.fill(0x102b2b);
          g.stroke({ width: 2, color: 0x00aaaa });
          this.movingPlatforms.push({
              graphics: g,
              data: { ...p },
              originX: p.x,
              originY: p.y,
              time: Math.random() * 100
          });
          this.app.stage.addChild(g);
      });

      // Doors
      this.levelData.doors.forEach(d => {
         const g = new PIXI.Graphics();
         g.rect(d.x, d.y, d.w, d.h);
         g.fill({ color: 0xff0055, alpha: 0.5 }); // Magenta laser door
         this.doors.push({ graphics: g, rect: d, isOpen: false });
         this.app.stage.addChild(g);
      });

      // Buttons
      this.levelData.buttons.forEach(b => {
         const g = new PIXI.Graphics();
         g.rect(b.x, b.y, b.w, b.h);
         g.fill({ color: 0x00f0ff, alpha: 0.5 });
         this.buttons.push({ graphics: g, rect: b, targetDoorIndex: b.targetDoorIndex, isPressed: false });
         this.app.stage.addChild(g);
      });

      // Hazards
      this.levelData.hazards.forEach(h => {
         const g = new PIXI.Graphics();
         g.rect(h.x, h.y, h.w, h.h);
         g.fill({ color: 0x220000, alpha: 0.8 });
         this.hazards.push(g);
         this.app.stage.addChild(g);
      });

      // Goal
      this.goalGraphics = new PIXI.Graphics();
      this.goalGraphics.rect(this.levelData.goal.x, this.levelData.goal.y, this.levelData.goal.w, this.levelData.goal.h);
      this.goalGraphics.fill({ color: 0x00f0ff, alpha: 0.2 });
      this.goalGraphics.stroke({ width: 2, color: 0x00f0ff });
      this.app.stage.addChild(this.goalGraphics);

      // Enemies
      this.levelData.enemies.forEach(e => {
         const g = new PIXI.Graphics();
         if (e.type === 'spike') {
             g.poly([0, e.h, e.w / 2, 0, e.w, e.h]);
         } else {
             g.rect(0, 0, e.w, e.h);
         }
         g.x = e.x;
         g.y = e.y;
         g.fill({ color: e.type === 'flyer' ? 0xffff00 : 0xff00ff, alpha: 0.9 });
         g.stroke({ color: 0xffffff, width: 1 });
         this.enemies.push({ graphics: g, data: { ...e }, originX: e.x, originY: e.y, time: Math.random() * 100 });
         this.app.stage.addChild(g);
      });

      // Collectibles
      this.levelData.collectibles?.forEach(c => {
         const g = new PIXI.Graphics();
         g.poly([0, -10, 10, 0, 0, 10, -10, 0]); // Diamond shape
         g.x = c.x + c.w / 2;
         g.y = c.y + c.h / 2;
         g.fill({ color: c.type === 'gem' ? 0xffff00 : 0x00ff00, alpha: 0.9 });
         g.stroke({ color: 0xffffff, width: 1 });
         this.collectibles.push({ graphics: g, data: { ...c, collected: false } });
         this.app.stage.addChild(g);
      });
   }

   private setupEntities() {
      this.echo = new PIXI.Graphics();
      this.echo.rect(0, 0, 40, 80);
      this.echo.fill({ color: 0x00f0ff, alpha: 0.4 });
      this.app.stage.addChild(this.echo);

      this.player = new PIXI.Graphics();
      this.player.rect(0, 0, 40, 80);
      this.player.fill(0xffffff);

      this.resetPlayer();

      this.app.stage.addChild(this.player);
   }

   public getDashCooldown() { return this.dashCooldown; }
   public getEchoDistance() {
       if (!this.player || !this.echo) return 1000;
       const dx = this.player.x - this.echo.x;
       const dy = this.player.y - this.echo.y;
       return Math.sqrt(dx*dx + dy*dy);
   }
   public getProgress() {
       if (!this.levelData || !this.player) return 0;
       const total = this.levelData.goal.x - this.levelData.spawn.x;
       const current = this.player.x - this.levelData.spawn.x;
       return Math.max(0, Math.min(1, current / total));
   }

   public getMissionStats() {
       return {
           maxVelocity: this.maxVelocityObserved,
           closeCalls: this.closeCallCount,
           dashCount: this.dashCount
       };
   }

   private triggerGameOver() {
      this.isGameOver = true;
      if (this.onFailCallback) this.onFailCallback();
   }

   private resetPlayer() {
      this.player.x = this.levelData.spawn.x;
      this.player.y = this.levelData.spawn.y;
      this.velocity = { x: 0, y: 0 };
      this.history = [];
      this.echo.x = this.player.x;
      this.echo.y = this.player.y;
      this.isGameOver = false;
      this.currentStability = 100;

      // Reset Camera
      this.app.stage.x = 0;

      // Reset platforms
      this.platforms.forEach(p => {
          p.isCrumbling = false;
          p.crumbleTimer = 0;
          p.isGone = false;
          p.isTrapOpen = false;
          p.trapTimer = 0;
          p.graphics.alpha = 1;
      });

      // Respawn uncollected gems
      this.collectibles.forEach(c => {
         c.data.collected = false;
         c.graphics.visible = true;
      });

      // Reset Stats
      this.dashCount = 0;
      this.closeCallCount = 0;
      this.maxVelocityObserved = 0;
      this.hasReachedCloseRange = false;
   }

   private setupInput() {
      window.addEventListener('keydown', (e) => this.keys[e.key.toLowerCase()] = true);
      window.addEventListener('keyup', (e) => this.keys[e.key.toLowerCase()] = false);
   }

   // AABB Math
   private checkOverlap(r1: { x: number, y: number, w: number, h: number }, r2: { x: number, y: number, w: number, h: number }): boolean {
      return r1.x < r2.x + r2.w &&
         r1.x + r1.w > r2.x &&
         r1.y < r2.y + r2.h &&
         r1.y + r1.h > r2.y;
   }

   private update(dt: number) {
      if (this.keys['m']) {
         if (this.onWinCallback) this.onWinCallback(this.currentLevelIndex);
         this.keys['m'] = false;
      }

       // Dash Trigger
       if (this.keys['shift']) this.performDash();
       if (this.dashCooldown > 0) this.dashCooldown -= dt;
       if (this.dashTime > 0) {
           this.dashTime -= dt;
           this.velocity.x = this.dashVelocity.x;
           this.velocity.y = this.dashVelocity.y;
           if (this.dashTime <= 0) this.isDashing = false;
       }

       // Momentum-based Movement
       const accel = 0.6;
       const friction = 0.85;
       const maxSpeed = this.speed;

       if (!this.isDashing) {
           if (this.keys['arrowright'] || this.keys['d']) {
               this.velocity.x += accel;
               if (this.velocity.x > maxSpeed) this.velocity.x = maxSpeed;
           } else if (this.keys['arrowleft'] || this.keys['a']) {
               this.velocity.x -= accel;
               if (this.velocity.x < -maxSpeed) this.velocity.x = -maxSpeed;
           } else {
               this.velocity.x *= friction;
               if (Math.abs(this.velocity.x) < 0.1) this.velocity.x = 0;
           }
       }
 
       // Jump
       if ((this.keys['arrowup'] || this.keys['w'] || this.keys[' ']) && this.isGrounded && !this.isDashing) {
          this.velocity.y = this.jumpStrength;
          this.isGrounded = false;
          this.triggerShake(2); // Small jump shake
       }
 
       // Gravity
       if (!this.isDashing) this.velocity.y += this.gravity * dt;
 
       // Move X
       this.player.x += this.velocity.x * dt;
       this.resolveCollisions(true);
 
       // Move Y
       this.player.y += this.velocity.y * dt;
       const wasGrounded = this.isGrounded;
       this.isGrounded = false;
       this.resolveCollisions(false);
       
       // Impact Shake
       if (this.isGrounded && !wasGrounded && this.velocity.y > 5) {
           this.triggerShake(this.velocity.y * 0.5);
       }

       // Particle Update
       this.particles.forEach((p, idx) => {
           p.graphics.x += p.vx * dt;
           p.graphics.y += p.vy * dt;
           p.life -= 0.05 * dt;
           p.graphics.alpha = p.life;
           if (p.life <= 0) {
               p.graphics.destroy();
               this.particles.splice(idx, 1);
           }
       });

      // Camera Follow (Horizontal) with Shake
      const targetX = (window.innerWidth / 2) - this.player.x;
      this.app.stage.x += (targetX - this.app.stage.x) * 0.1;
      
      if (this.shakeTime > 0) {
          this.shakeTime -= dt;
          this.app.stage.x += (Math.random() - 0.5) * this.shakeAmount;
          this.app.stage.y = (Math.random() - 0.5) * this.shakeAmount;
      } else {
          this.app.stage.y = 0;
      }

      // Game Logic Checks
      this.updateEchoLogic();
      this.updatePlatforms(dt);
      this.updateEnemies(dt);
      this.updateCollectibles(dt);
      this.checkInteractions(dt);

      // Stats tracking
      const currentVel = Math.abs(this.velocity.x);
      if (currentVel > this.maxVelocityObserved) this.maxVelocityObserved = currentVel;
      
      const dist = this.getEchoDistance();
      if (dist < 120) {
          if (!this.hasReachedCloseRange) {
              this.closeCallCount++;
              this.hasReachedCloseRange = true;
          }
      } else {
          this.hasReachedCloseRange = false;
      }

      // HUD Updates
      if (this.onDashUpdate) this.onDashUpdate(this.dashCooldown);
      if (this.onProximityUpdate) this.onProximityUpdate(this.getEchoDistance());
      if (this.onProgressUpdate) this.onProgressUpdate(this.getProgress());

      // Dynamic Stability (Temporal Sync System)
      let drainRate = 0.8; // Base drain for time spent
      
      if (dist < 200) {
          // Intense drain when echo is near
          drainRate += ((200 - dist) / 200) * 10;
      }

      this.currentStability -= drainRate * (dt / 60);
      if (this.currentStability <= 0) {
          this.currentStability = 0;
          if (!this.isGameOver) this.triggerGameOver();
      }

      const rawVal = Math.max(0, Math.min(100, this.currentStability));
      if (Math.abs(rawVal - this.lastStability) > 0.5) {
         this.lastStability = rawVal;
         if (this.onStabilityUpdate) this.onStabilityUpdate(rawVal);
      }

      const playerSpeed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
      const displayVel = parseFloat((playerSpeed * 6.8).toFixed(1));
      if (displayVel !== this.lastVelocity) {
         this.lastVelocity = displayVel;
         if (this.onVelocityUpdate) this.onVelocityUpdate(displayVel);
      }
   }

   private getActiveColliders(): import('./levels').Rect[] {
      const list: import('./levels').Rect[] = [];
      this.platforms.forEach(p => {
         if (!p.isGone && !p.isTrapOpen) list.push(p.rect);
      });
      this.movingPlatforms.forEach(p => {
          list.push({ x: p.graphics.x, y: p.graphics.y, w: p.data.w, h: p.data.h });
      });
      this.doors.forEach(d => {
         if (!d.isOpen) list.push(d.rect);
      });
      return list;
   }

   private resolveCollisions(isXAxis: boolean) {
      const playerRect = { x: this.player.x, y: this.player.y, w: 40, h: 80 };
      const colliders = this.getActiveColliders();

      for (const c of colliders) {
         if (this.checkOverlap(playerRect, c)) {
            if (isXAxis) {
               if (this.velocity.x > 0) this.player.x = c.x - playerRect.w;
               else if (this.velocity.x < 0) this.player.x = c.x + c.w;
               this.velocity.x = 0;
            } else {
               if (this.velocity.y > 0) {
                  this.player.y = c.y - playerRect.h;
                  this.isGrounded = true;

                  const pRef = this.platforms.find(p => p.rect === c);
                  if (pRef && pRef.type === 'fragile' && !pRef.isCrumbling) {
                     pRef.isCrumbling = true;
                  }
               } else if (this.velocity.y < 0) {
                  this.player.y = c.y + c.h;
               }
               this.velocity.y = 0;
            }
            playerRect.x = this.player.x;
            playerRect.y = this.player.y;
         }
      }
   }

   private updatePlatforms(dt: number) {
       // Moving Platforms
       this.movingPlatforms.forEach(p => {
           p.time += dt * 0.02 * p.data.speed;
           const oldX = p.graphics.x;
           const oldY = p.graphics.y;
           
           p.graphics.x = p.originX + Math.sin(p.time) * (p.data.rangeX || 0);
           p.graphics.y = p.originY + Math.cos(p.time) * (p.data.rangeY || 0);
           
           // Carry player
           if (this.isGrounded) {
               const playerRect = { x: this.player.x, y: this.player.y + 1, w: 40, h: 80 };
               const platformRect = { x: oldX, y: oldY, w: p.data.w, h: p.data.h };
               if (this.checkOverlap(playerRect, platformRect)) {
                   this.player.x += p.graphics.x - oldX;
                   this.player.y += p.graphics.y - oldY;
               }
           }
       });

       // Trap Platforms
       this.platforms.forEach(p => {
           if (p.type === 'trap') {
               p.trapTimer += dt;
               if (p.trapTimer > 120) { // Every 2 seconds
                   p.isTrapOpen = !p.isTrapOpen;
                   p.trapTimer = 0;
                   p.graphics.alpha = p.isTrapOpen ? 0.1 : 1;
               } else if (p.trapTimer > 90) { // Warning flicker
                   p.graphics.alpha = (Math.floor(p.trapTimer / 5) % 2 === 0) ? 1 : 0.5;
               }
           }
       });
   }

   private updateEchoLogic() {
      this.history.push({ x: this.player.x, y: this.player.y });
      if (this.history.length > this.timelineDelay) {
         const pastState = this.history.shift();
         if (pastState) {
            this.echo.x = pastState.x;
            this.echo.y = pastState.y;
         }
      } else {
         this.echo.x = this.history[0]?.x ?? this.player.x;
         this.echo.y = this.history[0]?.y ?? this.player.y;
      }
   }

   private updateEnemies(dt: number) {
      const pRect = { x: this.player.x, y: this.player.y, w: 40, h: 80 };
      const patrolDistance = 100;

      for (const enemy of this.enemies) {
         if (enemy.data.type === 'flyer') {
             enemy.time += dt * 0.05;
             enemy.data.x += enemy.data.vx * dt;
             enemy.data.y = enemy.originY + Math.sin(enemy.time) * (enemy.data.rangeY || 50);
             
             if (enemy.data.x > enemy.originX + patrolDistance * 2 || enemy.data.x < enemy.originX - patrolDistance * 2) {
                 enemy.data.vx *= -1;
             }
         } else if (enemy.data.type === 'patrol') {
             enemy.data.x += enemy.data.vx * dt;
             if (enemy.data.x > enemy.originX + patrolDistance || enemy.data.x < enemy.originX - patrolDistance) {
               enemy.data.vx *= -1;
             }
         }
         
         enemy.graphics.x = enemy.data.x;
         enemy.graphics.y = enemy.data.y;

         // Hit detection
         if (this.checkOverlap(pRect, enemy.data)) {
            this.triggerGameOver();
            return;
         }
      }
   }

   private updateCollectibles(dt: number) {
      const pRect = { x: this.player.x, y: this.player.y, w: 40, h: 80 };
      for (const c of this.collectibles) {
         if (!c.data.collected) {
            c.graphics.rotation += 0.05 * dt;
            if (this.checkOverlap(pRect, c.data)) {
               c.data.collected = true;
               c.graphics.visible = false;
            }
         }
      }
   }

   private checkInteractions(dt: number) {
      const pRect = { x: this.player.x, y: this.player.y, w: 40, h: 80 };
      const eRect = { x: this.echo.x, y: this.echo.y, w: 40, h: 80 };

      if (this.history.length > this.timelineDelay - 10) {
         const eRectCore = { x: this.echo.x + 10, y: this.echo.y + 10, w: 20, h: 60 };
         if (this.checkOverlap(pRect, eRectCore)) {
            this.triggerGameOver();
            return;
         }
      }

      // Fragile platforms update
      this.platforms.forEach(p => {
         if (p.type === 'fragile' && p.isCrumbling && !p.isGone) {
            p.crumbleTimer += dt;
            p.graphics.x = p.rect.x + (Math.random() - 0.5) * 4;
            if (p.crumbleTimer > 60) {
               p.isGone = true;
               p.graphics.alpha = 0;
               this.triggerShake(10); // Sudden drop shake
            } else if (p.crumbleTimer > 40) {
               p.graphics.alpha = 0.5;
            }
         }
      });

      // Buttons
      this.buttons.forEach((b) => {
         const isPressed = this.checkOverlap(pRect, b.rect) || this.checkOverlap(eRect, b.rect);
         b.isPressed = isPressed;
         b.graphics.alpha = isPressed ? 1 : 0.5;

         const targetDoor = this.doors[b.targetDoorIndex];
         if (targetDoor) {
            targetDoor.isOpen = isPressed;
            targetDoor.graphics.alpha = isPressed ? 0.1 : 0.5;
         }
      });

      // Hazards
      for (const h of this.levelData.hazards) {
         if (this.checkOverlap(pRect, h)) {
            this.triggerGameOver();
            return;
         }
      }

      if (this.checkOverlap(pRect, this.levelData.goal)) {
         if (this.onWinCallback && !this.isGameOver) {
            this.isGameOver = true;
            this.onWinCallback(this.currentLevelIndex);
         }
      }
   }

   public destroy() {
      try {
         this.app.destroy(true);
      } catch (e) { }
   }
}
