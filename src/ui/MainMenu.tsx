import React from 'react';

interface MainMenuProps {
  onStart: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart }) => {
  return (
    <div className="absolute inset-0 z-10 flex text-on-background">
      {/* Background Parallax Layer */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface-container-lowest"></div>
      </div>

      {/* SideNavBar Shell */}
      <aside className="fixed left-0 top-0 h-full flex flex-col z-40 bg-zinc-950/40 backdrop-blur-xl w-64 shadow-[10px_0_30px_-15px_rgba(0,240,255,0.2)]">
        <div className="p-8 mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-surface-container-highest border border-primary-container/20 flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-cyan-400">memory</span>
            </div>
            <div>
              <h2 className="text-cyan-400 font-bold font-headline text-sm tracking-tighter">SECTOR 7-G</h2>
              <p className="text-[10px] text-cyan-400/50 uppercase tracking-widest">PRESENT_TIMELINE_STABLE</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button onClick={onStart} className="w-full flex items-center gap-4 py-3 px-4 bg-cyan-400 text-zinc-950 font-black clip-path-custom transition-all">
              <span className="material-symbols-outlined font-variation-[FILL_1]">rocket_launch</span>
              <span className="font-headline tracking-tighter uppercase text-sm">MISSION</span>
            </button>
            <button onClick={onStart} className="w-full flex items-center gap-4 py-3 px-4 text-cyan-400/50 hover:text-cyan-300 hover:translate-x-2 transition-transform duration-200">
              <span className="material-symbols-outlined">history_toggle_off</span>
              <span className="font-headline tracking-tighter uppercase text-sm">TIMELINE</span>
            </button>
          </div>
        </div>

        <div className="mt-auto p-8 border-t border-cyan-500/10">
          <button 
            onClick={onStart}
            className="w-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-headline uppercase py-3 text-sm hover:bg-cyan-400 hover:text-zinc-950 hover:shadow-[0_0_15px_#00F0FF] transition-all"
          >
            INITIATE DRIFT
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 h-full relative z-10 flex items-center justify-center w-full">
        <div className="max-w-4xl w-full px-12 flex flex-col items-start pointer-events-auto">
          
          {/* Hero Title Section */}
          <div className="mb-16 relative">
            <div className="absolute -top-12 -left-8 text-[100px] font-black text-cyan-400/5 select-none pointer-events-none font-headline">010101</div>
            <h1 className="text-9xl font-black font-headline tracking-[-0.05em] glitch-text leading-none text-white italic">
              ECHO<br/><span className="text-cyan-400">DRIFT</span>
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <div className="h-[1px] w-24 bg-cyan-400"></div>
              <p className="font-headline uppercase text-cyan-400 tracking-[0.5em] text-xs">Synchronizing Temporal Nodes...</p>
            </div>
          </div>

          {/* Bento Menu Actions */}
          <div className="grid grid-cols-12 gap-4 w-full">
            <button 
              onClick={onStart}
              className="col-span-8 bg-cyan-400 p-8 flex items-end justify-between group hover:shadow-[0_0_30px_#00f0ff] transition-all relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-zinc-950">speed</span>
              </div>
              <div className="text-left">
                <div className="text-zinc-950 font-headline font-black text-4xl uppercase tracking-tighter leading-none mb-1">ENTER THE RIFT</div>
                <div className="text-zinc-950/60 font-body text-sm font-bold uppercase tracking-widest">Begin Synchronization Sequence</div>
              </div>
              <span className="material-symbols-outlined text-zinc-950 text-4xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>

            <button onClick={onStart} className="col-span-4 glass-panel border border-cyan-500/10 p-6 flex flex-col justify-between hover:bg-cyan-500/5 transition-colors group">
              <span className="material-symbols-outlined text-cyan-400 text-3xl mb-4 text-left">settings_input_component</span>
              <div className="text-left">
                <div className="text-cyan-400 font-headline font-bold text-lg uppercase leading-none mb-1">CALIBRATION</div>
                <p className="text-[10px] text-cyan-400/40 uppercase tracking-widest">Sector Settings</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainMenu;
