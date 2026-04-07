import React from 'react';

interface MissionSuccessProps {
  onNext: () => void;
  onMenu: () => void;
  onToggleSettings: () => void;
}

const MissionSuccess: React.FC<MissionSuccessProps> = ({ onNext, onMenu, onToggleSettings }) => {
  return (
    <div className="absolute inset-0 z-50 bg-surface text-on-surface font-body h-screen w-screen relative selection:bg-cyan-400 selection:text-zinc-950 overflow-hidden">
      {/* Blurred Gameplay Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img 
          className="w-full h-full object-cover filter blur-xl brightness-[0.3] scale-110" 
          alt="abstract sci-fi landscape" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_zqBcwuqzqLI6bMSJNs_aCyZVEQ01mwy2BP6cO-ZDG9P8svthff_FJZtVgZR4clKuDSxVm8mX2tu3yjzOX6GvQ0H3qukmxWK1goD1F5xFhHH5wjVZt46oyycfr9-lLeJOEJ1Jv8YKFGeTL74jPh8t5ggzlbk7LnNqPYWC1ulCN508rq3ht3Ku4Y6gnbdVjAJxq36c36TDUJNszhyhQKMlx0PWoVgs1UnTO7-vqwBIJ1U7n4lSbFjWIW2iQaU5xu51Lwxgso9vnd-S"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
      </div>

      {/* Particle/Glow Overlays */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-400/10 blur-[120px] animate-pulse delay-700"></div>
      </div>

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

      {/* Main Content Canvas (Scrollable) */}
      <main className="relative z-20 h-full w-full overflow-y-auto animated-scrollbar flex flex-col items-center p-6 md:p-12 pt-32 pb-40">
        <div className="max-w-6xl w-full flex flex-col items-center">
            {/* Victory Headline */}
            <div className="text-center mb-16 space-y-2 w-full">
              <p className="font-headline text-cyan-400 tracking-[0.4em] text-sm mb-4 uppercase">OBJECTIVE REACHED</p>
              <h1 className="font-headline text-5xl md:text-8xl font-black italic tracking-tighter text-white drop-shadow-[0_0_30px_rgba(219,252,255,0.4)]">
                SYNCHRONIZATION COMPLETE
              </h1>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mt-8"></div>
            </div>

            {/* Bento Grid Stats Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-white">
              {/* Stat Card: Time */}
              <div className="glass-panel border-l-2 border-cyan-400 p-8 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-cyan-400/20 font-headline font-black text-6xl">01</div>
                <label className="font-headline text-xs text-cyan-400 tracking-widest block mb-1 uppercase">CHRONO_DATA</label>
                <h3 className="font-headline text-xl text-zinc-300 uppercase mb-4">Time Elapsed</h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-5xl font-bold text-white">04:12</span>
                  <span className="text-white/40 font-headline text-sm">.88</span>
                </div>
                <div className="mt-4 h-1 bg-surface-container-highest w-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-3/4"></div>
                </div>
              </div>

              {/* Stat Card: Echoes */}
              <div className="glass-panel border-l-2 border-magenta-400 p-8 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-magenta-400/20 font-headline font-black text-6xl">02</div>
                <label className="font-headline text-xs text-magenta-400 tracking-widest block mb-1 uppercase">PULSE_SYNC</label>
                <h3 className="font-headline text-xl text-zinc-300 uppercase mb-4">Echoes Triggered</h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-5xl font-bold text-white">24</span>
                  <span className="text-white/40 font-headline text-sm">/ 30</span>
                </div>
                <div className="mt-4 flex gap-1">
                  <div className="h-1 bg-magenta-400 flex-1"></div>
                  <div className="h-1 bg-magenta-400 flex-1"></div>
                  <div className="h-1 bg-magenta-400 flex-1"></div>
                  <div className="h-1 bg-magenta-400/20 flex-1"></div>
                </div>
              </div>

              {/* Stat Card: Secrets */}
              <div className="glass-panel border-l-2 border-cyan-400 p-8 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-cyan-400/20 font-headline font-black text-6xl">03</div>
                <label className="font-headline text-xs text-cyan-400 tracking-widest block mb-1 uppercase">ARCHIVE_RETRIEVAL</label>
                <h3 className="font-headline text-xl text-zinc-300 uppercase mb-4">Secrets Discovered</h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-5xl font-bold text-white">03</span>
                  <span className="text-white/40 font-headline text-sm uppercase">CORES</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="material-symbols-outlined text-cyan-400 font-variation-[FILL_1]">token</span>
                  <span className="material-symbols-outlined text-cyan-400 font-variation-[FILL_1]">token</span>
                  <span className="material-symbols-outlined text-cyan-400 font-variation-[FILL_1]">token</span>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="mt-16 flex flex-col md:flex-row gap-6 w-full max-w-2xl text-white">
              <button 
                onClick={onMenu}
                className="flex-1 px-8 py-5 border border-zinc-500/30 font-headline font-bold tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 group"
              >
                <span className="material-symbols-outlined group-hover:animate-spin">refresh</span>
                ABORT MISSION
              </button>

              <button 
                onClick={onNext}
                className="flex-[1.5] px-8 py-5 bg-gradient-to-r from-cyan-400 to-cyan-500 text-zinc-950 font-headline font-black tracking-[0.2em] hover:scale-105 transition-transform flex items-center justify-center gap-3 relative overflow-hidden group shadow-[0_10px_40px_rgba(0,240,255,0.3)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]"></div>
                NEXT MISSION
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
        </div>
      </main>

      {/* Side Decoration Readouts */}
      <aside className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 opacity-40 z-50 pointer-events-none">
        <div className="text-right">
          <p className="font-headline text-[10px] text-cyan-400 uppercase">LATENCY_STABLE</p>
          <p className="font-headline font-bold text-xs text-white">0.002ms</p>
        </div>
        <div className="text-right">
          <p className="font-headline text-[10px] text-magenta-400 uppercase">ENCRYPTION_LEVEL</p>
          <p className="font-headline font-bold text-xs text-white">OMEGA-7</p>
        </div>
        <div className="text-right">
          <p className="font-headline text-[10px] text-cyan-400 uppercase">DRIFT_DEPTH</p>
          <p className="font-headline font-bold text-xs text-white">4,800m</p>
        </div>
      </aside>
    </div>
  );
};

export default MissionSuccess;
