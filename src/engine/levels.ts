export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ButtonData extends Rect {
  targetDoorIndex: number; // The index of the door in `doors` it unlocks
}

export interface LevelData {
  spawn: { x: number; y: number };
  goal: Rect;
  platforms: Rect[];
  buttons: ButtonData[];
  doors: Rect[];
  hazards: Rect[]; 
}

export const LEVELS: LevelData[] = [
  // Sector Alpha (Level 1) - Basic movement and jumping
  {
    spawn: { x: 100, y: 300 },
    goal: { x: 900, y: 300, w: 80, h: 80 },
    platforms: [
      { x: 50, y: 400, w: 300, h: 50 },
      { x: 500, y: 400, w: 100, h: 50 }, // A small gap to jump
      { x: 750, y: 400, w: 300, h: 50 },
    ],
    buttons: [],
    doors: [],
    hazards: [
      { x: 0, y: 600, w: 2000, h: 100 } // Kill floor
    ]
  },
  
  // Echo Bridge (Level 2) - Introduce button and door
  {
    spawn: { x: 100, y: 300 },
    goal: { x: 900, y: 300, w: 80, h: 80 },
    platforms: [
      { x: 50, y: 400, w: 1000, h: 50 },
      // Elevated platform for the button
      { x: 400, y: 250, w: 150, h: 20 },
    ],
    buttons: [
      { x: 450, y: 230, w: 50, h: 20, targetDoorIndex: 0 }
    ],
    doors: [
      // Blocking the goal
      { x: 800, y: 200, w: 20, h: 200 }
    ],
    hazards: [
      { x: 0, y: 600, w: 2000, h: 100 }
    ]
  },

  // The Fracture (Level 3) - Timing Puzzle
  {
    spawn: { x: 100, y: 300 },
    goal: { x: 900, y: 150, w: 80, h: 80 },
    platforms: [
      { x: 50, y: 400, w: 250, h: 50 },
      { x: 850, y: 250, w: 200, h: 50 },
    ],
    buttons: [
      { x: 200, y: 380, w: 50, h: 20, targetDoorIndex: 0 }
    ],
    doors: [
      // In this level, the "door" actually acts as a bridge we enable! 
      // It is initially lowered and blocking us from falling? No, wait. 
      // The puzzle design should be: A wall is blocking a long jump.
      { x: 500, y: 100, w: 20, h: 400 }
    ],
    hazards: [
      { x: 0, y: 600, w: 2000, h: 100 }
    ]
  }
];
