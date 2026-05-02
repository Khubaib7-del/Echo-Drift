import React from 'react';

interface MissionFailedProps {
  onRestart: () => void;
  onMenu: () => void;
  onToggleSettings: () => void;
}

const MissionFailed: React.FC<MissionFailedProps> = ({ onRestart, onMenu, onToggleSettings }) => {
  return (
    <div className="absolute inset-0 z-50 bg-zinc-950 text-white font-body selection:bg-red-500 selection:text-zinc-950 overflow-hidden pointer-events-auto overflow-x-hidden">
      {/* Blurred Gameplay Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50"></div>
      </div>

      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-transparent text-white pointer-events-none">
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

      <main className="relative z-20 h-full w-full overflow-y-auto overflow-x-hidden animated-scrollbar flex flex-col items-center p-6 md:p-12 pt-32 pb-40">
        <div className="max-w-4xl w-full flex flex-col items-center">
            {/* Failure Headline with Glitch */}
            <div className="text-center mb-16 space-y-2 w-full pointer-events-none">
              <p className="font-headline text-red-500 tracking-[0.4em] text-sm mb-4 uppercase animate-pulse">CONNECTION_SEVERED</p>
              <h1 className="font-headline text-5xl md:text-8xl font-black italic tracking-tighter text-white drop-shadow-[0_0_50px_rgba(239,68,68,0.6)] glitch-text">
                SYNC_TERMINATED
              </h1>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent mt-12"></div>
            </div>

            <div className="w-full max-w-2xl text-center mb-16 pointer-events-none">
               <div className="bg-red-500/5 p-8 border border-red-500/10 -skew-x-[12deg]">
                  <div className="skew-x-[12deg]">
                    <span className="block text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em] mb-2">Failure_Log</span>
                    <p className="text-xl font-bold text-red-400 uppercase tracking-widest">PROXIMITY_OVERLAP_CRITICAL</p>
                    <p className="text-[10px] font-mono text-zinc-700 mt-4 uppercase">Neural_Link: Decoupled // Signal_Lost</p>
                  </div>
               </div>
            </div>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-col md:flex-row gap-8 w-full max-w-2xl">
              <button 
                onClick={onRestart}
                style={{ pointerEvents: 'auto' }}
                className="flex-[2] py-8 bg-red-600 hover:bg-red-500 text-white font-black font-headline text-2xl uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-6 group shadow-[0_0_60px_rgba(239,68,68,0.2)] hover:shadow-[0_0_80px_rgba(239,68,68,0.4)] -skew-x-[12deg] z-50 cursor-pointer"
              >
                <div className="skew-x-[12deg] flex items-center gap-4">
                    <span className="material-symbols-outlined text-3xl font-bold">refresh</span>
                    REBOOT_INITIATIVE
                </div>
              </button>

              <button 
                onClick={onMenu}
                style={{ pointerEvents: 'auto' }}
                className="flex-1 py-8 border border-white/10 hover:bg-white/5 text-zinc-500 hover:text-white font-black font-headline text-lg uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 -skew-x-[12deg] z-50 cursor-pointer"
              >
                <div className="skew-x-[12deg]">ABORT_SYNC</div>
              </button>
            </div>
        </div>
      </main>

      <div className="scanline-overlay pointer-events-none z-[110] opacity-40" />
    </div>
  );
};

export default MissionFailed;
