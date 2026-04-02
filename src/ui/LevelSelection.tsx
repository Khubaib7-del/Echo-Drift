import React from 'react';

interface LevelSelectionProps {
  onSelectLevel: (levelIndex: number) => void;
  onBack: () => void;
}

const LevelSelection: React.FC<LevelSelectionProps> = ({ onSelectLevel, onBack }) => {
  const levels = [
    { id: 1, name: 'SECTOR ALPHA', status: 'UNLOCKED', sync: '0%', color: 'border-cyan-400' },
    { id: 2, name: 'ECHO BRIDGE', status: 'UNLOCKED', sync: '0%', color: 'border-cyan-400' },
    { id: 3, name: 'THE FRACTURE', status: 'UNLOCKED', sync: '0%', color: 'border-cyan-400' },
  ];

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-auto bg-background/90 backdrop-blur-md">
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full border-[0.5px] border-cyan-400/20 grid grid-cols-6 grid-rows-6">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="border-[0.5px] border-cyan-400/10"></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="w-full max-w-5xl mb-12 flex justify-between items-end relative z-10 px-8">
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

      {/* Level Cards */}
      <div className="grid grid-cols-3 gap-8 w-full max-w-5xl relative z-10 px-8">
        {levels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => lvl.status === 'UNLOCKED' && onSelectLevel(lvl.id)}
            className={`
              relative flex flex-col items-start p-8 transition-all duration-300
              ${lvl.status === 'UNLOCKED' ? 'hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)] cursor-pointer' : 'opacity-40 cursor-not-allowed grayscale'}
              bg-surface-container-high border-t border-l ${lvl.color}
              before:absolute before:right-0 before:top-0 before:w-6 before:h-6 before:bg-background before:clip-path-custom
            `}
          >
            <div className="w-12 h-12 mb-6 bg-surface-container-lowest border border-white/5 flex items-center justify-center">
              <span className="font-headline text-xl text-white/40 font-black">0{lvl.id}</span>
            </div>
            
            <h3 className="text-2xl font-black font-headline uppercase mb-2 text-white">{lvl.name}</h3>
            
            <div className="w-full h-[1px] bg-white/5 my-4"></div>
            
            <div className="w-full flex justify-between items-center text-xs font-headline tracking-widest uppercase">
              <span className={lvl.status === 'UNLOCKED' ? 'text-cyan-400' : 'text-zinc-500'}>{lvl.status}</span>
              <span className="text-zinc-600">SYNC: {lvl.sync}</span>
            </div>
            
            {/* Status light */}
            {lvl.status === 'UNLOCKED' && (
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan-400 animate-pulse-slow shadow-[0_0_8px_#00F0FF]"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;
