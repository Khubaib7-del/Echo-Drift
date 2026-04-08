export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  type?: 'stable' | 'fragile';
}

export interface ButtonData extends Rect {
  targetDoorIndex: number;
}

export interface EnemyData extends Rect {
  vx: number;
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
  buttons: ButtonData[];
  doors: Rect[];
  hazards: Rect[]; 
  enemies: EnemyData[];
  collectibles: CollectibleData[];
}

const generateLevels = (): LevelData[] => {
  const levels: LevelData[] = [];
  
  // Level 1: Sector Alpha Intro
  levels.push({
    spawn: { x: 100, y: 300 },
    goal: { x: 800, y: 300, w: 80, h: 80 },
    platforms: [
      { x: 50, y: 400, w: 300, h: 50 },
      { x: 500, y: 400, w: 100, h: 50 }, 
      { x: 750, y: 400, w: 300, h: 50 },
    ],
    buttons: [],
    doors: [],
    hazards: [{ x: 0, y: 600, w: 2000, h: 100 }],
    enemies: [],
    collectibles: [{ x: 535, y: 360, w: 30, h: 30, type: 'gem' }]
  });

  // Level 2: Echo Bridge
  levels.push({
    spawn: { x: 100, y: 300 },
    goal: { x: 900, y: 300, w: 80, h: 80 },
    platforms: [
      { x: 50, y: 400, w: 1000, h: 50 },
      { x: 400, y: 320, w: 200, h: 20 },
    ],
    buttons: [{ x: 475, y: 300, w: 50, h: 20, targetDoorIndex: 0 }],
    doors: [{ x: 800, y: 200, w: 20, h: 200 }],
    hazards: [{ x: 0, y: 600, w: 2000, h: 100 }],
    enemies: [],
    collectibles: [{ x: 700, y: 360, w: 30, h: 30, type: 'gem' }]
  });

  // Level 3: The Fracture
  levels.push({
    spawn: { x: 100, y: 300 },
    goal: { x: 900, y: 320, w: 80, h: 80 },
    platforms: [
      { x: 50, y: 400, w: 250, h: 50 },
      { x: 400, y: 350, w: 100, h: 20 },
      { x: 600, y: 350, w: 100, h: 20 },
      { x: 850, y: 400, w: 200, h: 50 },
    ],
    buttons: [{ x: 625, y: 330, w: 50, h: 20, targetDoorIndex: 0 }],
    doors: [{ x: 800, y: 0, w: 20, h: 400 }],
    hazards: [{ x: 0, y: 600, w: 2000, h: 100 }],
    enemies: [],
    collectibles: [{ x: 435, y: 300, w: 30, h: 30, type: 'gem' }]
  });

  // Procedural Generation for Levels 4-20
  for (let i = 4; i <= 20; i++) {
    const difficulty = i / 20; // 0.2 to 1.0
    
    const platforms: Rect[] = [];
    const buttons: ButtonData[] = [];
    const doors: Rect[] = [];
    const enemies: EnemyData[] = [];
    
    const collectibles: CollectibleData[] = [];
    
    let currentX = 50;
    
    // Spawn Platform
    platforms.push({ x: currentX, y: 400, w: 200, h: 50 });
    currentX += 200;

    // Generate Chunks
    const numChunks = Math.floor(2 + (difficulty * 4));
    
    for (let c = 0; c < numChunks; c++) {
      const gap = 30 + (Math.random() * 60 * difficulty); // Safely jumpable gap (max 90, physics jump is 120 width max)
      currentX += gap;
      
      const pWidth = 100 + (Math.random() * 200);
      const pY = 320 + (Math.random() * 80); // Height variation at most 80 up (max jump height is 144)
      
      // Plot twist: add chance for fragile platform after level 4
      const isFragile = i >= 4 && Math.random() < (0.2 + difficulty * 0.3);
      platforms.push({ x: currentX, y: pY, w: pWidth, h: 50, type: isFragile ? 'fragile' : 'stable' });
      
      // Chance for collectible gem
      if (Math.random() > 0.7) {
        collectibles.push({ x: currentX + (pWidth/2) - 15, y: pY - 50, w: 30, h: 30, type: 'gem' });
      }

      // Randomly spawn a door & button puzzle (50% chance if difficulty > 0.3)
      if (difficulty > 0.3 && Math.random() > 0.5 && !isFragile) {
         // Button on this platform
         buttons.push({ 
             x: currentX + (pWidth / 2) - 25, 
             y: pY - 20, 
             w: 50, h: 20, 
             targetDoorIndex: doors.length 
         });
         
         // Door on the edge of this platform blocking progression
         doors.push({
             x: currentX + pWidth - 20,
             y: pY - 150,
             w: 20, h: 150
         });
      }

      // Sector Beta: Enemies (Levels 11-20)
      if (i > 10 && difficulty > 0.4 && Math.random() > 0.4 && !isFragile) {
         // Add a patrolling enemy on this platform
         enemies.push({
             x: currentX + (pWidth / 2),
             y: pY - 40,
             w: 30, h: 40,
             vx: 2 + (Math.random() * 3) // Enemy speed
         });
      }
      
      currentX += pWidth;
    }

    // Goal Platform
    currentX += 100;
    platforms.push({ x: currentX, y: 400, w: 200, h: 50 });
    
    levels.push({
      spawn: { x: 100, y: 300 },
      goal: { x: currentX + 50, y: 320, w: 80, h: 80 },
      platforms: platforms,
      buttons: buttons,
      doors: doors,
      hazards: [{ x: 0, y: 800, w: 5000, h: 200 }], // Infinite kill floor
      enemies: enemies,
      collectibles: collectibles
    });
  }

  return levels;
};

export const LEVELS: LevelData[] = generateLevels();
