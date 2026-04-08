import { useEffect, useRef, useState } from 'react';
import { GameApp } from './engine/GameApp';
import MainMenu from './ui/MainMenu';
import HUD from './ui/HUD';
import LevelSelection from './ui/LevelSelection';
import MissionSuccess from './ui/MissionSuccess';
import SettingsScreen from './ui/SettingsScreen';
import HelpScreen from './ui/HelpScreen';
import { Tooltip } from './ui/Tooltip';

type GameState = 'MENU' | 'LEVEL_SELECT' | 'PLAYING' | 'SUCCESS' | 'SETTINGS' | 'HELP';

function hexToRgbTuple(hex: string) {
  let c = hex.substring(1);
  if(c.length === 3) c = c.split('').map(x => x + x).join('');
  let r = parseInt(c.slice(0, 2), 16);
  let g = parseInt(c.slice(2, 4), 16);
  let b = parseInt(c.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

const DEFAULT_THEME = {
  themePrimary: '#00F0FF',
  themeSecondary: '#FF00FF',
  themeBackground: '#131318',
  fontFamily: '"Space Grotesk"',
};

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameApp | null>(null);
  const [gameState, setGameState] = useState<GameState>('MENU');
  
  // Theme Config persistence
  const [themeConfig, setThemeConfig] = useState(() => {
    const saved = localStorage.getItem('echo_drift_theme');
    return saved ? JSON.parse(saved) : DEFAULT_THEME;
  });

  const [highestUnlockedLevel, setHighestUnlockedLevel] = useState<number>(() => {
    return parseInt(localStorage.getItem('echo_drift_highest_level') || '1');
  });

  // Hints system
  const [showHint, setShowHint] = useState<boolean>(false);
  const playInteractionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Apply theme
    document.documentElement.style.setProperty('--theme-primary', hexToRgbTuple(themeConfig.themePrimary));
    document.documentElement.style.setProperty('--theme-secondary', hexToRgbTuple(themeConfig.themeSecondary));
    document.documentElement.style.setProperty('--theme-bg', themeConfig.themeBackground);
    localStorage.setItem('echo_drift_theme', JSON.stringify(themeConfig));
  }, [themeConfig]);

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
      game.destroy();
      gameRef.current = null;
    };
  }, []);

  // Monitor idle state during PLAYING for hints
  useEffect(() => {
    if (gameState === 'PLAYING') {
       const resetTimer = () => {
          setShowHint(false);
          if (playInteractionTimer.current) clearTimeout(playInteractionTimer.current);
          playInteractionTimer.current = setTimeout(() => setShowHint(true), 15000); // 15s idle = hint
       };
       window.addEventListener('keydown', resetTimer);
       window.addEventListener('pointerdown', resetTimer);
       resetTimer();
       return () => {
          window.removeEventListener('keydown', resetTimer);
          window.removeEventListener('pointerdown', resetTimer);
          if (playInteractionTimer.current) clearTimeout(playInteractionTimer.current);
       };
    } else {
       setShowHint(false);
    }
  }, [gameState]);

  const enterLevelSelect = () => setGameState('LEVEL_SELECT');
  const returnToMenu = () => setGameState('MENU');
  
  const startGame = (level: number) => {
    setGameState('PLAYING');
    if (gameRef.current) {
        gameRef.current.loadLevel(level);
    }
  };

  return (
    <div className={`relative w-screen h-screen bg-theme-bg overflow-hidden transition-colors duration-300`} style={{ fontFamily: themeConfig.fontFamily }}>
      {/* The WebGL Canvas */}
      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 w-full h-full z-0 block pointer-events-none transition-opacity duration-500 ${gameState === 'PLAYING' ? 'opacity-100' : 'opacity-0'}`} 
      />

      {/* UI Layers */}
      {gameState === 'MENU' && (
        <MainMenu 
           onStart={enterLevelSelect} 
           onToggleSettings={() => setGameState('SETTINGS')} 
           onHelp={() => setGameState('HELP')} 
        />
      )}
      {gameState === 'LEVEL_SELECT' && (
        <LevelSelection 
           highestUnlockedLevel={highestUnlockedLevel}
           onSelectLevel={startGame} 
           onBack={returnToMenu} 
           onToggleSettings={() => setGameState('SETTINGS')}
        />
      )}
      {gameState === 'PLAYING' && (
         <>
           <HUD />
           <div className="absolute top-4 right-4 z-50 pointer-events-auto">
             <Tooltip content="Abort current drift sequence" position="left">
               <button 
                 onClick={returnToMenu}
                 className="p-2 bg-zinc-950/80 border border-theme-primary/30 text-theme-primary hover:bg-theme-primary hover:text-zinc-950 transition-all font-headline text-xs focus:ring focus:ring-theme-primary"
               >
                 ABORT DRIFT
               </button>
             </Tooltip>
           </div>
           
           {/* In-Game Contextual Hint System */}
           {showHint && (
             <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-[200] pointer-events-auto flex flex-col items-center animate-pulse">
                <div className="bg-theme-secondary/20 backdrop-blur-md border border-theme-secondary/50 px-6 py-4 rounded-ss-2xl rounded-ee-2xl shadow-[0_0_20px_rgba(255,0,255,0.3)]">
                   <p className="text-white text-sm font-headline mb-2 text-center">Are you stuck? Analyze temporal sync paths to identify platform phase alignment.</p>
                   <div className="flex justify-center w-full">
                     <button onClick={() => setShowHint(false)} className="text-xs bg-theme-secondary text-zinc-950 px-4 py-1 font-bold">ACKNOWLEDGE</button>
                   </div>
                </div>
             </div>
           )}
         </>
      )}
      {gameState === 'SUCCESS' && (
        <MissionSuccess 
           onNext={enterLevelSelect} 
           onMenu={returnToMenu} 
           onToggleSettings={() => setGameState('SETTINGS')} 
        />
      )}
      {gameState === 'HELP' && (
        <HelpScreen onBack={returnToMenu} />
      )}
      {gameState === 'SETTINGS' && (
        <SettingsScreen 
          onBack={returnToMenu}
          config={themeConfig}
          setConfig={setThemeConfig}
          resetToDefaults={() => setThemeConfig(DEFAULT_THEME)}
        />
      )}

      {/* Global Scanline (Conditional) */}
      <div className="scanline-overlay pointer-events-none z-[110]" />
    </div>
  );
}

export default App;
