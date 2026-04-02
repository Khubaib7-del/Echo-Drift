import { useEffect, useRef, useState } from 'react';
import { GameApp } from './engine/GameApp';
import MainMenu from './ui/MainMenu';
import HUD from './ui/HUD';
import LevelSelection from './ui/LevelSelection';
import MissionSuccess from './ui/MissionSuccess';

type GameState = 'MENU' | 'LEVEL_SELECT' | 'PLAYING' | 'SUCCESS';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameApp | null>(null);
  const [gameState, setGameState] = useState<GameState>('MENU');
  
  const [highestUnlockedLevel, setHighestUnlockedLevel] = useState<number>(() => {
    return parseInt(localStorage.getItem('echo_drift_highest_level') || '1');
  });

  useEffect(() => {
    if (!canvasRef.current || gameRef.current) return;

    // Initialize PixiJS
    const game = new GameApp();
    game.init(canvasRef.current, (levelPassed: number) => {
      // Trigger win logic
      const nextLevel = levelPassed + 1;
      setHighestUnlockedLevel(prev => {
          const highest = Math.max(prev, nextLevel);
          localStorage.setItem('echo_drift_highest_level', highest.toString());
          return highest;
      });
      setGameState('SUCCESS');
    });
    gameRef.current = game;

    return () => {
      // Cleanup on unmount
      game.destroy();
      gameRef.current = null;
    };
  }, []);

  const enterLevelSelect = () => setGameState('LEVEL_SELECT');
  const returnToMenu = () => setGameState('MENU');
  
  const startGame = (level: number) => {
    setGameState('PLAYING');
    if (gameRef.current) {
        gameRef.current.loadLevel(level);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-background overflow-hidden">
      {/* The WebGL Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0 block pointer-events-none" 
      />

      {/* UI Layers */}
      {gameState === 'MENU' && <MainMenu onStart={enterLevelSelect} />}
      {gameState === 'LEVEL_SELECT' && <LevelSelection 
         highestUnlockedLevel={highestUnlockedLevel}
         onSelectLevel={startGame} 
         onBack={returnToMenu} 
      />}
      {gameState === 'PLAYING' && <HUD />}
      {gameState === 'SUCCESS' && <MissionSuccess onNext={enterLevelSelect} onMenu={returnToMenu} />}
    </div>
  );
}

export default App;
