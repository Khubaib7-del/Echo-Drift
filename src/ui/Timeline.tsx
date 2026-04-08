import React from 'react';

interface TimelineScreenProps {
  highestUnlockedLevel: number;
}

const TimelineScreen: React.FC<TimelineScreenProps> = ({ highestUnlockedLevel }) => {
  const currentSector = Math.min(11, Math.ceil(highestUnlockedLevel / 5));

  const baseEvents = [
    { year: '2024.1', title: 'INITIATION', desc: 'First Echo Node synchronized.' },
    { year: '2024.5', title: 'FRACTURE EVENT', desc: 'Temporal destabilization detected in Sector 1.' },
  ];

  // Dynamically push timeline events depending on how far the player has gotten
  if (currentSector >= 3) baseEvents.push({ year: '2025.2', title: 'RECALIBRATION', desc: 'System stabilized in Sector 3. New drift paths unlocked.' });
  if (currentSector >= 7) baseEvents.push({ year: '2025.8', title: 'DEEP DRIFT', desc: 'Entered the deep zone. Signal interference increasing.' });
  if (currentSector >= 11) baseEvents.push({ year: '2026.1', title: 'BETA CLEARANCE', desc: 'Accessing classified Beta nodes. Warning: Hostile entities.' });
  
  // The terminal state
  baseEvents.push({ year: '2026.4', title: 'PRESENT', desc: `Current drift node: Sector ${currentSector}. Stability at ${100 - (currentSector*8)}%.` });

  return (
    <div className="w-full h-full flex flex-col p-12 overflow-y-auto animated-scrollbar">
      <div className="flex items-center gap-4 mb-12">
        <span className="material-symbols-outlined text-6xl text-theme-primary">history_toggle_off</span>
        <div>
          <h1 className="text-4xl font-headline font-black text-white uppercase tracking-widest">Temporal Timeline</h1>
          <p className="text-theme-primary/60 font-body">Chronological mapping of node drift events</p>
        </div>
      </div>
      
      <div className="relative border-l-2 border-theme-primary/30 ml-8 pl-8 space-y-12 pb-12">
        {baseEvents.map((evt, idx) => (
          <div key={idx} className="relative group perspective-1000">
            <div className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-surface-container-highest border-2 border-theme-primary group-hover:scale-150 group-hover:bg-theme-primary transition-all ${idx === baseEvents.length - 1 ? 'animate-pulse shadow-[0_0_15px_rgba(var(--theme-primary),0.8)]' : ''}`}></div>
            <div className="glass-panel p-6 border border-theme-primary/10 hover:border-theme-primary/50 transition-all hover:bg-theme-primary/10 group-hover:translate-x-2">
              <span className="text-theme-primary font-black font-headline text-2xl tracking-widest block mb-2">{evt.year}</span>
              <h3 className="text-xl font-bold text-white uppercase mb-2 group-hover:text-white transition-colors">{evt.title}</h3>
              <p className="text-zinc-400 text-sm">{evt.desc}</p>
            </div>
          </div>
        ))}
        {/* Glow point ending */}
        <div className="absolute -left-[35px] bottom-0 w-2 h-2 rounded-full bg-theme-secondary animate-pulse"></div>
      </div>
    </div>
  );
};

export default TimelineScreen;
