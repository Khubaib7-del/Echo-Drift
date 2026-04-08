import React from 'react';

interface TimelineScreenProps {
  highestUnlockedLevel: number;
}

const TimelineScreen: React.FC<TimelineScreenProps> = ({ highestUnlockedLevel }) => {
  const currentSector = Math.min(11, Math.ceil((highestUnlockedLevel || 1) / 5));

  const baseEvents = [
    { year: 'CYC_001', title: 'INITIATION', desc: 'First Echo Node synchronized. Base physical state logged.' },
    { year: 'CYC_014', title: 'FRACTURE EVENT', desc: 'Temporal destabilization detected in Sector 1. Anomalies spawned.' },
  ];

  // Dynamically push timeline events depending on how far the player has gotten
  if (currentSector >= 3) baseEvents.push({ year: 'CYC_045', title: 'RECALIBRATION', desc: 'System stabilized in Sector 3. New drift paths unlocked for transit.' });
  if (currentSector >= 7) baseEvents.push({ year: 'CYC_112', title: 'DEEP DRIFT', desc: 'Entered the deep zone. Signal interference increasing. Ghost echoes active.' });
  if (currentSector >= 11) baseEvents.push({ year: 'CYC_255', title: 'BETA CLEARANCE', desc: 'Accessing classified Beta nodes. Warning: Hostile entities detected.' });
  
  // The terminal state
  baseEvents.push({ year: 'CYC_NOW', title: 'PRESENT', desc: `Current drift node: Sector ${currentSector}. Stability at ${Math.max(0, 100 - (currentSector*8))}%.` });

  return (
    <div className="w-full h-full flex flex-col p-12 overflow-y-auto animated-scrollbar">
      <div className="flex items-center gap-4 mb-12 shrink-0">
        <span className="material-symbols-outlined text-6xl text-theme-primary">history_toggle_off</span>
        <div>
          <h1 className="text-4xl font-headline font-black text-white uppercase tracking-widest">Temporal Timeline</h1>
          <p className="text-theme-primary/60 font-body">Chronological mapping of node drift events</p>
        </div>
      </div>
      
      <div className="w-full max-w-4xl relative">
        {/* Core Timeline Beam running down the middle */}
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-theme-primary/10 via-theme-primary to-theme-secondary/20 -translate-x-1/2 hidden md:block"></div>
        {/* Particles on timeline */}
        <div className="absolute left-[50%] top-[30%] w-[3px] h-[30px] bg-white hidden md:block animate-[pulse_2s_ease-in-out_infinite] blur-[2px] -translate-x-1/2"></div>
        <div className="absolute left-[50%] top-[70%] w-[2px] h-[15px] bg-theme-primary hidden md:block animate-[pulse_1s_ease-in-out_infinite] -translate-x-1/2"></div>

        <div className="relative space-y-0 flex flex-col pb-12 w-full">
          {baseEvents.map((evt, idx) => {
             const isLeft = idx % 2 === 0;
             const isTerminal = idx === baseEvents.length - 1;

             return (
              <div key={idx} className={`relative flex items-center justify-center w-full group py-6 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                
                {/* Center Node */}
                <div className="absolute left-[20px] md:left-[50%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className={`w-6 h-6 rounded-none rotate-45 border border-theme-primary bg-black flex items-center justify-center transition-all duration-500 group-hover:bg-theme-primary group-hover:scale-125 ${isTerminal ? 'shadow-[0_0_20px_rgba(var(--theme-primary),1)] bg-theme-primary/20' : ''}`}>
                    {isTerminal && <div className="w-2 h-2 bg-white rotate-45 animate-ping"></div>}
                  </div>
                </div>

                {/* Connecting branch line */}
                <div className={`absolute top-1/2 -translate-y-1/2 h-[1px] bg-theme-primary/30 z-10 transition-all duration-500 group-hover:bg-theme-primary hidden md:block ${isLeft ? 'right-[50%] w-12' : 'left-[50%] w-12'}`}></div>

                {/* Content Box */}
                <div className={`w-full md:w-1/2 relative pl-16 md:pl-0 ${isLeft ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <div className={`glass-panel p-6 border transition-all duration-500 inline-block w-full 
                    ${isTerminal ? 'border-theme-primary bg-theme-primary/5' : 'border-white/5 hover:border-theme-primary/40 bg-white/5 hover:bg-black'}
                    group-hover:translate-x-2 ${isLeft ? 'md:group-hover:-translate-x-2' : ''}
                  `}>
                    <div className={`flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'} mb-3`}>
                       <span className="text-theme-primary font-mono text-sm tracking-[0.2em]">{evt.year}</span>
                       <h3 className="text-xl font-black text-white uppercase tracking-wider">{evt.title}</h3>
                    </div>
                    
                    <p className={`text-zinc-400 font-body text-sm leading-relaxed ${isLeft ? 'md:text-right' : ''}`}>{evt.desc}</p>
                  </div>
                </div>
              </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default TimelineScreen;
