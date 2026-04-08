import React from 'react';

interface MissionFailedProps {
  onRestart: () => void;
  onMenu: () => void;
  onToggleSettings: () => void;
}

const MissionFailed: React.FC<MissionFailedProps> = ({ onRestart, onMenu, onToggleSettings }) => {
  return (
    <div className="absolute inset-0 z-50 bg-theme-bg text-on-surface font-body h-screen w-screen selection:bg-red-500 selection:text-zinc-950 overflow-hidden pointer-events-auto">
      {/* Blurred Gameplay Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img 
            className="w-full h-full object-cover grayscale opacity-20 blur-xl" 
            alt="Background" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIOzqjWvz2W505Kc72zEQTH75dqpYncFkH-w1VYmT0siA_d1Ktr5kagRX9jVvsujkoCs68R5LYo9LaA-qkZr4UQdovmbyn9cvYNYkcYO9CBZfEvp6YldOGXZ4SS2LqKyHv2K0Xj_O3qxA4yYI99VZreVkrYQbDPXPy3yt71dTFK0Me6hQFXVz-4T5Jn7AN34J9ZYzTh9EGm0jlXbMCdjoP6bQ63Uv89UFjrg67vZXr92IG6OZVPzdSFhQR2IjHHxJV9SjxgoplOs9G"
        />
      </div>

      {/* Particle/Glow Overlays (RED) */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 blur-[120px] animate-pulse delay-700"></div>
      </div>

      {/* Shared Header Component */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-transparent text-white pointer-events-none">
        <div className="text-2xl font-black italic text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] font-headline uppercase tracking-[0.1em] pointer-events-auto">
          ECHO DRIFT
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
        <div className="max-w-6xl w-full flex flex-col items-center">
            {/* Failure Headline */}
            <div className="text-center mb-16 space-y-2 w-full pointer-events-none">
              <p className="font-headline text-red-500 tracking-[0.4em] text-sm mb-4 uppercase">CRITICAL SYSTEM FAILURE</p>
              <h1 className="font-headline text-5xl md:text-8xl font-black italic tracking-tighter text-white drop-shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                SYNCHRONIZATION LOST
              </h1>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent mt-8"></div>
            </div>

            <div className="w-full max-w-2xl text-center text-zinc-400 font-body mb-16 pointer-events-none">
               <p>Your physical anchor has de-synced from the temporal timeline. Avoid paradox overlapping and remain within stable topological bounds to prevent a complete collapse.</p>
            </div>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-col md:flex-row gap-6 w-full max-w-2xl text-zinc-950">
              <button 
                onClick={onMenu}
                style={{ pointerEvents: 'auto' }}
                className="flex-1 px-8 py-5 border border-zinc-500/30 text-white font-headline font-bold tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 group z-50 cursor-pointer"
              >
                <span className="material-symbols-outlined group-hover:block transition-all">exit_to_app</span>
                ABORT MISSION
              </button>

              <button 
                onClick={onRestart}
                style={{ pointerEvents: 'auto' }}
                className="flex-[1.5] px-8 py-5 bg-red-600 text-zinc-950 font-headline font-black tracking-[0.2em] hover:scale-105 transition-transform flex items-center justify-center gap-3 relative overflow-hidden group shadow-[0_10px_40px_rgba(239,68,68,0.3)] z-50 cursor-pointer"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]"></div>
                <span className="material-symbols-outlined group-hover:animate-spin">restart_alt</span>
                RESTART NODE
              </button>
            </div>
        </div>
      </main>

      {/* Side Decoration Readouts */}
      <aside className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 opacity-40 z-50 pointer-events-none">
        <div className="text-right text-red-500">
          <p className="font-headline text-[10px] uppercase">LATENCY_CRITICAL</p>
          <p className="font-headline font-bold text-xs text-white">999.0ms</p>
        </div>
        <div className="text-right text-orange-500">
          <p className="font-headline text-[10px] uppercase">ENCRYPTION_BREACHED</p>
          <p className="font-headline font-bold text-xs text-white">WARNING</p>
        </div>
      </aside>

      <div className="scanline-overlay pointer-events-none z-[110]" />
    </div>
  );
};

export default MissionFailed;
