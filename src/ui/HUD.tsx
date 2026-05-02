import React, { useState, useEffect } from 'react';

interface HUDProps {
    activeLevel: number;
    stability: number;
    velocity?: number;
    dashCooldown: number;
    echoDistance: number;
    missionProgress: number;
}

const HUD: React.FC<HUDProps> = ({ 
    activeLevel, stability, velocity = 0, 
    dashCooldown, echoDistance, missionProgress 
}) => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const i = setInterval(() => setTimer(t => t + 10), 10);
        return () => clearInterval(i);
    }, [activeLevel]);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = ms % 1000;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds.toString().padStart(3, '0')}`;
    };

    const proximityPercent = Math.max(0, Math.min(100, (1 - (echoDistance / 800)) * 100));

    return (
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full font-body text-white overflow-hidden">
            
            {/* Background Texture (Space/Galaxy simulation) */}
            <div className="absolute inset-0 z-[-1] opacity-40 mix-blend-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black"></div>
            
            {/* Crosshair / Center Target */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-30">
                <div className="w-64 h-64 border border-white/10 rounded-full absolute"></div>
                <div className="w-8 h-[1px] bg-white absolute"></div>
                <div className="h-8 w-[1px] bg-white absolute"></div>
                <div className="absolute top-8 left-8 w-4 h-4 border border-white rotate-45"></div>
            </div>
            
            {/* Center Data (Coordinates) */}
            <div className="absolute top-[40%] left-[55%] text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-tight opacity-50">
                X: +15.229<br/>
                Y: -02.541<br/>
                Z: +89.006
            </div>

            {/* TOP CENTER: VELOCITY */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-500 mb-2">Velocity</span>
                <div className="text-8xl font-black font-headline italic tracking-tighter leading-none tabular-nums flex items-baseline">
                    {Math.floor(velocity).toLocaleString()}
                    <span className="text-4xl text-zinc-400">.{(velocity % 1).toFixed(1).substring(2)}</span>
                </div>
                <div className="mt-4 bg-white text-zinc-950 px-4 py-1 text-[10px] font-bold font-headline uppercase tracking-widest">
                    KM / SEC
                </div>
            </div>

            {/* TOP LEFT: STABILITY */}
            <div className="absolute top-12 left-12 w-80">
                <div className="relative p-4 -skew-x-[15deg] border border-white/20 bg-zinc-950/80 backdrop-blur">
                    <div className="skew-x-[15deg]">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">Temporal Stability</span>
                            <span className="text-[10px] font-bold font-headline">{stability.toFixed(1)}%</span>
                        </div>
                        <div className="h-2 w-full bg-zinc-900 border border-white/10 p-[1px]">
                            <div className="h-full bg-white transition-all duration-300" style={{ width: `${stability}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TOP RIGHT: RADAR & ECHO WARNING */}
            <div className="absolute top-12 right-12 flex flex-col items-end gap-4 w-64">
                <div className="relative w-full aspect-square border border-white/20 bg-zinc-950/80 backdrop-blur p-2">
                    {/* Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
                    {/* Center Point */}
                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    {/* Echo Dot */}
                    <div 
                        className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                        style={{ 
                            top: `${50 + (echoDistance / 8)}%`, 
                            left: `${50 + (echoDistance / 16)}%` 
                        }}
                    ></div>
                    {/* Label */}
                    <div className="absolute bottom-2 left-2 bg-white text-zinc-950 px-2 py-0.5 text-[8px] font-bold font-headline uppercase tracking-widest">
                        RADAR_ACTIVE
                    </div>
                </div>

                {proximityPercent > 50 && (
                    <div className="relative w-[90%] p-3 -skew-x-[15deg] bg-red-500 border border-red-400 animate-pulse">
                        <div className="skew-x-[15deg] text-center">
                            <span className="text-[10px] font-black font-headline uppercase tracking-[0.2em] text-black">
                                WARNING: ECHO NEARING
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* BOTTOM CENTER: TIMER */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="relative p-6 px-12 -skew-x-[15deg] border border-white/10 bg-zinc-950/80 backdrop-blur border-t-2 border-t-white">
                    <div className="skew-x-[15deg] flex flex-col items-center">
                        <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-500 mb-2">Drift_Elapsed</span>
                        <div className="text-5xl font-black font-headline tracking-tighter tabular-nums flex items-baseline">
                            {formatTime(timer).split(':')[0]}:{formatTime(timer).split(':')[1]}
                            <span className="text-2xl text-zinc-500">:{formatTime(timer).split(':')[2]}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM LEFT: METRICS */}
            <div className="absolute bottom-12 left-12 w-64">
                <div className="relative p-4 -skew-x-[15deg] border border-white/10 bg-zinc-950/80 backdrop-blur">
                    <div className="skew-x-[15deg] space-y-2 font-mono text-[9px] uppercase tracking-widest flex flex-col">
                        <div className="flex justify-between">
                            <span className="text-zinc-600">Thrust_Vector</span>
                            <span className="text-white">Optimal</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-600">Core_Temp</span>
                            <span className="text-white">441.2K</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-600">Shift_Index</span>
                            <span className="text-red-500">0.89</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 mt-3 ml-2">
                    <div className="w-2 h-2 bg-white/50"></div>
                    <div className="w-2 h-2 bg-white/20"></div>
                    <div className="w-2 h-2 bg-white/5"></div>
                </div>
            </div>

            {/* BOTTOM RIGHT: SYSTEM LABEL */}
            <div className="absolute bottom-12 right-12 flex flex-col items-end gap-2">
                <div className="text-sm font-black font-headline italic tracking-widest uppercase text-white">
                    DRIFT_SYSTEM // OS_V.04
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-zinc-600">Encryption: Hardened</span>
                    <div className="w-4 h-4 border border-zinc-600 flex items-center justify-center">
                        <div className="w-2 h-2 bg-zinc-600"></div>
                    </div>
                </div>
            </div>

            {/* Atmosphere */}
            <div className="scanline-overlay opacity-10"></div>
        </div>
    );
};

export default HUD;
