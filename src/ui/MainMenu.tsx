import React from 'react';

interface MainMenuProps {
    onStart: () => void;
    bestTime: number | null;
    onNavigate: (state: any) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart, bestTime, onNavigate }) => {
    return (
        <div className="flex-1 w-full h-full flex flex-col font-body text-white relative overflow-hidden bg-zinc-950 pointer-events-auto">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-white/10 -skew-x-[15deg]"></div>
                <div className="absolute right-[20%] top-0 bottom-0 w-[1px] bg-white/10 skew-x-[15deg]"></div>
            </div>

            {/* TOP BAR */}
            <div className="w-full h-16 border-b border-white/10 flex justify-between items-center px-12 z-30 bg-zinc-950/80 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-4">
                    <span 
                      onClick={() => onNavigate('MENU')}
                      className="font-headline font-black italic tracking-widest text-lg cursor-pointer hover:text-white transition-colors"
                    >
                      ECHO DRIFT <span className="text-zinc-600">// SYSTEM_OS</span>
                    </span>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 border border-white/20 px-3 py-1 bg-black/50">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-none">Command_Core<br/><span className="text-white">OPERATOR_01_HUB</span></span>
                    </div>
                    <div className="flex items-center gap-6 text-zinc-500">
                        <span onClick={() => onNavigate('ANALYTICS')} className="material-symbols-outlined text-sm hover:text-white cursor-pointer transition-colors" title="Analytics">laptop_windows</span>
                        <span onClick={() => onNavigate('TIMELINE')} className="material-symbols-outlined text-sm hover:text-white cursor-pointer transition-colors" title="Timeline">wifi_tethering</span>
                        <span onClick={() => onNavigate('MEMORIES')} className="material-symbols-outlined text-sm hover:text-white cursor-pointer transition-colors" title="Memories">memory</span>
                    </div>
                </div>
            </div>

            {/* SCROLLABLE CONTENT WRAPPER */}
            <div className="flex-1 flex overflow-hidden">
                {/* CENTER: Central Interaction Hub */}
                <main className="flex-1 min-w-[500px] flex flex-col p-12 pt-20 pl-16 overflow-y-auto animated-scrollbar">
                    <div className="space-y-4 mb-16">
                        <span className="text-[10px] font-mono uppercase tracking-[0.8em] text-zinc-600 block animate-pulse">INITIATING_SESSION</span>
                        <h2 className="text-7xl font-black font-headline italic uppercase tracking-tighter leading-none select-none">
                            OPERATOR<br/><span className="text-zinc-800">HUB_CENTRAL</span>
                        </h2>
                    </div>

                    <button 
                        onClick={onStart}
                        className="group relative w-full max-w-[500px] transition-transform hover:-translate-y-2 hover:scale-[1.01] cursor-pointer"
                    >
                        {/* Skewed Container */}
                        <div className="absolute inset-0 border-2 border-white/20 -skew-x-[15deg] group-hover:border-white transition-colors duration-300 shadow-[0_0_50px_rgba(255,255,255,0.02)]"></div>
                        <div className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500 -skew-x-[15deg]"></div>
                        
                        <div className="relative px-12 py-12 flex flex-col gap-6">
                            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-500 group-hover:text-zinc-950 transition-colors text-left">CRITICAL_ACTION: Neural_Link_09</span>
                            <div className="flex justify-between items-center text-white group-hover:text-zinc-950 transition-colors">
                                <h2 className="text-5xl font-black font-headline italic uppercase tracking-tighter text-left leading-none">BEGIN<br/>DRIFT</h2>
                                <span className="material-symbols-outlined text-6xl group-hover:translate-x-6 transition-transform">rocket_launch</span>
                            </div>
                            <div className="mt-6 border-t border-white/10 group-hover:border-zinc-950/20 pt-6 flex justify-between items-end">
                                <div className="text-left space-y-2">
                                    <span className="block text-[8px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-800 transition-colors">Sector_Status: Unstable</span>
                                    <span className="block text-[8px] font-mono uppercase tracking-widest text-zinc-600 group-hover:text-zinc-900 transition-colors">Target: Node_Sector_09_Alpha</span>
                                </div>
                                <span className="text-[10px] font-mono text-zinc-700 group-hover:text-zinc-950 font-bold">V.4.029</span>
                            </div>
                        </div>
                    </button>
                </main>

                {/* RIGHT: Diagnostics Sidebar */}
                <aside className="w-80 shrink-0 border-l border-white/10 p-8 pt-20 flex flex-col gap-8 bg-zinc-950/20 backdrop-blur overflow-y-auto animated-scrollbar">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <div className="w-2 h-2 bg-white animate-ping"></div>
                        <h3 className="text-[10px] font-mono uppercase tracking-[0.6em] text-zinc-500">LIVE_TELEMETRY</h3>
                    </div>
                    
                    {/* Status Blocks */}
                    <div className="space-y-6">
                        <div className="relative p-6 -skew-x-[15deg] border border-white/5 bg-zinc-950/40 backdrop-blur hover:border-white/40 transition-all group overflow-hidden">
                            <div className="skew-x-[15deg] space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-zinc-500">Stability_Indx</span>
                                    <span className="material-symbols-outlined text-xs text-zinc-700">query_stats</span>
                                </div>
                                <div className="text-4xl font-black font-headline italic tracking-tighter">98.4<span className="text-zinc-800">2%</span></div>
                                <div className="h-1 w-full bg-zinc-900"><div className="h-full bg-white w-[98%]"></div></div>
                            </div>
                        </div>

                        <div className="relative p-6 -skew-x-[15deg] border border-white/5 bg-zinc-950/40 backdrop-blur hover:border-white/40 transition-all group overflow-hidden">
                            <div className="skew-x-[15deg] space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-zinc-500">Neural_Sync</span>
                                    <span className="material-symbols-outlined text-xs text-zinc-700">bolt</span>
                                </div>
                                <div className="text-4xl font-black font-headline italic tracking-tighter">0.04<span className="text-lg text-zinc-800 ml-2">MS</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Terminal Block */}
                    <div className="bg-black/40 border border-white/10 p-6 space-y-3 font-mono text-[9px] text-zinc-600 uppercase tracking-widest mt-auto">
                        <div className="text-[7px] text-zinc-800 mb-2 border-b border-white/5 pb-1">AUTH_SYSTEM_LOGS</div>
                        <div className="flex items-center gap-3"><span className="text-zinc-800">00:01</span> {'>'} CORE_INIT_SUCCESS</div>
                        <div className="flex items-center gap-3"><span className="text-zinc-800">00:02</span> {'>'} SECTOR_MAP_LOCK</div>
                        <div className="flex items-center gap-3"><span className="text-white animate-pulse">00:04</span> {'>'} AWAITING_CMD_INPUT_</div>
                    </div>

                    <div className="flex justify-center gap-6 pt-6 border-t border-white/5">
                        <span onClick={() => onNavigate('SETTINGS')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer transition-colors">settings</span>
                        <span onClick={() => onNavigate('HELP')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer transition-colors">help_outline</span>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default MainMenu;
