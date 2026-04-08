const MemoriesScreen = () => {
  const memories = [
    { title: 'Fracture Arrival', date: 'CYCLE 14' },
    { title: 'The Echo Encounter', date: 'CYCLE 42' },
    { title: 'Signal Lost', date: 'CYCLE 59' },
    { title: 'Rebirth', date: 'CYCLE 88' },
    { title: 'Neon Storm', date: 'CYCLE 102' },
    { title: 'Horizon Breach', date: 'CYCLE 144' },
  ];

  return (
    <div className="w-full h-full flex flex-col p-12 overflow-hidden">
      <div className="flex items-center gap-4 mb-12 shrink-0">
        <span className="material-symbols-outlined text-6xl text-cyan-400">auto_awesome_motion</span>
        <div>
          <h1 className="text-4xl font-headline font-black text-white uppercase tracking-widest">Node Memories</h1>
          <p className="text-cyan-400/60 font-body">Visually fragmented echoes from previous iterations</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto animated-scrollbar pb-24 pr-4 border-t border-cyan-400/20 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((mem, idx) => (
            <div key={idx} className="glass-panel border border-cyan-500/10 hover:border-cyan-400/50 p-2 cursor-pointer group flex flex-col transition-all hover:scale-[1.02]">
              <div className="w-full h-40 bg-zinc-900 border border-zinc-800 relative overflow-hidden mb-3">
                <div className="absolute inset-0 bg-cyan-400/5 z-10 group-hover:bg-transparent transition-colors"></div>
                {/* Randomly generated abstract pattern background block */}
                <div className="w-full h-full filter grayscale sepia hue-rotate-[180deg] saturate-200 group-hover:grayscale-0 transition-all duration-500 flex items-center justify-center opacity-30 group-hover:opacity-100">
                   <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,240,255,0.1)_10px,rgba(0,240,255,0.1)_20px)] animate-pulse-soft"></div>
                </div>
                <div className="absolute bottom-2 right-2 flex gap-1 z-20">
                    <span className="w-2 h-2 bg-cyan-400"></span>
                    <span className="w-2 h-2 bg-zinc-700"></span>
                </div>
              </div>
              <div className="px-2 pb-2">
                <h3 className="text-sm font-black font-headline uppercase text-white group-hover:text-cyan-400 transition-colors tracking-widest">{mem.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">{mem.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoriesScreen;
