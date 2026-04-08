import React from 'react';

interface MemoriesScreenProps {
  highestUnlockedLevel: number;
}

const MemoriesScreen: React.FC<MemoriesScreenProps> = ({ highestUnlockedLevel }) => {
  const allMemories = [
    { title: 'Fracture Arrival', date: 'CYCLE 14', imageUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=400&q=80' },
    { title: 'The Echo Encounter', date: 'CYCLE 42', imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80' },
    { title: 'Signal Lost', date: 'CYCLE 59', imageUrl: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?w=400&q=80' },
    { title: 'Rebirth', date: 'CYCLE 88', imageUrl: 'https://images.unsplash.com/photo-1515630278258-407f66498911?w=400&q=80' },
    { title: 'Neon Storm', date: 'CYCLE 102', imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80' },
    { title: 'Horizon Breach', date: 'CYCLE 144', imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&q=80' },
    { title: 'Deep Core Resonance', date: 'CYCLE 189', imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80' },
    { title: 'Beta Subroutine', date: 'CYCLE 255', imageUrl: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=400&q=80' }
  ];

  // Render 1 memory for every 5 levels (1 sector)
  const unlockedMemoriesCount = Math.max(1, Math.floor(highestUnlockedLevel / 5) + 1);
  const memories = allMemories.slice(0, Math.min(unlockedMemoriesCount, allMemories.length));

  return (
    <div className="w-full h-full flex flex-col p-12 overflow-hidden">
      <div className="flex items-center gap-4 mb-12 shrink-0">
        <span className="material-symbols-outlined text-6xl text-theme-primary">auto_awesome_motion</span>
        <div>
          <h1 className="text-4xl font-headline font-black text-white uppercase tracking-widest">Node Memories</h1>
          <p className="text-theme-primary/60 font-body">Visually fragmented echoes from previous iterations. ({memories.length} / {allMemories.length} recovered)</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto animated-scrollbar pb-24 pr-4 border-t border-theme-primary/20 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {memories.map((mem, idx) => (
            <div key={idx} className="glass-panel border border-theme-primary/10 hover:border-theme-primary p-3 cursor-pointer group flex flex-col transition-all hover:scale-105 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,240,255,0.2)]">
              <div className="w-full h-48 bg-zinc-900 border border-zinc-800 relative overflow-hidden mb-4">
                <div className="absolute inset-0 bg-theme-primary/20 mix-blend-color z-10 group-hover:opacity-0 transition-opacity duration-700"></div>
                <img 
                    src={mem.imageUrl} 
                    alt={mem.title} 
                    className="w-full h-full object-cover filter grayscale sepia group-hover:grayscale-0 group-hover:sepia-0 duration-700 transition-all group-hover:scale-110"
                />
                {/* Glitch Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50 z-20 pointer-events-none group-hover:opacity-10 transition-opacity"></div>
                
                <div className="absolute bottom-2 right-2 flex gap-1 z-30">
                    <span className="w-2 h-2 bg-theme-primary animate-pulse"></span>
                    <span className="w-2 h-2 bg-theme-secondary/50"></span>
                </div>
              </div>
              <div className="px-1 pb-2">
                <h3 className="text-base font-black font-headline uppercase text-white group-hover:text-theme-primary transition-colors tracking-widest leading-tight">{mem.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">{mem.date}</p>
                  <span className="material-symbols-outlined text-[14px] text-theme-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoriesScreen;
