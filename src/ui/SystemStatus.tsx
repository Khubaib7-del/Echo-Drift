import React from 'react';

interface SystemStatusProps {
    onNavigate: (state: any) => void;
}

const SystemStatus: React.FC<SystemStatusProps> = ({ onNavigate }) => {
    return (
        <div className="flex-1 w-full h-full flex font-body text-white relative overflow-hidden bg-zinc-950 pointer-events-auto">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
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
                <div className="flex items-center gap-8">
                    <div className="flex gap-6 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                        <span className="text-white border-b-2 border-white pb-1">Sys_Status</span>
                        <span onClick={() => onNavigate('TIMELINE')} className="hover:text-white cursor-pointer transition-colors">Temporal_Grid</span>
                        <span onClick={() => onNavigate('ARCHIVE')} className="hover:text-white cursor-pointer transition-colors">Data_Archive</span>
                    </div>
                    <div className="flex items-center gap-6 text-zinc-500">
                        <span onClick={() => onNavigate('ANALYTICS')} className="material-symbols-outlined text-sm hover:text-white cursor-pointer transition-colors" title="Analytics">laptop_windows</span>
                        <span onClick={() => onNavigate('TIMELINE')} className="material-symbols-outlined text-sm hover:text-white cursor-pointer transition-colors" title="Timeline">wifi_tethering</span>
                        <span onClick={() => onNavigate('MEMORIES')} className="material-symbols-outlined text-sm hover:text-white cursor-pointer transition-colors" title="Memories">memory</span>
                    </div>
                </div>
            </div>

            {/* SCROLLABLE CONTENT WRAPPER */}
            <div className="flex-1 flex overflow-hidden pt-16">
                {/* MAIN CONTENT AREA */}
                <main className="flex-1 min-w-[500px] flex flex-col p-12 pt-16 pl-16 overflow-y-auto animated-scrollbar">
                    
                    {/* Header */}
                    <div className="flex gap-4 items-center mb-16 border-l-4 border-white pl-6">
                        <div>
                            <h2 className="text-5xl font-black font-headline uppercase tracking-tighter text-white mb-2">SYS_STATUS_CMD</h2>
                            <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Core_Diagnostic_Matrix // Pulse_Interval: 400ms</p>
                        </div>
                    </div>

                    {/* Dashboard Panels */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                        
                        {/* Subsystem Health Grid */}
                        <div className="relative p-10 border border-white/10 bg-zinc-950/80 -skew-x-[15deg] shadow-lg md:col-span-2">
                            <div className="skew-x-[15deg]">
                                <h3 className="text-xl font-black font-headline uppercase tracking-widest text-white mb-8">Node_Subsystem_Health</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-[8px] font-mono text-zinc-600 uppercase">
                                                <span>NODE_{i+1}</span>
                                                <span className={i === 4 || i === 9 ? 'text-amber-500' : 'text-white'}>
                                                    {i === 4 || i === 9 ? 'WARN' : 'OK'}
                                                </span>
                                            </div>
                                            <div className="h-6 w-full bg-zinc-900 flex items-center justify-center border border-white/5">
                                                <div className={`h-1.5 w-1.5 rounded-full ${
                                                    i === 4 || i === 9 
                                                        ? 'bg-amber-500 animate-pulse' 
                                                        : i % 3 === 0 
                                                            ? 'bg-white shadow-[0_0_8px_white]' 
                                                            : 'bg-white/40'
                                                }`}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CPU / Processing */}
                        <div className="relative p-10 border border-white/10 bg-zinc-950/80 -skew-x-[15deg] shadow-lg">
                            <div className="skew-x-[15deg]">
                                <h3 className="text-xl font-black font-headline uppercase tracking-widest text-white mb-8">Processing_Load</h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Neural_Buffer', val: 78 },
                                        { label: 'Drift_Engine', val: 42 },
                                        { label: 'Memory_Map', val: 65 },
                                        { label: 'I/O_Link', val: 12 },
                                    ].map((item) => (
                                        <div key={item.label} className="space-y-2">
                                            <div className="flex justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                                                <span>{item.label}</span>
                                                <span className="text-white">{item.val}%</span>
                                            </div>
                                            <div className="h-1 w-full bg-zinc-900 overflow-hidden">
                                                <div className="h-full bg-white transition-all duration-1000" style={{ width: `${item.val}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Power / Sync */}
                        <div className="relative p-10 border border-white/10 bg-zinc-950/80 -skew-x-[15deg] shadow-lg">
                            <div className="skew-x-[15deg]">
                                <h3 className="text-xl font-black font-headline uppercase tracking-widest text-white mb-8">System_Synchronization</h3>
                                <div className="flex flex-col items-center justify-center h-40">
                                    <div className="text-6xl font-black font-headline italic tracking-tighter text-white mb-2">0.99<span className="text-2xl text-zinc-800 ml-2">SYNC</span></div>
                                    <div className="flex gap-1">
                                        {Array.from({ length: 20 }).map((_, i) => (
                                            <div key={i} className={`w-1 h-4 ${i < 18 ? 'bg-white' : 'bg-zinc-800'}`}></div>
                                        ))}
                                    </div>
                                    <p className="mt-4 text-[9px] font-mono text-zinc-600 uppercase tracking-[0.4em]">Temporal_Lock: Active</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <footer className="mt-16 mb-8 flex justify-between text-[8px] font-mono text-zinc-700 uppercase tracking-widest w-full max-w-6xl">
                        <span>CORE_ID: 0x9928AF_BETA</span>
                        <span>Uptime: 412:08:44:12</span>
                    </footer>
                </main>

                {/* RIGHT PANEL (Standardized) */}
                <aside className="w-64 shrink-0 border-l border-white/10 p-6 pt-16 flex flex-col gap-10 bg-zinc-950/20 backdrop-blur">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                             <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                             <h3 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-500">Global_Uptime</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6">
                            <div className="p-4 bg-zinc-900/50 border border-white/5">
                                <span className="block text-[7px] font-mono text-zinc-600 uppercase mb-1">Total_Cores</span>
                                <span className="text-2xl font-black font-headline text-white">128</span>
                            </div>
                            <div className="p-4 bg-zinc-900/50 border border-white/5">
                                <span className="block text-[7px] font-mono text-zinc-600 uppercase mb-1">Error_Rate</span>
                                <span className="text-2xl font-black font-headline text-red-500">0.002%</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto space-y-8">
                        <div className="flex justify-center gap-6 pt-6 border-t border-white/5">
                            <span onClick={() => onNavigate('SETTINGS')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer transition-colors">settings</span>
                            <span onClick={() => onNavigate('HELP')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer transition-colors">help_outline</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default SystemStatus;
