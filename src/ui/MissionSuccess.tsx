import React from 'react';

interface MissionSuccessProps {
  onNext: () => void;
  onMenu: () => void;
}

const MissionSuccess: React.FC<MissionSuccessProps> = ({ onNext, onMenu }) => {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-auto bg-background/95 backdrop-blur-xl">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-3xl w-full border border-cyan-400/20 bg-surface-container-low p-12 relative overflow-hidden group">
        
        {/* Animated scanline on success modal */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 opacity-50 block animate-[ping_3s_ease-in-out_infinite]"></div>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-cyan-400/10 border-2 border-cyan-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
            <span className="material-symbols-outlined text-cyan-400 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          
          <h1 className="text-5xl font-black font-headline tracking-tighter uppercase mb-2 text-white">Synchronization <span className="text-cyan-400">Complete</span></h1>
          <p className="text-sm font-headline tracking-widest uppercase text-cyan-400/60 mb-12">Sector Alpha Chronology Restored</p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 w-full mb-12">
            <div className="bg-surface-container-highest p-6 border-l-2 border-cyan-400">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-headline">Time Elapsed</div>
              <div className="text-2xl font-black text-white font-headline">01:24</div>
            </div>
            <div className="bg-surface-container-highest p-6 border-l-2 border-magenta-400">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-headline">Echo Desyncs</div>
              <div className="text-2xl font-black text-white font-headline">0</div>
            </div>
            <div className="bg-surface-container-highest p-6 border-l-2 border-cyan-400/30">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-headline">Temporal Grade</div>
              <div className="text-2xl font-black text-white font-headline">S</div>
            </div>
          </div>

          <div className="flex gap-6 w-full">
            <button 
              onClick={onMenu}
              className="flex-1 py-4 border border-outline-variant text-zinc-400 font-headline uppercase text-sm tracking-widest hover:bg-surface-container-highest transition-colors"
            >
              Return to Base
            </button>
            <button 
              onClick={onNext}
              className="flex-1 py-4 px-8 bg-cyan-400 text-zinc-950 font-black font-headline uppercase text-sm tracking-widest hover:bg-cyan-300 hover:shadow-[0_0_20px_#00F0FF] transition-all transform hover:-translate-y-1"
            >
              Next Sector
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MissionSuccess;
