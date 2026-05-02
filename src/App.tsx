import { useEffect, useRef, useState } from 'react';
import { GameApp } from './engine/GameApp';
import MainMenu from './ui/MainMenu';
import HUD from './ui/HUD';
import LevelSelection from './ui/LevelSelection';
import MissionSuccess from './ui/MissionSuccess';
import MissionFailed from './ui/MissionFailed';
import SettingsScreen from './ui/SettingsScreen';
import HelpScreen from './ui/HelpScreen';
import MemoriesLog from './ui/MemoriesLog';
import AnalyticsDashboard from './ui/AnalyticsDashboard';
import SystemStatus from './ui/SystemStatus';
import DataArchive from './ui/DataArchive';
import TimelineVisualization from './ui/TimelineVisualization';
import { Tooltip } from './ui/Tooltip';
import { SidebarToggle } from './ui/CustomIcons';

type GameState = 'MENU' | 'LEVEL_SELECT' | 'PLAYING' | 'SUCCESS' | 'GAME_OVER' | 'SETTINGS' | 'HELP' | 'TIMELINE' | 'MEMORIES' | 'ANALYTICS' | 'STATUS' | 'ARCHIVE';

function hexToRgbTuple(hex: string) {
  let c = hex.substring(1);
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
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
  
  // Navigation & UI States
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [stability, setStability] = useState(100);
  const [velocity, setVelocity] = useState(0);
  const [dashCooldown, setDashCooldown] = useState(0);
  const [echoDistance, setEchoDistance] = useState(1000);
  const [missionProgress, setMissionProgress] = useState(0);
  const [missionStats, setMissionStats] = useState({ maxVelocity: 0, closeCalls: 0, dashCount: 0 });
  const [bestTimes, setBestTimes] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('echo-drift-best-times');
    return saved ? JSON.parse(saved) : {};
  });
  const [levelStartTime, setLevelStartTime] = useState(0);
  const [showBootSequence, setShowBootSequence] = useState(false);
  const [bootSequenceText, setBootSequenceText] = useState("");

  const [themeConfig, setThemeConfig] = useState(() => {
    const saved = localStorage.getItem('echo_drift_theme');
    return saved ? JSON.parse(saved) : DEFAULT_THEME;
  });

  const [highestUnlockedLevel, setHighestUnlockedLevel] = useState<number>(() => {
    return parseInt(localStorage.getItem('echo_drift_highest_level') || '1');
  });

  const [showHint, setShowHint] = useState<boolean>(false);
  const playInteractionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-primary', hexToRgbTuple(themeConfig.themePrimary));
    document.documentElement.style.setProperty('--theme-secondary', hexToRgbTuple(themeConfig.themeSecondary));
    document.documentElement.style.setProperty('--theme-bg', themeConfig.themeBackground);
    localStorage.setItem('echo_drift_theme', JSON.stringify(themeConfig));
  }, [themeConfig]);

  useEffect(() => {
    if (!canvasRef.current || gameRef.current) return;
    const game = new GameApp();
    game.onStabilityUpdate = (s) => setStability(s);
    game.onVelocityUpdate = (v) => setVelocity(v);
    game.onDashUpdate = (c) => setDashCooldown(c);
    game.onProximityUpdate = (d) => setEchoDistance(d);
    game.onProgressUpdate = (p) => setMissionProgress(p);
    game.init(canvasRef.current, (levelPassed: number) => {
      setMissionStats(game.getMissionStats());
      const endTime = Date.now();
      const timeTaken = (endTime - levelStartTime) / 1000;
      setBestTimes(prev => {
          const currentBest = prev[levelPassed] || Infinity;
          if (timeTaken < currentBest) {
              const updated = { ...prev, [levelPassed]: timeTaken };
              localStorage.setItem('echo-drift-best-times', JSON.stringify(updated));
              return updated;
          }
          return prev;
      });
      const nextLevel = levelPassed + 1;
      setHighestUnlockedLevel(prev => {
        const highest = Math.max(prev, nextLevel);
        localStorage.setItem('echo_drift_highest_level', highest.toString());
        return highest;
      });
      setGameState('SUCCESS');
    }, () => {
      setGameState('GAME_OVER');
    });
    gameRef.current = game;
    return () => {
      game.destroy();
      gameRef.current = null;
    };
  }, []);

  const startGame = (level: number) => {
    setActiveLevel(level);
    setLevelStartTime(Date.now());
    setGameState('PLAYING');
    setShowBootSequence(true);
    const steps = ["INITIALIZING...", "CALIBRATING...", "DASH_PROTOCOL: READY", "GO."];
    let i = 0;
    const interval = setInterval(() => {
        if (i < steps.length) {
            setBootSequenceText(steps[i]);
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => setShowBootSequence(false), 800);
        }
    }, 400);
    if (gameRef.current) gameRef.current.loadLevel(level);
  };

  const returnToMenu = () => {
    setGameState('MENU');
    if (gameRef.current) gameRef.current.stopGame();
  };

  return (
    <div className="flex h-screen w-screen bg-zinc-950 overflow-hidden text-white font-body selection:bg-cyan-400">
      
      {/* PERSISTENT SIDEBAR */}
      <aside 
        className={`sidebar-transition relative z-[100] h-full flex flex-col bg-zinc-950 border-r border-white/5 
          ${isSidebarOpen ? 'w-[280px]' : 'w-[80px]'}`}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/5 h-20">
          {isSidebarOpen && <span className="font-headline font-black italic text-white text-lg">ECHO_DRIFT</span>}
          <SidebarToggle 
            isOpen={isSidebarOpen} 
            onClick={() => setSidebarOpen(!isSidebarOpen)} 
          />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-8 flex flex-col gap-2 overflow-y-auto no-scrollbar pb-8">
          {[
            { id: 'MENU', icon: 'home', label: 'OPERATOR_HUB' },
            { id: 'LEVEL_SELECT', icon: 'grid_view', label: 'SECTORS' },
            { id: 'TIMELINE', icon: 'timeline', label: 'TIMELINE' },
            { id: 'MEMORIES', icon: 'memory', label: 'MEMORIES' },
            { id: 'ANALYTICS', icon: 'bar_chart', label: 'GRAPH' },
            { id: 'SETTINGS', icon: 'settings', label: 'SETTINGS' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setGameState(item.id as GameState)}
              className={`flex items-center gap-6 px-7 py-4 transition-all hover:bg-white/5 group
                ${gameState === item.id ? 'bg-white/10 text-white border-l-4 border-white' : 'text-zinc-600'}`}
            >
              <span className={`material-symbols-outlined transition-transform duration-300 group-hover:scale-110 group-hover:text-white ${gameState === item.id ? 'font-variation-[FILL_1]' : ''}`}>
                {item.icon}
              </span>
              {isSidebarOpen && (
                <span className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer (Player Status) */}
        <div className="p-6 border-t border-white/5 bg-white/2">
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-sm font-variation-[FILL_1]">person</span>
             </div>
             {isSidebarOpen && (
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white uppercase tracking-tighter">DRIFTER_01</span>
                  <span className="text-[8px] text-zinc-500 uppercase">STATUS_OK</span>
               </div>
             )}
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 relative h-full bg-black overflow-hidden">
          {/* THE GAME CANVAS */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full block pointer-events-none transition-opacity duration-700 
              ${gameState === 'PLAYING' ? 'opacity-100' : 'opacity-20 grayscale brightness-[0.3] scale-110'}`}
          />

        {/* VIEWPORT CONTENT OVERLAY */}
        <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
          {gameState === 'MENU' && (
            <MainMenu highestUnlockedLevel={highestUnlockedLevel} onStart={() => setGameState('LEVEL_SELECT')} onNavigate={setGameState} />
          )}
          {gameState === 'LEVEL_SELECT' && (
            <LevelSelection highestUnlockedLevel={highestUnlockedLevel} bestTimes={bestTimes} onSelectLevel={startGame} onBack={returnToMenu} onNavigate={setGameState} />
          )}
          {gameState === 'PLAYING' && (
            <>
              <HUD activeLevel={activeLevel} stability={stability} velocity={velocity} dashCooldown={dashCooldown} echoDistance={echoDistance} missionProgress={missionProgress} />
              <button onClick={returnToMenu} className="absolute top-6 right-6 p-4 bg-red-600/10 border border-red-500/30 text-red-500 font-headline text-xs uppercase pointer-events-auto hover:bg-red-500 hover:text-black transition-all">ABORT DRIFT</button>
            </>
          )}
          {gameState === 'SUCCESS' && (
            <MissionSuccess level={activeLevel} stats={missionStats} onNext={() => startGame(activeLevel + 1)} onMenu={returnToMenu} />
          )}
          {gameState === 'GAME_OVER' && (
            <MissionFailed onRestart={() => startGame(activeLevel)} onMenu={returnToMenu} />
          )}
          {gameState === 'HELP' && <HelpScreen onBack={returnToMenu} />}
          {gameState === 'TIMELINE' && <TimelineVisualization onNavigate={setGameState} />}
          {gameState === 'MEMORIES' && <MemoriesLog onNavigate={setGameState} />}
          {gameState === 'ANALYTICS' && <AnalyticsDashboard onNavigate={setGameState} />}
          {gameState === 'STATUS' && <SystemStatus onNavigate={setGameState} />}
          {gameState === 'ARCHIVE' && <DataArchive onNavigate={setGameState} />}
        </div>

        {/* Global Scanline Overlay */}
        <div className="scanline-overlay z-50 pointer-events-none opacity-20" />

        {/* Boot Sequence Overlay */}
        {showBootSequence && (
          <div className="absolute inset-0 z-[150] bg-black/90 flex flex-col items-center justify-center p-12">
              <div className="max-w-md w-full space-y-4">
                  <p className="text-cyan-400 font-mono text-center text-sm animate-pulse uppercase tracking-[0.4em]">{bootSequenceText}</p>
                  <div className="h-0.5 w-full bg-zinc-900 overflow-hidden">
                      <div className="h-full bg-cyan-400 w-full animate-progress"></div>
                  </div>
              </div>
          </div>
        )}
      </main>

      {/* FULL SCREEN OVERLAYS */}
      {gameState === 'SETTINGS' && (
        <SettingsScreen 
          onBack={returnToMenu} 
          config={themeConfig} 
          setConfig={setThemeConfig} 
          resetToDefaults={() => setThemeConfig(DEFAULT_THEME)} 
        />
      )}
    </div>
  );
}

export default App;
