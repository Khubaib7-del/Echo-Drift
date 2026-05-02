export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  type?: 'stable' | 'fragile' | 'trap' | 'moving';
}

export interface MovingPlatformData extends Rect {
  rangeX?: number;
  rangeY?: number;
  speed: number;
}

export interface ButtonData extends Rect {
  targetDoorIndex: number;
}

export interface EnemyData extends Rect {
  vx: number;
  vy?: number;
  rangeY?: number;
  type?: 'patrol' | 'flyer' | 'spike';
}

export interface CollectibleData {
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'gem' | 'boost';
  collected?: boolean;
}

export interface LevelData {
  spawn: { x: number; y: number };
  goal: Rect;
  platforms: Rect[];
  movingPlatforms: MovingPlatformData[];
  buttons: ButtonData[];
  doors: Rect[];
  hazards: Rect[]; 
  enemies: EnemyData[];
  collectibles: CollectibleData[];
}

const generateLevels = (): LevelData[] => {
  const levels: LevelData[] = [];
  
  // Level 1: Sector Alpha Intro (Now harder)
  levels.push({
    spawn: { x: 100, y: 300 },
    goal: { x: 1200, y: 300, w: 80, h: 80 },
    platforms: [
      { x: 50, y: 400, w: 200, h: 50 },
      { x: 350, y: 350, w: 100, h: 30, type: 'fragile' }, 
      { x: 550, y: 300, w: 100, h: 30, type: 'fragile' },
      { x: 750, y: 400, w: 150, h: 50 },
      { x: 1000, y: 350, w: 100, h: 20, type: 'trap' },
    ],
    movingPlatforms: [],
    buttons: [],
    doors: [],
    hazards: [{ x: 0, y: 700, w: 3000, h: 100 }],
    enemies: [],
    collectibles: [{ x: 535, y: 260, w: 30, h: 30, type: 'gem' }]
  });

  // Level 2: Echo Bridge (Balanced)
  levels.push({
    spawn: { x: 100, y: 300 },
    goal: { x: 1400, y: 300, w: 80, h: 80 },
    platforms: [
      { x: 50, y: 400, w: 200, h: 50 },
      { x: 400, y: 320, w: 150, h: 20, type: 'stable' }, // Stable path
      { x: 700, y: 400, w: 150, h: 20, type: 'stable' }, // Stable button platform
      { x: 1000, y: 320, w: 150, h: 20, type: 'fragile' }, // Fragile challenge
    ],
    movingPlatforms: [],
    buttons: [{ x: 725, y: 380, w: 50, h: 20, targetDoorIndex: 0 }],
    doors: [{ x: 1200, y: 200, w: 20, h: 200 }],
    hazards: [{ x: 0, y: 700, w: 3000, h: 100 }],
    enemies: [],
    collectibles: [{ x: 700, y: 360, w: 30, h: 30, type: 'gem' }]
  });

  // Level 3: The Fracture
  levels.push({
    spawn: { x: 100, y: 300 },
    goal: { x: 900, y: 320, w: 80, h: 80 },
    platforms: [
      { x: 50, y: 400, w: 150, h: 50 },
      { x: 300, y: 350, w: 80, h: 20, type: 'fragile' },
      { x: 450, y: 300, w: 80, h: 20, type: 'fragile' },
      { x: 600, y: 350, w: 80, h: 20, type: 'trap' },
      { x: 850, y: 400, w: 150, h: 50 },
    ],
    movingPlatforms: [],
    buttons: [{ x: 615, y: 330, w: 50, h: 20, targetDoorIndex: 0 }],
    doors: [{ x: 800, y: 0, w: 20, h: 400 }],
    hazards: [{ x: 0, y: 700, w: 2000, h: 100 }],
    enemies: [],
    collectibles: [{ x: 435, y: 250, w: 30, h: 30, type: 'gem' }]
  });

  // Procedural Generation for Levels 4-55
  for (let i = 4; i <= 55; i++) {
    const difficulty = 0.2 + (i / 55) * 0.8; 
    
    const platforms: Rect[] = [];
    const movingPlatforms: MovingPlatformData[] = [];
    const buttons: ButtonData[] = [];
    const doors: Rect[] = [];
    const collectibles: CollectibleData[] = [];
    
    let currentX = 50;
    let currentY = 400; // Track current height for "Jump-Chain"
    
    // Spawn Platform
    const spawnWidth = Math.max(50, 140 - (difficulty * 90));
    platforms.push({ x: currentX, y: currentY, w: spawnWidth, h: 50 });
    currentX += spawnWidth;

    const numChunks = Math.floor(5 + (difficulty * 15)); 
    
    for (let c = 0; c < numChunks; c++) {
      // ARC CALCULATIONS: Max jump is ~240px wide, ~140px high
      const maxGap = 120 + (difficulty * 110); // Max 230
      const gap = 60 + (Math.random() * (maxGap - 60));
      
      const maxHeightChange = 40 + (difficulty * 85); // Max 125
      const heightChange = (Math.random() * maxHeightChange * 2) - maxHeightChange;
      
      currentX += gap;
      currentY = Math.max(150, Math.min(550, currentY + heightChange)); // Keep in bounds
      
      const pWidth = Math.max(35, (90 + (Math.random() * 110)) * (1 - difficulty * 0.5));
      const roll = Math.random();
      
      if (difficulty > 0.35 && roll < 0.35) {
        movingPlatforms.push({
          x: currentX, y: currentY, w: pWidth, h: 20,
          rangeX: Math.random() > 0.5 ? 60 + (difficulty * 120) : 0,
          rangeY: Math.random() > 0.5 ? 40 + (difficulty * 70) : 0,
          speed: 2 + (difficulty * 4),
          type: 'moving'
        });
      } else if (roll < 0.5) {
        platforms.push({ x: currentX, y: currentY, w: pWidth, h: 20, type: 'trap' });
      } else {
        platforms.push({ x: currentX, y: currentY, w: pWidth, h: 25, type: 'fragile' });
      }
      
      if (Math.random() > 0.7) {
        collectibles.push({ x: currentX + (pWidth/2) - 15, y: currentY - 50, w: 30, h: 30, type: 'gem' });
      }

      // Occasional Puzzle
      if (difficulty > 0.4 && c % 4 === 0) {
         buttons.push({ x: currentX + 5, y: currentY - 15, w: 30, h: 15, targetDoorIndex: doors.length });
         doors.push({ x: currentX + pWidth + gap/2, y: currentY - 300, w: 20, h: 400 });
      }
      
      currentX += pWidth;
    }

    // Final Goal
    currentX += 160;
    platforms.push({ x: currentX, y: 400, w: 120, h: 50 });
    
    levels.push({
      spawn: { x: 100, y: 300 },
      goal: { x: currentX + 20, y: 320, w: 80, h: 80 },
      platforms: platforms,
      movingPlatforms: movingPlatforms,
      buttons: buttons,
      doors: doors,
      hazards: [{ x: 0, y: 1100, w: currentX + 3000, h: 300 }],
      enemies: [],
      collectibles: collectibles
    });
  }

  return levels;
};

export const LEVELS: LevelData[] = generateLevels();
