import React, { useState } from 'react';

interface LevelSelectionProps {
  highestUnlockedLevel: number;
  bestTimes: Record<number, number>;
  onSelectLevel: (levelIndex: number) => void;
  onBack: () => void;
  onNavigate: (state: any) => void;
}

const LevelSelection: React.FC<LevelSelectionProps> = ({ highestUnlockedLevel, onSelectLevel, onBack, bestTimes, onNavigate }) => {
  const [activeSector, setActiveSector] = useState(1);
  // ... sectors definition ...
  const sectors = [
    { id: 1, name: "ORIGIN_ZERO" },
    { id: 2, name: "SILICA_VALLEY" },
    { id: 3, name: "VOID_STATION" },
    { id: 4, name: "EMERALD_CITY" },
    { id: 5, name: "OBSIDIAN_CORE" },
    { id: 6, name: "BETA_SYNAPSE" },
    { id: 7, name: "CIRCUIT_BREAK" },
    { id: 8, name: "GRAVITY_RIFT" },
    { id: 9, name: "MIRROR_NODE" },
    { id: 10, name: "TERMINAL_DRIFT" },
    { id: 11, name: "SINGULARITY" }
  ];

  const formatTime = (seconds?: number) => {
    if (!seconds) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex-1 flex h-full w-full bg-zinc-950 text-white selection:bg-white selection:text-black pointer-events-auto overflow-hidden">
        {/* SCROLLABLE CONTENT WRAPPER */}
        <div className="flex-1 flex overflow-hidden">
            {/* LEFT: THE MONOLITH NAV (Sector Selection) */}
            <aside className="w-64 shrink-0 border-r border-white/10 flex flex-col p-6 pt-16 bg-zinc-950/40 backdrop-blur">
                <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-2">
                    <span className="w-1.5 h-1.5 bg-white"></span>
                    <h3 className="text-[9px] font-mono uppercase tracking-[0.5em] text-zinc-500">Sector_Matrix</h3>
                </div>
                
                <div className="flex-1 overflow-y-auto animated-scrollbar pr-2 space-y-10 py-6">
                    {sectors.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setActiveSector(s.id)}
                            className={`group flex flex-col items-start text-left transition-all duration-500 
                                ${activeSector === s.id ? 'opacity-100' : 'opacity-20 hover:opacity-50'}`}
                        >
                            <span className={`text-5xl font-black font-headline italic leading-none tracking-tighter 
                                ${activeSector === s.id ? 'text-white' : 'text-zinc-600'}`}>
                                {s.id < 10 ? `0${s.id}` : s.id}
                            </span>
                            <span className="text-[7px] font-mono uppercase tracking-[0.4em] mt-1 block pl-1">{s.name}</span>
                        </button>
                    ))}
                </div>
            </aside>

            {/* CENTER: THE KINETIC STACK (Level Selection) */}
            <main className="flex-1 min-w-[500px] flex flex-col p-12 pt-16 pl-16 overflow-y-auto animated-scrollbar">
                <header className="mb-12">
                    <h2 className="text-6xl font-black font-headline italic uppercase leading-none tracking-tighter text-white">
                        {sectors[activeSector - 1].name}
                    </h2>
                    <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.5em] mt-3">Node_Verification_In_Progress...</p>
                </header>

                <div className="flex flex-col gap-6 max-w-3xl pb-24">
                    {Array.from({ length: 5 }).map((_, i) => {
                        const levelNum = (activeSector - 1) * 5 + (i + 1);
                        const isLocked = levelNum > highestUnlockedLevel;
                        const bestTime = bestTimes[levelNum];

                        return (
                            <button
                                key={levelNum}
                                disabled={isLocked}
                                onClick={() => onSelectLevel(levelNum)}
                                className={`relative group flex items-center justify-between p-6 border border-white/5 bg-zinc-950/20 -skew-x-[15deg] transition-all
                                    ${isLocked ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white hover:scale-[1.02]'}`}
                            >
                                <div className="skew-x-[15deg] flex items-center gap-10">
                                    <span className={`text-4xl font-black font-headline italic ${isLocked ? 'text-zinc-800' : 'text-white group-hover:text-zinc-950'}`}>
                                        {levelNum < 10 ? `0${levelNum}` : levelNum}
                                    </span>
                                    <div className="text-left">
                                        <span className={`block text-[7px] font-mono uppercase tracking-widest ${isLocked ? 'text-zinc-700' : 'text-zinc-500 group-hover:text-zinc-700'}`}>Node_Access</span>
                                        <span className={`block font-black font-headline text-lg uppercase tracking-tighter ${isLocked ? 'text-zinc-600' : 'text-white group-hover:text-zinc-950'}`}>
                                            {isLocked ? 'SIGNAL_LOCKED' : `SY_POINT_0${i+1}`}
                                        </span>
                                    </div>
                                </div>

                                <div className="skew-x-[15deg] flex items-center gap-10">
                                    {bestTime && (
                                        <div className="text-right">
                                            <span className={`block text-[7px] font-mono uppercase ${isLocked ? 'text-zinc-800' : 'text-zinc-500 group-hover:text-zinc-700'}`}>PB</span>
                                            <span className={`block font-headline font-black text-base ${isLocked ? 'text-zinc-700' : 'text-white group-hover:text-zinc-950'}`}>{formatTime(bestTime)}</span>
                                        </div>
                                    )}
                                    <span className={`material-symbols-outlined text-2xl ${isLocked ? 'text-zinc-800' : 'text-white group-hover:text-zinc-950'}`}>
                                        {isLocked ? 'lock' : 'arrow_outward'}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </main>

            {/* RIGHT: DATA PANEL (Navigation & Context) */}
            <aside className="w-64 shrink-0 border-l border-white/10 p-6 pt-16 flex flex-col gap-8 bg-zinc-950/20 backdrop-blur">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                         <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                         <h3 className="text-[9px] font-mono uppercase tracking-[0.5em] text-zinc-500">Live_Telemetry</h3>
                    </div>
                    
                    <div className="p-4 bg-zinc-900/50 border border-white/5 space-y-4">
                        <div className="space-y-1">
                            <span className="text-[7px] font-mono text-zinc-600 uppercase">Sector_Stability</span>
                            <div className="h-1 bg-zinc-800 w-full"><div className="h-full bg-white w-3/4"></div></div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[7px] font-mono text-zinc-600 uppercase">Echo_Density</span>
                            <div className="h-1 bg-zinc-800 w-full"><div className="h-full bg-white w-1/4"></div></div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto space-y-8">
                    <div className="flex justify-center gap-6 pt-6 border-t border-white/5">
                        <span onClick={() => onNavigate('ANALYTICS')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer transition-colors" title="Analytics">laptop_windows</span>
                        <span onClick={() => onNavigate('TIMELINE')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer transition-colors" title="Timeline">wifi_tethering</span>
                        <span onClick={() => onNavigate('MEMORIES')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer transition-colors" title="Memories">memory</span>
                        <span onClick={() => onNavigate('SETTINGS')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer transition-colors" title="Settings">settings</span>
                    </div>
                </div>
            </aside>
        </div>
    </div>
  );
};

export default LevelSelection;
