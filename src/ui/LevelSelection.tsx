import React from 'react';

interface LevelSelectionProps {
  highestUnlockedLevel: number;
  onSelectLevel: (levelIndex: number) => void;
  onBack: () => void;
  onToggleSettings: () => void;
}

const LevelSelection: React.FC<LevelSelectionProps> = ({ highestUnlockedLevel, onSelectLevel, onBack, onToggleSettings }) => {
  const levels = Array.from({ length: 20 }).map((_, i) => {
     const id = i + 1;
     let name = id <= 10 ? `SECTOR ALPHA - SECTION ${id}` : `SECTOR BETA - SECTION ${id - 10}`;
     if (id === 1) name = 'SECTOR ALPHA ORIGIN';
     if (id === 2) name = 'ECHO BRIDGE';
     if (id === 3) name = 'THE FRACTURE';
     if (id === 11) name = 'SECTOR BETA ORIGIN';

     const isUnlocked = id <= highestUnlockedLevel;
     return {
        id,
        name,
        status: isUnlocked ? 'UNLOCKED' : 'LOCKED',
        sync: isUnlocked ? '0%' : '---',
        color: isUnlocked ? 'border-cyan-400' : 'border-zinc-800'
     };
  });

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-auto bg-background/90 backdrop-blur-md overflow-hidden font-body">
      
      {/* Shared Header Component */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-transparent text-white pointer-events-none">
        <div className="text-2xl font-black italic text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] font-headline uppercase tracking-[0.1em] pointer-events-auto">
          ECHO DRIFT
        </div>
        <div className="flex gap-6 pointer-events-auto">
          <button className="hover:bg-cyan-500/10 hover:skew-x-[-12deg] transition-all p-2 group">
            <span className="material-symbols-outlined text-cyan-400">timeline</span>
          </button>
          <button 
            onClick={onToggleSettings}
            className="hover:bg-cyan-500/10 hover:skew-x-[-12deg] transition-all p-2 group"
          >
            <span className="material-symbols-outlined text-cyan-400">settings</span>
          </button>
        </div>
      </header>


      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="w-full h-full border-[0.5px] border-cyan-400/20 grid grid-cols-6 grid-rows-6">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="border-[0.5px] border-cyan-400/10"></div>
          ))}
        </div>
      </div>

      {/* Background Silhouette - THE ROBOT/SCENE IMAGE */}
      <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-end pointer-events-none">
          <div className="absolute inset-0 bg-background mix-blend-multiply z-10 block"></div>
          <img 
              className="w-full h-full object-cover filter grayscale contrast-125 sepia hover:grayscale-0 transition-all duration-1000" 
              alt="Sector Background" 
              src="https://images.unsplash.com/photo-1544866567-c2057262ba94?q=80&w=2070&auto=format&fit=crop"
          />
      </div>

      {/* Header */}
      <div className="w-full max-w-5xl mt-20 mb-8 flex justify-between items-end relative z-10 px-8 shrink-0">
        <div>
          <h2 className="text-6xl font-black font-headline tracking-tighter uppercase text-white leading-none">
            TEMPORAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">NODES</span>
          </h2>
          <div className="flex items-center gap-4 mt-2">
            <span className="w-8 h-[1px] bg-cyan-400"></span>
            <span className="text-xs font-headline uppercase tracking-widest text-cyan-400/60">Select entry point for chronological insertion</span>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="text-sm font-headline uppercase text-zinc-500 hover:text-cyan-400 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          ABORT
        </button>
      </div>

      <div className="w-full max-w-7xl flex-1 relative z-10 px-8 pb-32 flex gap-8">
        {/* Main Levels Grid */}
        <div className="flex-1 overflow-y-auto animated-scrollbar pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.map((lvl) => (
              <button
                  key={lvl.id}
                  onClick={() => lvl.status === 'UNLOCKED' && onSelectLevel(lvl.id)}
                  className={`
                  relative flex flex-col items-start p-6 transition-all duration-300 group/card
                  ${lvl.status === 'UNLOCKED' ? 'hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)] cursor-pointer hover:border-cyan-400 bg-surface-container-high/80 backdrop-blur border-t border-l border-cyan-400/50' : 'opacity-40 cursor-not-allowed grayscale border-zinc-800 bg-surface-container-high/20'}
                  before:absolute before:right-0 before:top-0 before:w-6 before:h-6 before:bg-background before:clip-path-custom
                  `}
              >
                  <div className="w-10 h-10 mb-4 bg-surface-container-lowest border border-white/5 flex items-center justify-center group-hover/card:bg-cyan-400 group-hover/card:text-zinc-950 transition-colors">
                  {lvl.status === 'UNLOCKED' ? (
                      <span className="font-headline text-lg text-white group-hover/card:text-zinc-950 font-black">{lvl.id.toString().padStart(2, '0')}</span>
                  ) : (
                      <span className="material-symbols-outlined text-red-500/50 text-sm">lock</span>
                  )}
                  </div>
                  
                  <h3 className="text-sm font-black font-headline uppercase mb-2 text-white text-left group-hover/card:text-cyan-400 transition-colors w-full break-words">{lvl.name}</h3>
                  
                  <div className="w-full h-[1px] bg-white/5 my-3"></div>
                  
                  <div className="w-full flex justify-between items-center text-[10px] font-headline tracking-widest uppercase">
                  <span className={lvl.status === 'UNLOCKED' ? 'text-cyan-400 font-bold' : 'text-red-500/50'}>{lvl.status}</span>
                  <span className="text-zinc-500">SYNC: {lvl.sync}</span>
                  </div>
                  
                  {/* Status light */}
                  {lvl.status === 'UNLOCKED' && (
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-slow shadow-[0_0_8px_#00F0FF]"></div>
                  )}
              </button>
              ))}
          </div>
        </div>

        {/* Side Panel Guide */}
        <aside className="w-80 shrink-0 h-full hidden lg:flex flex-col">
           <div className="w-full glass-panel border border-cyan-500/20 p-6 flex-1 flex flex-col items-start bg-zinc-950/80 backdrop-blur-xl">
              <div className="w-12 h-12 border border-cyan-400 flex items-center justify-center mb-6">
                 <span className="material-symbols-outlined text-cyan-400 text-2xl font-variation-[FILL_1]">travel_explore</span>
              </div>
              <h3 className="text-xl font-headline font-black text-white uppercase tracking-widest mb-2 shadow-text">Sector Guide</h3>
              <p className="text-cyan-400/80 font-body text-xs leading-relaxed mb-6">
                Prepare for optimal drift synchronization by reviewing sector anomaly reports.
              </p>
              
              <div className="w-full border-t border-white/5 pt-4 space-y-4">
                 <div className="flex flex-col gap-1">
                    <span className="font-headline font-bold text-[10px] text-cyan-400 uppercase tracking-widest text-left mt-2">Objective:</span>
                    <p className="text-xs text-zinc-400">Navigate chronological distortions to reclaim fragmented code modules.</p>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="font-headline font-bold text-[10px] text-magenta-400 uppercase tracking-widest text-left mt-2">Hazard Warning:</span>
                    <p className="text-xs text-zinc-400">Avoid timeline spikes and redundant loops to maintain stable sync rate.</p>
                 </div>
              </div>

              <div className="mt-auto w-full pt-4 border-t border-cyan-500/20">
                 <div className="w-full bg-cyan-900/20 text-cyan-400 text-[10px] font-headline uppercase p-2 border border-cyan-500/30 text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                    Terminal Guide Online
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default LevelSelection;
