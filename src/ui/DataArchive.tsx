import React from 'react';

interface DataArchiveProps {
    onNavigate: (state: any) => void;
}

const DataArchive: React.FC<DataArchiveProps> = ({ onNavigate }) => {
    return (
        <div className="flex-1 w-full h-full flex font-body text-white relative overflow-hidden bg-zinc-950 pointer-events-auto">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute right-[20%] top-0 bottom-0 w-[1px] bg-white/10 skew-x-[15deg]"></div>
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
                        <span onClick={() => onNavigate('STATUS')} className="hover:text-white cursor-pointer transition-colors">Sys_Status</span>
                        <span onClick={() => onNavigate('TIMELINE')} className="hover:text-white cursor-pointer transition-colors">Temporal_Grid</span>
                        <span className="text-white border-b-2 border-white pb-1">Data_Archive</span>
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
                            <h2 className="text-5xl font-black font-headline uppercase tracking-tighter text-white mb-2">DAT_ARCHIVE</h2>
                            <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Historical_Memory_Registry // Status: Locked</p>
                        </div>
                    </div>

                    {/* Archive List */}
                    <div className="flex flex-col gap-6 w-full max-w-5xl">
                        {[
                            { id: 'REC_001', date: '202X.04.12', title: 'Initial_Drift_Contact', size: '2.4GB', status: 'DECRYPTED' },
                            { id: 'REC_002', date: '202X.04.15', title: 'Sector_09_Incursion', size: '1.8GB', status: 'LOCKED' },
                            { id: 'REC_003', date: '202X.04.22', title: 'Neural_Ghost_Echo', size: '4.2GB', status: 'LOCKED' },
                            { id: 'REC_004', date: '202X.05.01', title: 'Temporal_Anchor_Test', size: '0.9GB', status: 'LOCKED' },
                        ].map((rec) => (
                            <div key={rec.id} className="relative p-8 border border-white/10 bg-zinc-950/80 -skew-x-[15deg] hover:border-white/40 transition-all group cursor-pointer">
                                <div className="skew-x-[15deg] flex justify-between items-center">
                                    <div className="flex items-center gap-8">
                                        <div className="space-y-1">
                                            <span className="block text-[8px] font-mono text-zinc-600 uppercase tracking-widest">{rec.id} // {rec.date}</span>
                                            <h3 className="text-xl font-black font-headline uppercase tracking-widest text-white group-hover:text-white transition-colors">{rec.title}</h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-10">
                                        <div className="text-right">
                                            <span className="block text-[8px] font-mono text-zinc-600 uppercase">File_Size</span>
                                            <span className="text-sm font-mono text-white">{rec.size}</span>
                                        </div>
                                        <div className={`px-4 py-1 border ${rec.status === 'DECRYPTED' ? 'border-white text-white' : 'border-white/10 text-zinc-700'} text-[10px] font-mono uppercase tracking-widest`}>
                                            {rec.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Data Fragment Visualizer */}
                    <div className="mt-16 p-10 border border-white/5 bg-black/40 w-full max-w-5xl">
                        <div className="flex justify-between mb-8 items-center border-b border-white/5 pb-4">
                            <h4 className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500">Live_Fragment_Scan</h4>
                            <span className="text-[10px] font-mono text-zinc-700 animate-pulse">Scanning_Registry...</span>
                        </div>
                        <div className="grid grid-cols-[repeat(12,1fr)] sm:grid-cols-[repeat(24,1fr)] gap-1.5 overflow-hidden">
                            {Array.from({ length: 240 }).map((_, i) => {
                                const isActive = (i * 7) % 11 > 4;
                                const isCritical = (i * 3) % 17 === 0;
                                return (
                                    <div 
                                        key={i} 
                                        className={`h-3 w-full transition-all duration-500 ${
                                            isActive 
                                                ? isCritical ? 'bg-white animate-pulse shadow-[0_0_8px_white]' : 'bg-white/40 hover:bg-white' 
                                                : 'bg-white/5'
                                        }`}
                                    ></div>
                                );
                            })}
                        </div>
                    </div>

                    <footer className="mt-16 mb-8 flex justify-between text-[8px] font-mono text-zinc-700 uppercase tracking-widest w-full max-w-5xl">
                        <span>REGISTRY: ENCRYPTED_STREAM_V2</span>
                        <span>Access_Level: Operator_Root</span>
                    </footer>
                </main>

                {/* RIGHT PANEL (Active Echo Data) */}
                <aside className="w-80 shrink-0 border-l border-white/10 p-6 pt-16 flex flex-col gap-10 bg-zinc-950/20 backdrop-blur overflow-y-auto animated-scrollbar">
                    
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                             <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                             <h3 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-500">ACTIVE_ECHO_DATA</h3>
                        </div>

                        {/* Waveform Visualizer */}
                        <div className="relative h-32 w-full bg-zinc-900/30 border border-white/5 flex items-center justify-center px-4 gap-[2px] overflow-hidden group">
                            <div className="absolute inset-0 border-y border-white/5 pointer-events-none opacity-20 flex flex-col justify-around py-4">
                                <div className="w-full h-[1px] bg-white/10"></div>
                                <div className="w-full h-[1px] bg-white/40"></div>
                                <div className="w-full h-[1px] bg-white/10"></div>
                            </div>
                            {Array.from({ length: 32 }).map((_, i) => (
                                <div 
                                    key={i} 
                                    className="flex-1 bg-white/30 transition-all duration-300"
                                    style={{ 
                                        height: `${10 + Math.random() * 80}%`,
                                        animation: `waveform-pulse 1.5s ease-in-out infinite ${i * 0.05}s`
                                    }}
                                ></div>
                            ))}
                            <style>{`
                                @keyframes waveform-pulse {
                                    0%, 100% { height: 20%; opacity: 0.3; }
                                    50% { height: 70%; opacity: 0.8; }
                                }
                            `}</style>
                        </div>

                        {/* Metrics */}
                        <div className="space-y-4 font-mono text-[9px] uppercase tracking-widest">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-zinc-600">PATH_A:</span>
                                <span className="text-white">RE1:NUD</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-zinc-600">PATH_B:</span>
                                <span className="text-white">RE1:CORRUPT</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-600">DELTA:</span>
                                <span className="text-red-500 font-bold">120.04MS</span>
                            </div>
                        </div>

                        {/* System State */}
                        <div className="space-y-4">
                            <span className="block text-[8px] font-mono text-zinc-700 uppercase tracking-widest">SYSTEM_STATE</span>
                            <div className="p-4 bg-black/40 border border-white/5 space-y-2">
                                <div className="flex items-center gap-3 text-[9px] font-mono text-white">
                                    <span className="text-zinc-700">{'>'}</span> MONITORING_ECHO
                                </div>
                                <div className="flex items-center gap-3 text-[9px] font-mono text-white">
                                    <span className="text-zinc-700">{'>'}</span> STABLE_SIGNAL
                                </div>
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

export default DataArchive;
