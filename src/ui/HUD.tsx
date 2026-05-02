import React, { useState, useEffect } from 'react';

interface HUDProps {
    activeLevel: number;
    isPaused?: boolean;
    onTogglePause?: () => void;
    stability: number;
    velocity?: number;
    dashCooldown: number;
    echoDistance: number;
    missionProgress: number;
}

const HUD: React.FC<HUDProps> = ({ 
    activeLevel, 
    isPaused = false, 
    onTogglePause, 
    stability, 
    velocity = 0, 
    dashCooldown, 
    echoDistance, 
    missionProgress 
}) => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        if (isPaused) {
            return;
        }
        const i = setInterval(() => setTimer(t => t + 10), 10);
        return () => clearInterval(i);
    }, [activeLevel, isPaused]);

    // Reset timer when level changes
    useEffect(() => {
        setTimer(0);
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
            
            {/* TOP PROGRESS BAR (Level Mapping) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
                <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${missionProgress * 100}%` }}></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[6px] font-mono uppercase tracking-[1em] text-cyan-400/50">Level_Mapping_InProgress...</div>
            </div>

            {/* Background Texture - Minimal */}
            <div className="absolute inset-0 z-[-1] opacity-10 mix-blend-screen bg-black"></div>
            
            {/* PAUSE BUTTON (Top Center) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-auto">
                <button 
                    onClick={onTogglePause}
                    className="w-12 h-12 bg-zinc-950/80 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center group"
                    title="Pause Drift (ESC)"
                >
                    <span className="material-symbols-outlined text-zinc-500 group-hover:text-white transition-colors">
                        {isPaused ? 'play_arrow' : 'pause'}
                    </span>
                </button>
            </div>

            {/* TOP LEFT: STABILITY & LEVEL ID */}
            <div className="absolute top-8 left-8 flex flex-col gap-1">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-zinc-600">Stability</span>
                        <span className="text-3xl font-black font-headline italic text-white leading-none tabular-nums">{stability.toFixed(1)}%</span>
                    </div>
                    <div className="h-10 w-[1px] bg-white/10"></div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-zinc-600">Level_ID</span>
                        <span className="text-xl font-black font-headline italic text-zinc-400 leading-none">0{activeLevel}</span>
                    </div>
                </div>
                <div className="h-1 w-64 bg-white/5 border border-white/10 mt-1">
                    <div className="h-full bg-white transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ width: `${stability}%` }}></div>
                </div>
            </div>

            {/* TOP RIGHT: VELOCITY & DASH SYNC */}
            <div className="absolute top-8 right-8 flex flex-col items-end gap-3">
                <div className="text-right bg-zinc-950/60 p-4 border border-white/5 backdrop-blur-sm min-w-[200px]">
                    <span className="block text-[8px] font-mono uppercase tracking-[0.4em] text-zinc-600 mb-2">Velocity_Vector</span>
                    <div className="text-5xl font-black font-headline italic tracking-tighter leading-none tabular-nums text-white flex items-baseline justify-end">
                        {Math.floor(velocity).toLocaleString()}
                        <span className="text-2xl text-zinc-500">.{(velocity % 1).toFixed(1).substring(2)}</span>
                        <span className="text-xs font-mono ml-2 text-zinc-700">KM/S</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 bg-zinc-950/40 p-2 px-4 border border-white/5">
                    <span className="text-[7px] font-mono uppercase tracking-widest text-zinc-500">Dash_Protocol:</span>
                    <div className="flex gap-1.5">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div 
                                key={i} 
                                className={`w-4 h-1.5 transition-colors duration-300 ${dashCooldown <= 0 ? 'bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.4)]' : 'bg-zinc-800'}`}
                            ></div>
                        ))}
                    </div>
                    <span className={`text-[8px] font-black font-headline uppercase ml-2 ${dashCooldown <= 0 ? 'text-cyan-400 animate-pulse' : 'text-zinc-700'}`}>
                        {dashCooldown <= 0 ? 'READY' : 'COOLDOWN'}
                    </span>
                </div>
            </div>

            {/* BOTTOM LEFT: TIMER */}
            <div className="absolute bottom-8 left-8 bg-zinc-950/60 p-4 border border-white/5 backdrop-blur-sm">
                <span className="block text-[8px] font-mono uppercase tracking-[0.4em] text-zinc-600 mb-1">Drift_Telemetry</span>
                <div className="text-3xl font-black font-headline tracking-tighter tabular-nums flex items-baseline text-white">
                    {formatTime(timer).split(':')[0]}:{formatTime(timer).split(':')[1]}
                    <span className="text-lg text-zinc-500">:{formatTime(timer).split(':')[2]}</span>
                </div>
            </div>

            {/* BOTTOM RIGHT: RADAR & ECHO WARNING */}
            <div className="absolute bottom-8 right-8 flex flex-col items-end gap-3">
                {proximityPercent > 60 && (
                    <div className="px-4 py-2 bg-red-600/30 border border-red-500/60 -skew-x-[15deg] animate-pulse">
                        <span className="block skew-x-[15deg] text-[9px] font-black font-headline uppercase tracking-widest text-red-500">
                            PROXIMITY_ALARM: SYNC_FAIL_IMMINENT
                        </span>
                    </div>
                )}
                
                <div className="relative w-36 aspect-square border border-white/10 bg-zinc-950/60 backdrop-blur-sm p-2">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
                    <div 
                        className="absolute w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)] transition-all duration-300"
                        style={{ 
                            top: `${50 + (echoDistance / 10)}%`, 
                            left: `${50 + (echoDistance / 20)}%` 
                        }}
                    ></div>
                    <div className="absolute bottom-1 right-2 text-[6px] font-mono text-zinc-800 uppercase tracking-widest">TRK_NODE_0{activeLevel}</div>
                </div>
            </div>

            {/* Atmosphere */}
            <div className="scanline-overlay opacity-10"></div>
        </div>
    );
};

export default HUD;
