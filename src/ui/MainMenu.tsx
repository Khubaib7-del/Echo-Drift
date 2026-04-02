import React, { useState } from 'react';
import TimelineScreen from './Timeline';
import ChartScreen from './Chart';
import MemoriesScreen from './Memories';

type Tab = 'MISSION' | 'TIMELINE' | 'CHART' | 'MEMORIES';

interface MainMenuProps {
  onStart: () => void; // Navigates to Level Selection
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart }) => {
  const [activeTab, setActiveTab] = useState<Tab>('MISSION');

  const getTabClass = (tab: Tab) => {
    if (activeTab === tab) {
      return "w-full flex items-center gap-4 py-3 px-4 bg-cyan-400 text-zinc-950 font-black clip-path-custom transition-all";
    }
    return "w-full flex items-center gap-4 py-3 px-4 text-cyan-400/50 hover:bg-cyan-900/20 hover:text-cyan-300 hover:translate-x-2 transition-all duration-200";
  };

  const getIconClass = (tab: Tab) => {
    if (activeTab === tab) {
      return "material-symbols-outlined font-variation-[FILL_1]";
    }
    return "material-symbols-outlined";
  };

  return (
    <div className="absolute inset-0 z-10 flex text-on-background bg-surface">
      {/* Background Parallax Layer */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface-container-lowest"></div>
      </div>

      {/* SideNavBar Shell */}
      <aside className="fixed left-0 top-0 h-full flex flex-col z-40 bg-zinc-950/40 backdrop-blur-xl w-64 shadow-[10px_0_30px_-15px_rgba(0,240,255,0.2)] pb-20">
        <div className="p-8 mt-20 flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-3 mb-8 shrink-0">
            <div className="w-10 h-10 bg-surface-container-highest border border-primary-container/20 flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-cyan-400">memory</span>
            </div>
            <div>
              <h2 className="text-cyan-400 font-bold font-headline text-sm tracking-tighter">SECTOR 7-G</h2>
              <p className="text-[10px] text-cyan-400/50 uppercase tracking-widest block whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]" title="PRESENT_TIMELINE">PRESENT TIMELINE</p>
            </div>
          </div>
          
          {/* Navigation Options - NO Scrollbar */}
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-2">
            <button onClick={() => setActiveTab('MISSION')} className={getTabClass('MISSION')}>
              <span className={getIconClass('MISSION')}>rocket_launch</span>
              <span className="font-headline tracking-tighter uppercase text-sm">MISSION</span>
            </button>
            <button onClick={() => setActiveTab('TIMELINE')} className={getTabClass('TIMELINE')}>
              <span className={getIconClass('TIMELINE')}>history_toggle_off</span>
              <span className="font-headline tracking-tighter uppercase text-sm">TIMELINE</span>
            </button>
            <button onClick={() => setActiveTab('CHART')} className={getTabClass('CHART')}>
              <span className={getIconClass('CHART')}>bar_chart</span>
              <span className="font-headline tracking-tighter uppercase text-sm">CHART</span>
            </button>
            <button onClick={() => setActiveTab('MEMORIES')} className={getTabClass('MEMORIES')}>
              <span className={getIconClass('MEMORIES')}>auto_awesome_motion</span>
              <span className="font-headline tracking-tighter uppercase text-sm">MEMORIES</span>
            </button>
          </div>
        </div>

        <div className="mt-auto p-8 border-t border-cyan-500/10 shrink-0">
          <button 
            onClick={onStart}
            className="w-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-headline uppercase py-3 text-sm hover:bg-cyan-400 hover:text-zinc-950 hover:shadow-[0_0_15px_#00F0FF] transition-all"
          >
            INITIATE DRIFT
          </button>
        </div>
      </aside>

      {/* Main Content Area - Animated Scrollbar Applied here! */}
      <main className="ml-64 h-full relative z-10 flex w-full animated-scrollbar pb-20">
        <div className="m-auto flex flex-col items-center justify-center w-full min-h-max py-20">
            {activeTab === 'MISSION' && (
            <div className="max-w-4xl w-full px-12 flex flex-col items-start pointer-events-auto">
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

                <button onClick={onStart} className="col-span-5 glass-panel border border-magenta-500/10 p-6 flex flex-col justify-between hover:bg-magenta-900/10 transition-colors group">
                    <span className="material-symbols-outlined text-magenta-400 text-3xl mb-4 text-left" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
                    <div className="text-left">
                    <div className="text-magenta-400 font-headline font-bold text-lg uppercase leading-none mb-1">MISSION LOG</div>
                    <p className="text-[10px] text-magenta-400/40 uppercase tracking-widest">Transmission Credits</p>
                    </div>
                </button>

                <div className="col-span-7 border border-outline-variant/20 p-6 flex items-center justify-between">
                    <div className="flex flex-col gap-1 items-start">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="text-[10px] font-headline text-cyan-400/80 uppercase">Node Alpha: Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-magenta-400/20"></span>
                        <span className="text-[10px] font-headline text-zinc-500 uppercase">Temporal Echo: Stable</span>
                    </div>
                    </div>
                    <div className="text-right">
                    <div className="text-2xl font-headline font-bold text-white leading-none">24.09</div>
                    <div className="text-[9px] uppercase tracking-tighter text-zinc-600 block">v0.4.2-STABLE</div>
                    </div>
                </div>
                </div>
            </div>
            )}

            {activeTab === 'TIMELINE' && <TimelineScreen />}
            {activeTab === 'CHART' && <ChartScreen />}
            {activeTab === 'MEMORIES' && <MemoriesScreen />}
        </div>
      </main>

      {/* Global Bottom Navbar from Gameplay HTML */}
      <footer className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 bg-zinc-950/60 backdrop-blur-md h-20 border-t border-cyan-500/20 shadow-[0_-10px_40px_rgba(0,240,255,0.1)]">
        <div className="flex flex-col items-center justify-center text-cyan-400/40 hover:text-magenta-400 hover:drop-shadow-[0_0_8px_#ff00ff] transition-all cursor-pointer">
            <span className="material-symbols-outlined">speed</span>
            <span className="font-headline text-[10px] uppercase tracking-widest mt-1">DASH</span>
        </div>
        <div className="flex flex-col items-center justify-center text-cyan-400/40 hover:text-magenta-400 hover:drop-shadow-[0_0_8px_#ff00ff] transition-all cursor-pointer">
            <span className="material-symbols-outlined">radar</span>
            <span className="font-headline text-[10px] uppercase tracking-widest mt-1">SCAN</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-cyan-400 text-zinc-950 p-3 scale-110 shadow-[0_0_15px_#00F0FF] glitch-jitter cursor-pointer">
            <span className="material-symbols-outlined font-variation-[FILL_1]">waves</span>
            <span className="font-headline font-black text-[10px] uppercase tracking-widest mt-1">DRIFT</span>
        </div>
        <div className="flex flex-col items-center justify-center text-cyan-400/40 hover:text-magenta-400 hover:drop-shadow-[0_0_8px_#ff00ff] transition-all cursor-pointer">
            <span className="material-symbols-outlined">explore</span>
            <span className="font-headline text-[10px] uppercase tracking-widest mt-1">MAP</span>
        </div>
        <div className="flex flex-col items-center justify-center text-cyan-400/40 hover:text-magenta-400 hover:drop-shadow-[0_0_8px_#ff00ff] transition-all cursor-pointer">
            <span className="material-symbols-outlined">terminal</span>
            <span className="font-headline text-[10px] uppercase tracking-widest mt-1">LOG</span>
        </div>
      </footer>
    </div>
  );
};

export default MainMenu;
