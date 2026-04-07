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
  const [showScanline, setShowScanline] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  
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
      {gameState === 'MENU' && <MainMenu onStart={enterLevelSelect} onToggleSettings={() => setShowSettings(!showSettings)} />}
      {gameState === 'LEVEL_SELECT' && <LevelSelection 
         highestUnlockedLevel={highestUnlockedLevel}
         onSelectLevel={startGame} 
         onBack={returnToMenu} 
         onToggleSettings={() => setShowSettings(!showSettings)}
      />}
      {gameState === 'PLAYING' && <HUD />}
      {gameState === 'SUCCESS' && <MissionSuccess onNext={enterLevelSelect} onMenu={returnToMenu} onToggleSettings={() => setShowSettings(!showSettings)} />}

      {/* Settings Overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md pointer-events-auto">
          <div className="bg-zinc-900 border border-cyan-400/30 p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,240,255,0.2)]">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <h2 className="text-2xl font-black font-headline text-white uppercase italic tracking-wider">SYSTEM CALIBRATION</h2>
              <button onClick={() => setShowSettings(false)} className="material-symbols-outlined text-zinc-500 hover:text-white transition-colors">close</button>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center group">
                <div>
                  <h4 className="font-headline font-bold text-cyan-400 text-sm uppercase">Temporal Scanline</h4>
                  <p className="text-[10px] text-zinc-500 uppercase">CRT Interlace Emulation</p>
                </div>
                <button 
                  onClick={() => setShowScanline(!showScanline)}
                  className={`w-12 h-6 rounded-full transition-all relative ${showScanline ? 'bg-cyan-400' : 'bg-zinc-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-zinc-950 transition-all ${showScanline ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
              {/* Other enhancements can be added here */}
            </div>
            <button 
              onClick={() => setShowSettings(false)}
              className="mt-12 w-full py-3 bg-white/5 border border-white/10 text-white font-headline uppercase text-xs hover:bg-white/10 transition-all"
            >
              APPLY CHANGES
            </button>
          </div>
        </div>
      )}

      {/* Global Scanline (Conditional) */}
      {showScanline && <div className="scanline-overlay pointer-events-none z-[110]" />}
    </div>
  );
}

export default App;
