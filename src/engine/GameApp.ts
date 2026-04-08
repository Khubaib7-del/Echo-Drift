import * as PIXI from 'pixi.js';
import type { LevelData, Rect } from './levels';
import { LEVELS } from './levels';

export class GameApp {
  public app: PIXI.Application;
  private player!: PIXI.Graphics;
  private echo!: PIXI.Graphics;
  private timelineDelay: number = 60 * 2; // 2 seconds at 60fps
  private history: {x: number, y: number}[] = [];

  // Inputs
  private keys: Record<string, boolean> = {};

  // Player physics state
  private velocity: {x: number, y: number} = {x: 0, y: 0};
  private readonly gravity = 0.5;
  private readonly jumpStrength = -12;
  private readonly speed = 5;
  private currentLevelIndex: number = 1;
  private onWinCallback?: (levelPassed: number) => void;
  private isGrounded = false;

  // Level specific mechanics
  private levelData!: LevelData;
  private platforms: PIXI.Graphics[] = [];
  private doors: { graphics: PIXI.Graphics, rect: Rect, isOpen: boolean }[] = [];
  private buttons: { graphics: PIXI.Graphics, rect: Rect, targetDoorIndex: number, isPressed: boolean }[] = [];
  private goalGraphics!: PIXI.Graphics;
  private hazards: PIXI.Graphics[] = [];
  private enemies: { graphics: PIXI.Graphics, data: import('./levels').EnemyData, originX: number }[] = [];

  constructor() {
    this.app = new PIXI.Application();
  }

  public async init(canvas: HTMLCanvasElement, onWin?: (levelPassed: number) => void) {
    this.onWinCallback = onWin;

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
        if (this.levelData) this.update(time.deltaTime);
    });
  }

  public loadLevel(levelIndex: number) {
    this.currentLevelIndex = levelIndex;
    this.levelData = LEVELS[levelIndex - 1] || LEVELS[0];
    
    // Clear previous
    this.platforms.forEach(p => p.destroy());
    this.doors.forEach(d => d.graphics.destroy());
    this.buttons.forEach(b => b.graphics.destroy());
    this.hazards.forEach(h => h.destroy());
    this.enemies.forEach(e => e.graphics.destroy());
    if (this.goalGraphics) this.goalGraphics.destroy();
    if (this.player) this.player.destroy();
    if (this.echo) this.echo.destroy();

    this.platforms = [];
    this.doors = [];
    this.buttons = [];
    this.hazards = [];
    this.enemies = [];

    this.setupLevel();
    this.setupEntities();
  }

  private setupBackground() {
    const grid = new PIXI.Graphics();
    for(let i=0; i<2000; i+=100) {
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
       g.fill(0x1b1b20);
       g.stroke({ width: 2, color: 0x006970 });
       this.platforms.push(g);
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
       g.rect(0, 0, e.w, e.h); 
       g.x = e.x;
       g.y = e.y;
       g.fill({ color: 0xff00ff, alpha: 0.9 });
       g.stroke({ color: 0xffffff, width: 1 });
       this.enemies.push({ graphics: g, data: { ...e }, originX: e.x });
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

  private resetPlayer() {
    this.player.x = this.levelData.spawn.x;
    this.player.y = this.levelData.spawn.y;
    this.velocity = {x: 0, y: 0};
    this.history = [];
    this.echo.x = this.player.x;
    this.echo.y = this.player.y;
  }

  private setupInput() {
    window.addEventListener('keydown', (e) => this.keys[e.key.toLowerCase()] = true);
    window.addEventListener('keyup', (e) => this.keys[e.key.toLowerCase()] = false);
  }

  // AABB Math
  private checkOverlap(r1: Rect, r2: Rect): boolean {
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

    // Movement
    if (this.keys['arrowright'] || this.keys['d']) this.velocity.x = this.speed;
    else if (this.keys['arrowleft'] || this.keys['a']) this.velocity.x = -this.speed;
    else this.velocity.x = 0;

    // Jump
    if ((this.keys['arrowup'] || this.keys['w'] || this.keys[' ']) && this.isGrounded) {
       this.velocity.y = this.jumpStrength;
       this.isGrounded = false;
    }

    // Gravity
    this.velocity.y += this.gravity * dt;

    // Move X
    this.player.x += this.velocity.x * dt;
    this.resolveCollisions(true);

    // Move Y
    this.player.y += this.velocity.y * dt;
    this.isGrounded = false;
    this.resolveCollisions(false);

    // Game Logic Checks
    this.updateEchoLogic();
    this.updateEnemies(dt);
    this.checkInteractions();
  }

  private getActiveColliders(): Rect[] {
    const list: Rect[] = [...this.levelData.platforms];
    this.doors.forEach(d => {
       if (!d.isOpen) list.push(d.rect);
    });
    return list;
  }

  private resolveCollisions(isXAxis: boolean) {
     const playerRect = {x: this.player.x, y: this.player.y, w: 40, h: 80};
     const colliders = this.getActiveColliders();

     for(const c of colliders) {
        if (this.checkOverlap(playerRect, c)) {
            if (isXAxis) {
               // Resolve X
               if (this.velocity.x > 0) this.player.x = c.x - playerRect.w;
               else if (this.velocity.x < 0) this.player.x = c.x + c.w;
               this.velocity.x = 0;
            } else {
               // Resolve Y
               if (this.velocity.y > 0) {
                   this.player.y = c.y - playerRect.h;
                   this.isGrounded = true;
               } else if (this.velocity.y < 0) {
                   this.player.y = c.y + c.h;
               }
               this.velocity.y = 0;
            }
            // Update react locally so following loop iterations use the resolved position
            playerRect.x = this.player.x;
            playerRect.y = this.player.y;
        }
     }
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
     const pRect = {x: this.player.x, y: this.player.y, w: 40, h: 80};
     const patrolDistance = 100;

     for(const enemy of this.enemies) {
         enemy.data.x += enemy.data.vx * dt;
         
         // Reverse if out of bounds
         if (enemy.data.x > enemy.originX + patrolDistance || enemy.data.x < enemy.originX - patrolDistance) {
             enemy.data.vx *= -1;
         }

         enemy.graphics.x = enemy.data.x;

         // Hit detection
         if (this.checkOverlap(pRect, enemy.data)) {
             this.resetPlayer();
             return;
         }
     }
  }

  private checkInteractions() {
     const pRect = {x: this.player.x, y: this.player.y, w: 40, h: 80};
     const eRect = {x: this.echo.x, y: this.echo.y, w: 40, h: 80};

     // Buttons
     this.buttons.forEach((b) => {
        const isPressed = this.checkOverlap(pRect, b.rect) || this.checkOverlap(eRect, b.rect);
        b.isPressed = isPressed;
        b.graphics.alpha = isPressed ? 1 : 0.5;

        // Map to Door
        const targetDoor = this.doors[b.targetDoorIndex];
        if (targetDoor) {
            targetDoor.isOpen = isPressed;
            targetDoor.graphics.alpha = isPressed ? 0.1 : 0.5;
        }
     });

     // Hazards
     for(const h of this.levelData.hazards) {
        if (this.checkOverlap(pRect, h)) {
            this.resetPlayer();
            return;
        }
     }

     if (this.checkOverlap(pRect, this.levelData.goal)) {
        if (this.onWinCallback) {
            this.onWinCallback(this.currentLevelIndex);
            this.onWinCallback = undefined; // Prevent infinite re-triggers
        }
     }
  }

  public destroy() {
    try {
        this.app.destroy(true);
    } catch(e) {}
  }
}
