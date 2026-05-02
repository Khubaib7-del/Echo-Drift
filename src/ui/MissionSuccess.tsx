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
        <div className="flex-1 w-full h-full flex font-body text-white relative overflow-hidden bg-zinc-950 p-12">
            
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-white/10 -skew-x-[15deg]"></div>
                <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-white/5 skew-x-[15deg]"></div>
                <div className="absolute bottom-12 left-12 font-mono text-[9px] text-zinc-700 tracking-[0.5em] uppercase">
                    SYS_V.04 // SEC_CLR_LOG
                </div>
            </div>

            <main className="w-full max-w-5xl mx-auto flex flex-col justify-center relative z-10 pl-24">
                
                {/* Header (White Slab) */}
                <div className="relative w-full max-w-xl p-8 bg-white text-zinc-950 -skew-x-[15deg] mb-[-2rem] z-20 shadow-2xl ml-12">
                    <div className="skew-x-[15deg] flex justify-between items-end">
                        <div>
                            <span className="block text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 mb-2">Mission_Status</span>
                            <h2 className="text-4xl font-black font-headline italic uppercase tracking-tighter leading-none">Clear</h2>
                        </div>
                        <div className="text-right">
                            <span className="block text-[9px] font-mono uppercase tracking-widest text-zinc-400">Sector_ID</span>
                            <span className="text-sm font-black font-headline tracking-widest uppercase">Void_Runner // LVL_0{levelId}</span>
                        </div>
                    </div>
                </div>

                {/* Main Data Panel */}
                <div className="relative w-full p-12 bg-zinc-900 border border-white/10 -skew-x-[15deg] shadow-2xl">
                    <div className="skew-x-[15deg] flex gap-16">
                        
                        {/* Left Stats */}
                        <div className="w-1/3 flex flex-col gap-8 justify-center border-l-2 border-white/20 pl-6">
                            <div>
                                <span className="block text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-1">Completion_Time</span>
                                <span className="text-2xl font-black font-headline tabular-nums">{formatTime(completionTime * 1000)}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-1">Temporal_Sync</span>
                                <span className="text-2xl font-black font-headline tabular-nums">{stability.toFixed(1)}%</span>
                            </div>
                            <div>
                                <span className="block text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-1">Echo_Avoidance_Score</span>
                                <span className="text-2xl font-black font-headline tabular-nums">0.942</span>
                            </div>
                        </div>

                        {/* Right Log Stream */}
                        <div className="flex-1">
                            <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-2">
                                <span className="text-sm font-black font-headline uppercase tracking-[0.2em]">Data_Log_Stream</span>
                                <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Decrypted // Ready</span>
                            </div>
                            <div className="space-y-4 font-mono text-[10px] uppercase tracking-widest">
                                <div className="flex gap-4 items-center">
                                    <span className="text-zinc-600">001</span>
                                    <span className="flex-1 text-white">Entry_Point_Sync</span>
                                    <span className="text-zinc-500 w-16 text-right">00:12:04</span>
                                    <span className="text-zinc-500 w-16 text-right">+0.00ms</span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <span className="text-zinc-600">002</span>
                                    <span className="flex-1 text-white">Node_Alpha_Decrypt</span>
                                    <span className="text-zinc-500 w-16 text-right">01:04:22</span>
                                    <span className="text-zinc-500 w-16 text-right">-0.04ms</span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <span className="text-zinc-600">003</span>
                                    <span className="flex-1 text-red-400">Temporal_Flicker</span>
                                    <span className="text-zinc-500 w-16 text-right">02:11:59</span>
                                    <span className="text-red-400 w-16 text-right">+12.4ms</span>
                                </div>
                                <div className="flex gap-4 items-center pb-4 border-b border-white/5">
                                    <span className="text-zinc-600">004</span>
                                    <span className="flex-1 text-white">Memory_Shard_Retrieved</span>
                                    <span className="text-zinc-500 w-16 text-right">03:40:11</span>
                                    <span className="text-zinc-500 w-16 text-right">+0.00ms</span>
                                </div>
                                <div className="flex gap-4 items-center pt-2">
                                    <span className="text-zinc-600">TOT</span>
                                    <span className="flex-1 font-bold text-white">Accumulated_Latency</span>
                                    <span className="w-16"></span>
                                    <span className="text-white font-bold w-16 text-right">12.36ms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub Stats Row */}
                <div className="flex w-full mt-6 justify-center gap-8 -skew-x-[15deg]">
                    <div className="w-1/3 flex flex-col items-center justify-center p-6 bg-zinc-950/80 border border-white/5">
                        <span className="text-5xl font-black font-headline italic tracking-tighter skew-x-[15deg] text-white">S+</span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600 skew-x-[15deg] mt-2">Rank</span>
                    </div>
                    <div className="w-1/3 flex flex-col items-center justify-center p-6 bg-zinc-950/80 border border-white/5">
                        <span className="text-5xl font-black font-headline italic tracking-tighter skew-x-[15deg] text-white">402</span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600 skew-x-[15deg] mt-2">Echoes_Voided</span>
                    </div>
                    <div className="w-1/3 flex flex-col items-center justify-center p-6 bg-zinc-950/80 border border-white/5">
                        <span className="text-5xl font-black font-headline italic tracking-tighter skew-x-[15deg] text-white">MAX</span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600 skew-x-[15deg] mt-2">Combo</span>
                    </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="flex w-full mt-8 gap-4 h-16">
                    <button 
                        onClick={onRetry}
                        className="flex-1 border border-white/20 bg-zinc-950/50 hover:bg-white/5 transition-colors -skew-x-[15deg] flex items-center justify-center group"
                    >
                        <div className="skew-x-[15deg] flex items-center gap-4 text-zinc-400 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-lg">replay</span>
                            <span className="text-[10px] font-black font-headline uppercase tracking-[0.2em]">Retry_Simulation</span>
                        </div>
                    </button>

                    <button 
                        onClick={onNextLevel}
                        className="flex-[1.5] bg-white hover:bg-zinc-200 transition-colors -skew-x-[15deg] flex items-center justify-center group shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        <div className="skew-x-[15deg] flex items-center gap-4 text-zinc-950">
                            <span className="material-symbols-outlined text-lg">fast_forward</span>
                            <span className="text-[12px] font-black font-headline uppercase tracking-[0.2em]">Next_Sector</span>
                        </div>
                    </button>

                    <button 
                        onClick={onReturnToHub}
                        className="flex-1 border border-white/10 bg-zinc-950 hover:bg-white/5 transition-colors -skew-x-[15deg] flex items-center justify-center group"
                    >
                        <div className="skew-x-[15deg] flex items-center gap-4 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                            <span className="material-symbols-outlined text-lg text-zinc-700 group-hover:text-zinc-500">home</span>
                            <span className="text-[9px] font-black font-headline uppercase tracking-[0.2em]">Return_To_Hub</span>
                        </div>
                    </button>
                </div>

            </main>
        </div>
    );
};

export default MissionSuccess;
