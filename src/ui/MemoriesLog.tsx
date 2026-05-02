import React from 'react';

interface MemoriesLogProps {
    onNavigate: (state: any) => void;
}

const MemoriesLog: React.FC<MemoriesLogProps> = ({ onNavigate }) => {
    const memories = [
        { id: 'NEON_VOID_01', time: '00:42.12', catch: '1.4M', mistakes: 0, active: true },
        { id: 'CYBER_PIT_04', time: '01:15.89', catch: '0.9M', mistakes: 0, active: true },
        { id: 'VOID_RUNNER', time: '00:30.01', catch: '2.1M', mistakes: 1, active: true },
        { id: 'ZENITH_GRID', time: '01:52.19', catch: '3.0M', mistakes: 7, active: true },
        { id: 'PULSE_CHAMBER', time: '00:59.00', catch: '1.1M', mistakes: 0, active: true }
    ];

    return (
        <div className="flex-1 w-full h-full flex font-body text-white relative overflow-hidden bg-zinc-950 pointer-events-auto">
            {/* Background Lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-white/10 -skew-x-[15deg]"></div>
            </div>

            {/* TOP BAR */}
            <div className="absolute top-0 left-0 w-full h-16 border-b border-white/10 flex justify-between items-center px-12 z-20 bg-zinc-950/50 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <span 
                        onClick={() => onNavigate('MENU')}
                        className="font-headline font-black italic tracking-widest text-lg cursor-pointer hover:text-white transition-colors"
                    >
                        ECHO DRIFT <span className="text-zinc-600">// SYSTEM_OS</span>
                    </span>
                </div>
                <div className="flex items-center gap-6">
                <div className="flex items-center gap-6 text-zinc-500">
                    <span onClick={() => onNavigate('ANALYTICS')} className="material-symbols-outlined text-sm hover:text-white cursor-pointer transition-colors" title="Analytics">laptop_windows</span>
                    <span onClick={() => onNavigate('TIMELINE')} className="material-symbols-outlined text-sm hover:text-white cursor-pointer transition-colors" title="Timeline">wifi_tethering</span>
                    <span onClick={() => onNavigate('MEMORIES')} className="material-symbols-outlined text-sm hover:text-white cursor-pointer transition-colors" title="Memories">memory</span>
                </div>
                    <div className="flex items-center gap-2 border border-white/20 px-3 py-1 bg-black/50">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-none">Operator_Access<br/><span className="text-white">ROOT@DRIFT_ENGINE</span></span>
                    </div>
                </div>
            </div>

            {/* SCROLLABLE CONTENT WRAPPER */}
            <div className="flex-1 flex overflow-hidden pt-16">
                {/* CENTER PANEL */}
                <main className="flex-1 min-w-[500px] flex flex-col p-12 pt-16 pl-16 overflow-y-auto animated-scrollbar">
                    <header className="mb-12">
                        <h2 className="text-xl font-bold font-headline uppercase tracking-widest text-white mb-2">Memories</h2>
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] border-b border-white/10 pb-4 w-[60%]">Intelligence_Log_File: B-742-ARC</p>
                    </header>

                    <div className="flex flex-wrap gap-8">
                        {memories.map((mem, idx) => (
                            <div key={idx} className="relative w-64 p-6 bg-zinc-900 border border-white/5 -skew-x-[15deg] group hover:bg-white/5 transition-colors cursor-pointer shadow-lg overflow-hidden shrink-0">
                                {/* Background Icon */}
                                <div className="absolute -bottom-4 -right-4 opacity-5 text-9xl">
                                    <span className="material-symbols-outlined font-variation-[FILL_1]">memory</span>
                                </div>
                                
                                <div className="skew-x-[15deg] relative z-10">
                                    <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-2">
                                        <div>
                                            <span className="block text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Sector_ID</span>
                                            <h3 className="text-sm font-black font-headline uppercase tracking-widest text-white group-hover:text-cyan-400 transition-colors">{mem.id}</h3>
                                        </div>
                                        <span className="material-symbols-outlined text-zinc-500 text-lg">play_circle</span>
                                    </div>
                                    
                                    <div className="space-y-3 font-mono text-[10px] uppercase tracking-widest">
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-500">Best Time</span>
                                            <span className="font-bold text-white">{mem.time}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-500">Echo Catch</span>
                                            <span className="font-bold text-white">{mem.catch}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-500">Mistakes</span>
                                            <span className={`font-bold ${mem.mistakes > 0 ? 'text-red-500' : 'text-zinc-500'}`}>{mem.mistakes > 0 ? `0${mem.mistakes}` : '00'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* RIGHT PANEL (Standardized) */}
                <aside className="w-64 shrink-0 border-l border-white/10 p-6 pt-16 flex flex-col gap-8 bg-zinc-950/20 backdrop-blur">
                    <div className="w-full flex justify-end mb-4">
                        <div className="text-right">
                            <span className="block text-[8px] font-mono uppercase tracking-widest text-zinc-500">System Diagnostics</span>
                            <span className="text-[10px] font-bold font-headline uppercase tracking-widest text-white flex items-center gap-2 justify-end"><div className="w-1.5 h-1.5 bg-white"></div> LOG SYNC: ACTIVE</span>
                        </div>
                    </div>

                    <div className="space-y-2 text-[10px] font-mono uppercase tracking-widest">
                        <span className="block text-[8px] font-mono uppercase tracking-widest text-zinc-500 mb-2 border-b border-white/10 pb-2">Recent Activity</span>
                        <div className="flex justify-between text-white"><span>Neon_Void_01</span> <span className="text-zinc-600">2M Ago</span></div>
                        <div className="flex justify-between text-zinc-400"><span>Static_Core_X</span> <span className="text-zinc-600">14M Ago</span></div>
                    </div>

                    <div className="relative p-2 bg-zinc-950 border border-white/20 -skew-x-[15deg] shadow-2xl mt-auto">
                        <div className="skew-x-[15deg] w-full h-48 bg-zinc-900 border border-white/5 relative overflow-hidden flex flex-col justify-end p-4 group cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                <span className="block text-[8px] font-mono uppercase tracking-widest text-zinc-400 mb-1">Current Drift Node</span>
                                <span className="text-lg font-black font-headline tracking-widest text-white">TYO-SEC-4</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Navigation Icons at Bottom */}
                    <div className="flex justify-center gap-6 pt-6 border-t border-white/5">
                        <span onClick={() => onNavigate('ANALYTICS')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer" title="Analytics">laptop_windows</span>
                        <span onClick={() => onNavigate('TIMELINE')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer" title="Timeline">wifi_tethering</span>
                        <span onClick={() => onNavigate('SETTINGS')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer" title="Settings">settings</span>
                    </div>
                </aside>
            </div>

        </div>
    );
};

export default MemoriesLog;
