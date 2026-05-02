import React from 'react';

interface AnalyticsDashboardProps {
    onNavigate: (state: any) => void;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ onNavigate }) => {
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
                <div className="flex items-center gap-6 text-zinc-500">
                    <span onClick={() => onNavigate('ANALYTICS')} className="material-symbols-outlined text-sm hover:text-white cursor-pointer transition-colors" title="Analytics">laptop_windows</span>
                    <span onClick={() => onNavigate('TIMELINE')} className="material-symbols-outlined text-sm hover:text-white cursor-pointer transition-colors" title="Timeline">wifi_tethering</span>
                    <span onClick={() => onNavigate('MEMORIES')} className="material-symbols-outlined text-sm hover:text-white cursor-pointer transition-colors" title="Memories">memory</span>
                </div>
            </div>

            {/* SCROLLABLE CONTENT WRAPPER */}
            <div className="flex-1 flex overflow-hidden pt-16">
                {/* MAIN CONTENT AREA */}
                <main className="flex-1 min-w-[500px] flex flex-col p-12 pt-16 pl-16 overflow-y-auto animated-scrollbar">
                    
                    {/* Header */}
                    <div className="flex gap-4 items-center mb-12 border-l-4 border-white pl-6">
                        <div>
                            <h2 className="text-5xl font-black font-headline uppercase tracking-tighter text-white mb-2">SY_METRICS_07</h2>
                            <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Historical_Drift_Analysis // Data_Class: Confidential</p>
                        </div>
                    </div>

                    {/* Dashboard Panels */}
                    <div className="flex flex-col gap-10 w-full max-w-5xl">
                        
                        {/* Dataset 01 */}
                        <div className="relative p-10 border border-white/10 bg-zinc-950/80 -skew-x-[15deg] shadow-lg hover:border-white/30 transition-colors group">
                            <div className="skew-x-[15deg]">
                                <div className="flex justify-between items-start mb-10">
                                    <div>
                                        <span className="block text-[8px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-1">Dataset_01</span>
                                        <h3 className="text-2xl font-black font-headline uppercase tracking-widest text-white">Runs VS Completion Time</h3>
                                    </div>
                                    <div className="text-right text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                                        <span className="mr-6">Avg_Time: <span className="text-white">04:12:88</span></span>
                                        <span>Delta: <span className="text-red-500">-00:04:12</span></span>
                                    </div>
                                </div>
                                
                                <div className="w-full h-40 relative border-b border-l border-white/5 mt-4 flex items-end">
                                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <polyline 
                                            points="0,80 15,75 30,50 45,60 60,40 75,45 90,20 100,15" 
                                            fill="none" 
                                            stroke="white" 
                                            strokeWidth="2" 
                                            vectorEffect="non-scaling-stroke"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Dataset 02 */}
                        <div className="relative p-10 border border-white/10 bg-zinc-950/80 -skew-x-[15deg] shadow-lg">
                            <div className="skew-x-[15deg]">
                                <div className="mb-10">
                                    <span className="block text-[8px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-1">Dataset_02</span>
                                    <h3 className="text-2xl font-black font-headline uppercase tracking-widest text-white">Operational Competencies</h3>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-12 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-zinc-400"><span>Reaction Time</span><span className="text-white">62%</span></div>
                                        <div className="w-full h-2 bg-zinc-900 shadow-inner"><div className="h-full bg-white w-[62%]"></div></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-zinc-400"><span>Path Efficiency</span><span className="text-white">78%</span></div>
                                        <div className="w-full h-2 bg-zinc-900 shadow-inner"><div className="h-full bg-white w-[78%]"></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="mt-16 mb-8 flex justify-between text-[8px] font-mono text-zinc-700 uppercase tracking-widest w-full max-w-5xl">
                        <span>SYSTEM_ID: DRIFT_ENGINE_V4</span>
                        <span>Graph Render: Vertex_Sector_Core</span>
                    </footer>
                </main>

                {/* RIGHT PANEL (Standardized) */}
                <aside className="w-64 shrink-0 border-l border-white/10 p-6 pt-16 flex flex-col gap-10 bg-zinc-950/20 backdrop-blur">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                             <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                             <h3 className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-500">Global_Stats</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6">
                            <div className="p-4 bg-zinc-900/50 border border-white/5">
                                <span className="block text-[7px] font-mono text-zinc-600 uppercase mb-1">Total_Drifts</span>
                                <span className="text-2xl font-black font-headline text-white">402</span>
                            </div>
                            <div className="p-4 bg-zinc-900/50 border border-white/5">
                                <span className="block text-[7px] font-mono text-zinc-600 uppercase mb-1">Success_Rate</span>
                                <span className="text-2xl font-black font-headline text-white">94.2%</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto space-y-8">
                        <div className="space-y-4">
                            <span className="block text-[8px] font-mono text-zinc-600 uppercase">System_Nodes</span>
                            <div className="flex gap-2">
                                <div className="flex-1 h-1 bg-white"></div>
                                <div className="flex-1 h-1 bg-white"></div>
                                <div className="flex-1 h-1 bg-white/20"></div>
                                <div className="flex-1 h-1 bg-white/20"></div>
                            </div>
                        </div>
                        
                        <div className="flex justify-center gap-6 pt-6 border-t border-white/5">
                            <span onClick={() => onNavigate('TIMELINE')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer" title="Timeline">wifi_tethering</span>
                            <span onClick={() => onNavigate('MEMORIES')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer" title="Memories">memory</span>
                            <span onClick={() => onNavigate('SETTINGS')} className="material-symbols-outlined text-zinc-500 text-sm hover:text-white cursor-pointer" title="Settings">settings</span>
                        </div>
                    </div>
                </aside>
            </div>

        </div>
    );
};

export default AnalyticsDashboard;
