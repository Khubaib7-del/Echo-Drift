const TimelineScreen = () => {
  const events = [
    { year: '2024.1', title: 'INITIATION', desc: 'First Echo Node synchronized.' },
    { year: '2024.5', title: 'FRACTURE EVENT', desc: 'Temporal destabilization detected in Sector Alpha.' },
    { year: '2025.2', title: 'RECALIBRATION', desc: 'System stabilized. New drift paths unlocked.' },
    { year: '2026.4', title: 'PRESENT', desc: 'Current drift node. Stability at 92%.' },
  ];

  return (
    <div className="w-full h-full flex flex-col p-12 overflow-y-auto animated-scrollbar">
      <div className="flex items-center gap-4 mb-12">
        <span className="material-symbols-outlined text-6xl text-cyan-400">history_toggle_off</span>
        <div>
          <h1 className="text-4xl font-headline font-black text-white uppercase tracking-widest">Temporal Timeline</h1>
          <p className="text-cyan-400/60 font-body">Chronological mapping of node drift events</p>
        </div>
      </div>
      
      <div className="relative border-l-2 border-cyan-400/30 ml-8 pl-8 space-y-12 pb-12">
        {events.map((evt, idx) => (
          <div key={idx} className="relative group perspective-1000">
            <div className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-surface-container-highest border-2 border-cyan-400 group-hover:scale-150 group-hover:bg-cyan-400 transition-all ${idx === events.length - 1 ? 'animate-pulse shadow-[0_0_15px_#00F0FF]' : ''}`}></div>
            <div className="glass-panel p-6 border border-cyan-500/10 hover:border-cyan-400/50 transition-all hover:bg-cyan-900/20 group-hover:translate-x-2">
              <span className="text-cyan-400 font-black font-headline text-2xl tracking-widest block mb-2">{evt.year}</span>
              <h3 className="text-xl font-bold text-white uppercase mb-2 group-hover:text-cyan-300 transition-colors">{evt.title}</h3>
              <p className="text-zinc-400 text-sm">{evt.desc}</p>
            </div>
          </div>
        ))}
        {/* Glow point ending */}
        <div className="absolute -left-[35px] bottom-0 w-2 h-2 rounded-full bg-magenta-500 animate-pulse"></div>
      </div>
    </div>
  );
};

export default TimelineScreen;
