import React from 'react';

interface TimelineVisualizationProps {
    onNavigate: (state: any) => void;
}

const TimelineVisualization: React.FC<TimelineVisualizationProps> = ({ onNavigate }) => {
    return (
        <div className="flex-1 w-full h-full flex font-body text-white relative overflow-hidden bg-zinc-950 pointer-events-auto">
            {/* Background Lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-white/10 -skew-x-[15deg]"></div>
            </div>

            {/* TOP BAR */}
            <div className="absolute top-0 left-0 w-full h-16 border-b border-white/10 flex justify-between items-center px-12 z-20 bg-zinc-950/50 backdrop-blur-sm pointer-events-auto">
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
                        <span className="text-white border-b-2 border-white pb-1">Temporal_Grid</span>
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
                    
                    <div className="flex justify-between items-start mb-12">
                        <div className="border-l-2 border-white pl-4">
                            <h2 className="text-4xl font-black font-headline uppercase tracking-tighter text-white">TIMELINE_VIZ</h2>
                            <div className="flex gap-4 font-mono text-[9px] uppercase tracking-widest text-zinc-400 mt-2">
                                <span>Sector: 09_Alpha</span>
                                <span>Iteration: 4,029</span>
                                <span className="text-white bg-white/10 px-2 py-0.5 border border-white/20">Status: Divergence Detected</span>
                            </div>
                        </div>
                    </div>

                    {/* CHART AREA */}
                    <div className="relative w-full max-w-5xl h-[500px] border border-white/10 bg-zinc-950/80 -skew-x-[15deg] flex flex-col p-8 mb-12 shadow-2xl shrink-0">
                        <div className="skew-x-[15deg] w-full h-full flex flex-col">
                            
                            {/* Legend */}
                            <div className="flex gap-8 font-mono text-[8px] uppercase tracking-widest mb-8 justify-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-0.5 bg-white"></div>
                                    <span className="text-white">Player Path</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-0.5 border-t border-dashed border-zinc-500"></div>
                                    <span className="text-zinc-500">Echo Path</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 border border-white rotate-45"></div>
                                    <span className="text-white">Divergence</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-600"></div>
                                    <span className="text-red-500">Collapse</span>
                                </div>
                            </div>

                            {/* Chart SVG */}
                            <div className="relative flex-1 w-full">
                                {/* Y Axis Labels */}
                                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between font-mono text-[8px] text-zinc-600 py-4 z-10">
                                    <span>100.0</span>
                                    <span>080.0</span>
                                    <span>060.0</span>
                                    <span>040.0</span>
                                    <span>020.0</span>
                                    <span>000.0</span>
                                </div>

                                {/* X Axis Labels */}
                                <div className="absolute bottom-0 left-12 right-0 flex justify-between font-mono text-[8px] text-zinc-600 z-10">
                                    <span>00:00:00</span>
                                    <span>00:10:00</span>
                                    <span>00:20:00</span>
                                    <span>00:30:00</span>
                                    <span>00:40:00</span>
                                    <span>00:50:00</span>
                                </div>

                                <svg className="w-full h-full pl-12 pb-8" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    {/* Grid lines */}
                                    <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" vectorEffect="non-scaling-stroke"/>
                                    <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" vectorEffect="non-scaling-stroke"/>
                                    <line x1="0" y1="60" x2="100" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" vectorEffect="non-scaling-stroke"/>
                                    <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" vectorEffect="non-scaling-stroke"/>

                                    {/* Echo Path (Dashed) */}
                                    <path 
                                        d="M 0,60 C 20,60 40,30 60,80 S 80,40 100,20" 
                                        fill="none" 
                                        stroke="rgba(255,255,255,0.3)" 
                                        strokeWidth="1.5" 
                                        strokeDasharray="2,2"
                                        vectorEffect="non-scaling-stroke"
                                    />

                                    {/* Player Path (Solid) */}
                                    <path 
                                        d="M 0,60 C 20,55 35,45 50,75 S 80,50 95,30 L 100,25" 
                                        fill="none" 
                                        stroke="white" 
                                        strokeWidth="2" 
                                        vectorEffect="non-scaling-stroke"
                                    />

                                    {/* Divergence Points */}
                                    <rect x="49" y="74" width="2" height="2" fill="none" stroke="white" strokeWidth="0.5" transform="rotate(45 50 75)" vectorEffect="non-scaling-stroke" />
                                    <rect x="94" y="29" width="2" height="2" fill="none" stroke="white" strokeWidth="0.5" transform="rotate(45 95 30)" vectorEffect="non-scaling-stroke" />
                                    
                                    {/* Labels near points */}
                                    <text x="52" y="70" fill="white" fontSize="3" fontFamily="monospace" fillOpacity="0.8">DIVERGE_01</text>
                                    <text x="90" y="25" fill="white" fontSize="3" fontFamily="monospace" fillOpacity="0.8">DIVERGE_02</text>

                                    {/* Vertical Scrubber Line */}
                                    <line x1="45" y1="10" x2="45" y2="90" stroke="white" strokeWidth="0.5" vectorEffect="non-scaling-stroke"/>
                                </svg>
                            </div>

                            {/* Bottom Play Controls */}
                            <div className="flex gap-4 items-center mt-4 border-t border-white/10 pt-4">
                                <button className="w-10 h-10 bg-white hover:bg-zinc-200 transition-colors flex items-center justify-center text-zinc-950">
                                    <span className="material-symbols-outlined font-variation-[FILL_1]">play_arrow</span>
                                </button>
                                <div className="flex-1 h-8 bg-zinc-900 border border-white/5 relative overflow-hidden flex items-center px-4">
                                    <div className="absolute left-0 top-0 bottom-0 bg-white/10 w-[45%]"></div>
                                    <span className="relative z-10 text-[8px] font-mono text-white uppercase tracking-[0.4em] w-full text-center">Temporal_Playback_Buffer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* RIGHT PANEL (Standardized) */}
                <aside className="w-64 shrink-0 border-l border-white/10 p-6 pt-16 flex flex-col gap-10 bg-zinc-950/20 backdrop-blur">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                             <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                             <h3 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-500">Active_Echo_Data</h3>
                        </div>
                        
                        <div className="w-full h-24 bg-zinc-900 border border-white/5 flex items-center justify-center relative overflow-hidden">
                             <div className="w-full h-[1px] bg-white/10"></div>
                             <div className="absolute inset-0 flex items-center justify-center gap-0.5 opacity-30 px-4">
                                 {Array.from({length: 30}).map((_, i) => (
                                     <div key={i} className="flex-1 bg-white" style={{ height: `${Math.random() * 80}%` }}></div>
                                 ))}
                             </div>
                        </div>

                        <div className="space-y-3 font-mono text-[8px] text-zinc-500 uppercase tracking-widest">
                            <div className="flex justify-between"><span>PATH_A:</span> <span className="text-white">RE1:NUD</span></div>
                            <div className="flex justify-between"><span>PATH_B:</span> <span className="text-white">RE1:CORRUPT</span></div>
                            <div className="flex justify-between"><span>DELTA:</span> <span className="text-red-400">120.04ms</span></div>
                        </div>
                    </div>

                    <div className="mt-auto space-y-6">
                        <div className="space-y-2">
                            <span className="block text-[8px] font-mono text-zinc-600 uppercase">System_State</span>
                            <div className="bg-white/5 border border-white/10 p-4 text-[10px] font-mono text-white">
                                {'>'} MONITORING_ECHO<br/>
                                {'>'} STABLE_SIGNAL
                            </div>
                        </div>
                        
                        <div className="flex justify-center gap-8 pt-8 border-t border-white/5">
                            <span onClick={() => onNavigate('ANALYTICS')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer" title="Analytics">laptop_windows</span>
                            <span onClick={() => onNavigate('MEMORIES')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer" title="Memories">memory</span>
                            <span onClick={() => onNavigate('SETTINGS')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer" title="Settings">settings</span>
                        </div>
                    </div>
                </aside>
            </div>

        </div>
    );
};

export default TimelineVisualization;
