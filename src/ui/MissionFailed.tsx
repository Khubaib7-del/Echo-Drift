import React from 'react';

interface MissionFailedProps {
  onRestart: () => void;
  onMenu: () => void;
  onToggleSettings: () => void;
}

const MissionFailed: React.FC<MissionFailedProps> = ({ onRestart, onMenu, onToggleSettings }) => {
  return (
    <div className="absolute inset-0 z-50 bg-zinc-950 text-white font-body h-screen w-screen selection:bg-red-500 selection:text-zinc-950 overflow-hidden pointer-events-auto">
      {/* Blurred Gameplay Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50"></div>
      </div>

      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-transparent text-white pointer-events-none">
        <div className="text-2xl font-black italic text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] font-headline uppercase tracking-[0.1em] pointer-events-auto">
          ECHO DRIFT // CRITICAL
        </div>
        <div className="flex gap-6 pointer-events-auto">
          <button 
            onClick={onToggleSettings}
            className="hover:bg-red-500/10 hover:skew-x-[-12deg] transition-all p-2 group"
          >
            <span className="material-symbols-outlined text-red-500">settings</span>
          </button>
        </div>
      </header>

      <main className="relative z-20 h-full w-full overflow-y-auto animated-scrollbar flex flex-col items-center p-6 md:p-12 pt-32 pb-40">
        <div className="max-w-4xl w-full flex flex-col items-center">
            {/* Failure Headline with Glitch */}
            <div className="text-center mb-16 space-y-2 w-full pointer-events-none">
              <p className="font-headline text-red-500 tracking-[0.4em] text-sm mb-4 uppercase animate-pulse">CONNECTION_INTERRUPTED</p>
              <h1 className="font-headline text-5xl md:text-8xl font-black italic tracking-tighter text-white drop-shadow-[0_0_30px_rgba(239,68,68,0.4)] glitch-text">
                SYNC_LOST
              </h1>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent mt-8"></div>
            </div>

            <div className="w-full max-w-2xl text-center text-zinc-500 font-mono text-sm mb-16 pointer-events-none uppercase tracking-widest leading-loose">
               <p className="bg-red-500/10 p-4 border border-red-500/20">
                ERROR: 0x800412 // TOPOLOGICAL_ANCHOR_BREACHED <br/>
                PROXIMITY_OVERLAP_DETECTED // TEMPORAL_COLLAPSE_IMMINENT
               </p>
            </div>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-col md:flex-row gap-6 w-full max-w-2xl text-zinc-950">
              <button 
                onClick={onMenu}
                style={{ pointerEvents: 'auto' }}
                className="flex-1 px-8 py-5 border border-red-500/30 text-white font-headline font-bold tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 z-50 cursor-pointer"
              >
                ABORT_SEQUENCE
              </button>

              <button 
                onClick={onRestart}
                style={{ pointerEvents: 'auto' }}
                className="flex-[1.5] px-8 py-5 bg-red-600 text-zinc-950 font-headline font-black tracking-[0.2em] hover:scale-105 transition-transform flex items-center justify-center gap-3 relative overflow-hidden group shadow-[0_10px_40px_rgba(239,68,68,0.3)] z-50 cursor-pointer"
              >
                RE-SYNC_NODE
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
        </div>
      </main>

      <div className="scanline-overlay pointer-events-none z-[110] opacity-40" />
    </div>
  );
};

export default MissionFailed;
