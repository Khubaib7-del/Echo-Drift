import React, { useState, useEffect } from 'react';

const HUD: React.FC = () => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const i = setInterval(() => setTimer(t => t+1), 1000);
        return () => clearInterval(i);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="absolute inset-0 pointer-events-none z-10 p-8 flex flex-col justify-between">
            {/* Top HUD */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <div className="bg-surface-container-highest border border-primary-container/20 p-2 text-cyan-400">
                       <span className="material-symbols-outlined font-variation-[FILL_1]">my_location</span>
                    </div>
                    <div>
                        <div className="text-cyan-400 font-headline font-bold text-sm tracking-tighter shadow-sm">DRIFT_ACTIVE</div>
                        <div className="text-[10px] text-cyan-400/50 uppercase tracking-widest">{formatTime(timer)}</div>
                    </div>
                </div>

                <div className="text-right">
                   <div className="text-2xl font-headline font-bold text-white leading-none">NODE_4</div>
                   <div className="text-[9px] uppercase tracking-tighter text-outline bg-black/50 px-1 py-0.5 mt-1 inline-block">v0.4.2-STABLE</div>
                </div>
            </div>

            {/* Timeline UI overlay at bottom */}
            <div className="w-full max-w-2xl mx-auto flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-md border border-cyan-500/20 rounded">
                <div className="text-cyan-400 font-headline text-xs w-16 text-right mr-4">PRESENT</div>
                <div className="relative flex-1 h-2 bg-surface">
                   <div className="absolute left-0 top-0 h-full bg-cyan-400 w-1/2 shadow-[0_0_10px_#00F0FF]"></div>
                   <div className="absolute right-1/2 top-0 h-full w-2 bg-white skew-x-[-20deg]"></div>
                </div>
                <div className="text-magenta-400 font-headline text-xs w-16 text-left ml-4">ECHO</div>
            </div>

            {/* Scanlines Effect */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
        </div>
    );
};

export default HUD;
