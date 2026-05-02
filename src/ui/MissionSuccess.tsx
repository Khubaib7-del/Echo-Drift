import React from 'react';

interface MissionSuccessProps {
    levelId: number;
    completionTime: number;
    stability: number;
    onRetry: () => void;
    onNextLevel: () => void;
    onReturnToHub: () => void;
}

const MissionSuccess: React.FC<MissionSuccessProps> = ({ 
    levelId, completionTime, stability, 
    onRetry, onNextLevel, onReturnToHub 
}) => {
    
    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = ms % 1000;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds.toString().padStart(3, '0').substring(0, 2)}`;
    };

    return (
        <div className="absolute inset-0 z-[200] flex font-body text-white relative overflow-hidden overflow-x-hidden bg-zinc-950/95 backdrop-blur-sm pointer-events-auto">
            
            {/* Dynamic Background Decor */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)] animate-pulse"></div>
                <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-white/10 -skew-x-[15deg]"></div>
                <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-white/5 skew-x-[15deg]"></div>
            </div>

            <main className="w-full h-full overflow-y-auto overflow-x-hidden animated-scrollbar flex flex-col items-center py-20 px-8 relative z-10">
                
                {/* MISSION CLEAR SLAB */}
                <div className="relative w-full max-w-4xl p-1 bg-white -skew-x-[12deg] mb-12 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                    <div className="bg-zinc-950 p-6 flex justify-between items-center">
                        <div className="skew-x-[12deg]">
                            <span className="block text-[10px] font-mono uppercase tracking-[0.6em] text-zinc-500 mb-2">Operation_Status</span>
                            <h2 className="text-6xl font-black font-headline italic uppercase tracking-tighter leading-none text-white">MISSION_CLEAR</h2>
                        </div>
                        <div className="skew-x-[12deg] text-right">
                            <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">Level_Verification</span>
                            <span className="text-2xl font-black font-headline tracking-widest uppercase text-cyan-400">NODE_0{levelId}_SYNCED</span>
                        </div>
                    </div>
                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
                    <div className="bg-zinc-900/50 border border-white/5 p-8 -skew-x-[12deg] flex flex-col items-center group hover:bg-white/5 transition-all">
                        <div className="skew-x-[12deg] text-center">
                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4 block">Time_Elapsed</span>
                            <span className="text-4xl font-black font-headline text-white">{formatTime(completionTime * 1000)}</span>
                        </div>
                    </div>
                    <div className="bg-zinc-900/50 border border-white/5 p-8 -skew-x-[12deg] flex flex-col items-center group hover:bg-white/5 transition-all">
                        <div className="skew-x-[12deg] text-center">
                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4 block">Temporal_Stability</span>
                            <span className="text-4xl font-black font-headline text-cyan-400">{stability.toFixed(1)}%</span>
                        </div>
                    </div>
                    <div className="bg-zinc-900/50 border border-white/5 p-8 -skew-x-[12deg] flex flex-col items-center group hover:bg-white/5 transition-all border-b-cyan-400 border-b-2">
                        <div className="skew-x-[12deg] text-center">
                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4 block">Drift_Rank</span>
                            <span className="text-5xl font-black font-headline text-white italic tracking-tighter">S+</span>
                        </div>
                    </div>
                </div>

                {/* THE "PROMINENT" BUTTON */}
                <div className="w-full max-w-4xl flex flex-col items-center space-y-8 mb-20">
                    <button 
                        onClick={onNextLevel}
                        className="w-full py-10 bg-white hover:bg-cyan-400 text-zinc-950 -skew-x-[12deg] transition-all duration-500 group relative overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.2)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="skew-x-[12deg] flex items-center justify-center gap-6">
                            <span className="material-symbols-outlined text-4xl font-bold">bolt</span>
                            <span className="text-4xl font-black font-headline uppercase tracking-[0.2em]">Initiate_Next_Level</span>
                            <span className="material-symbols-outlined text-4xl font-bold">arrow_forward_ios</span>
                        </div>
                    </button>

                    <div className="flex w-full gap-6 h-20">
                        <button 
                            onClick={onRetry}
                            className="flex-1 border border-white/10 bg-zinc-900/30 hover:bg-white/5 text-zinc-400 hover:text-white -skew-x-[12deg] transition-all flex items-center justify-center gap-3"
                        >
                            <span className="material-symbols-outlined skew-x-[12deg]">replay</span>
                            <span className="text-[10px] font-black font-headline uppercase tracking-[0.3em] skew-x-[12deg]">Retry_Node</span>
                        </button>
                        <button 
                            onClick={onReturnToHub}
                            className="flex-1 border border-white/10 bg-zinc-900/30 hover:bg-white/5 text-zinc-400 hover:text-white -skew-x-[12deg] transition-all flex items-center justify-center gap-3"
                        >
                            <span className="material-symbols-outlined skew-x-[12deg]">terminal</span>
                            <span className="text-[10px] font-black font-headline uppercase tracking-[0.3em] skew-x-[12deg]">Return_To_Command</span>
                        </button>
                    </div>
                </div>

                {/* Footer Deco */}
                <div className="mt-auto pt-12 border-t border-white/5 w-full max-w-4xl flex justify-between items-center opacity-30">
                    <span className="text-[9px] font-mono uppercase tracking-[0.5em]">System_Log: Level_0{levelId}_Cleared</span>
                    <div className="flex gap-4">
                        <div className="w-2 h-2 bg-white"></div>
                        <div className="w-2 h-2 bg-white/50"></div>
                        <div className="w-2 h-2 bg-white/20"></div>
                    </div>
                </div>
            </main>
            <div className="scanline-overlay pointer-events-none opacity-20"></div>
        </div>
    );
};

export default MissionSuccess;
