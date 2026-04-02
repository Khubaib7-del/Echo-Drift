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
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full font-body text-white selection:bg-cyan-400 selection:text-zinc-950 overflow-hidden">
            
            {/* Split Timeline Overlays for aesthetic integration with GameApp Canvas */}
            <div className="absolute inset-0 flex opacity-10 pointer-events-none z-[-1]">
                <div className="w-1/2 h-full bg-gradient-to-r from-cyan-400 to-transparent"></div>
                <div className="w-1/2 h-full bg-gradient-to-l from-magenta-400 to-transparent"></div>
            </div>

            {/* Scanline & HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%]"></div>


            {/* Top Navigation (ECHO DRIFT Branding) */}
            <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-transparent">
                <div className="flex items-center gap-6">
                    <h1 className="text-2xl font-black italic text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] font-headline uppercase tracking-[0.1em]">ECHO DRIFT</h1>
                    <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-400 to-transparent"></div>
                    <div className="flex gap-4">
                        <span className="text-cyan-300 border-b-2 border-cyan-400 pb-1 font-headline uppercase tracking-[0.1em] font-bold text-sm">MISSION</span>
                        <span className="text-cyan-900/60 font-headline uppercase tracking-[0.1em] font-bold text-sm">TIMELINE</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 pointer-events-auto">
                    <button className="w-10 h-10 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/10 hover:skew-x-[-12deg] transition-all">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/10 hover:skew-x-[-12deg] transition-all">
                        <span className="material-symbols-outlined">timeline</span>
                    </button>
                </div>
            </header>

            {/* Left HUD (SideNav Style) */}
            <aside className="absolute left-0 top-0 h-full flex flex-col z-40 w-64 pt-24 pb-12 opacity-80 mix-blend-screen pointer-events-none">
                <div className="px-6 mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-cyan-400 flex items-center justify-center">
                            <span className="material-symbols-outlined text-zinc-950 font-variation-[FILL_1]">rocket_launch</span>
                        </div>
                        <div>
                            <h2 className="text-cyan-400 font-bold font-headline tracking-tighter uppercase text-sm">SECTOR 7-G</h2>
                            <p className="text-[10px] text-cyan-400/60 font-body uppercase tracking-widest">PRESENT_TIMELINE_STABLE</p>
                        </div>
                    </div>
                </div>
                
                <div className="px-6 mt-auto">
                    <div className="text-cyan-400 font-headline font-black text-xl tracking-tighter mb-1">T+ {formatTime(timer)}</div>
                    <div className="text-[10px] text-cyan-400/50 uppercase tracking-widest">Synchronization Running</div>
                </div>
            </aside>

            {/* RIGHT HUD (Gameplay Stats) */}
            <section className="absolute right-0 top-0 h-full w-72 flex flex-col items-end p-8 z-40 gap-8 pointer-events-none mt-20">
                {/* Stability Gauge */}
                <div className="pointer-events-auto flex flex-col items-center gap-2 p-6 bg-surface-container-low/60 backdrop-blur-md clip-slant border-r-2 border-cyan-400">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle className="text-zinc-600" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="2"></circle>
                            <circle className="text-cyan-400" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="91" strokeWidth="4"></circle>
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-3xl font-black font-headline text-cyan-400">75%</span>
                            <span className="text-[10px] font-label text-zinc-400 uppercase tracking-widest">STABILITY</span>
                        </div>
                    </div>
                </div>

                {/* Drift Energy Bar */}
                <div className="pointer-events-auto w-full p-4 bg-surface-container-low/60 backdrop-blur-md">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-label text-magenta-400 uppercase tracking-widest">DRIFT_ENERGY</span>
                        <span className="text-xl font-black font-headline text-magenta-200">MAX</span>
                    </div>
                    <div className="h-3 w-full bg-surface-container-lowest relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-magenta-200 shadow-[0_0_15px_rgba(255,201,244,0.8)] w-[88%]"></div>
                        <div className="absolute inset-y-0 left-0 w-full flex">
                            <div className="flex-1 border-r border-background/50"></div>
                            <div className="flex-1 border-r border-background/50"></div>
                            <div className="flex-1 border-r border-background/50"></div>
                            <div className="flex-1 border-r border-background/50"></div>
                        </div>
                    </div>
                </div>

                {/* Contextual Controls */}
                <div className="flex gap-4 mt-auto">
                    <button className="pointer-events-auto p-4 bg-zinc-800/80 border-t border-cyan-400/20 text-cyan-400 flex items-center gap-2 hover:bg-cyan-400 hover:text-zinc-950 transition-all">
                        <span className="material-symbols-outlined text-sm font-variation-[FILL_1]">pause</span>
                        <span className="text-xs font-label font-bold uppercase tracking-tighter">PAUSE</span>
                    </button>
                    <button className="pointer-events-auto p-4 bg-zinc-800/80 border-t border-magenta-200/20 text-magenta-400 flex items-center gap-2 hover:bg-magenta-200 hover:text-zinc-950 transition-all">
                        <span className="material-symbols-outlined text-sm">replay</span>
                        <span className="text-xs font-label font-bold uppercase tracking-tighter">RESTART</span>
                    </button>
                </div>
            </section>

            {/* Bottom Navigation Bar */}
            <footer className="absolute bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 bg-zinc-950/60 backdrop-blur-md h-20 border-t border-cyan-500/20 shadow-[0_-10px_40px_rgba(0,240,255,0.1)] pointer-events-auto">
                <div className="flex flex-col items-center justify-center text-cyan-400/40 hover:text-magenta-400 hover:drop-shadow-[0_0_8px_#ff00ff] cursor-pointer transition-all">
                    <span className="material-symbols-outlined">speed</span>
                    <span className="font-headline text-[10px] uppercase tracking-widest mt-1">DASH</span>
                </div>
                <div className="flex flex-col items-center justify-center text-cyan-400/40 hover:text-magenta-400 hover:drop-shadow-[0_0_8px_#ff00ff] cursor-pointer transition-all">
                    <span className="material-symbols-outlined">radar</span>
                    <span className="font-headline text-[10px] uppercase tracking-widest mt-1">SCAN</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-cyan-400 text-zinc-950 p-3 scale-110 shadow-[0_0_15px_#00F0FF] glitch-jitter cursor-pointer">
                    <span className="material-symbols-outlined font-variation-[FILL_1]">waves</span>
                    <span className="font-headline font-black text-[10px] uppercase tracking-widest mt-1">DRIFT</span>
                </div>
                <div className="flex flex-col items-center justify-center text-cyan-400/40 hover:text-magenta-400 hover:drop-shadow-[0_0_8px_#ff00ff] cursor-pointer transition-all">
                    <span className="material-symbols-outlined">explore</span>
                    <span className="font-headline text-[10px] uppercase tracking-widest mt-1">MAP</span>
                </div>
                <div className="flex flex-col items-center justify-center text-cyan-400/40 hover:text-magenta-400 hover:drop-shadow-[0_0_8px_#ff00ff] cursor-pointer transition-all">
                    <span className="material-symbols-outlined">terminal</span>
                    <span className="font-headline text-[10px] uppercase tracking-widest mt-1">LOG</span>
                </div>
            </footer>

            {/* Aesthetic Decorative Corner Readouts */}
            <div className="absolute bottom-24 left-8 z-30 pointer-events-none">
                <div className="flex flex-col font-mono text-[8px] text-cyan-400/40 leading-tight">
                    <span>COORD: 34.0912 // -118.2437</span>
                    <span>VELOCITY: 88.2 KM/S</span>
                    <span>ECHO_SIGNATURE: POSITIVE</span>
                </div>
            </div>
            <div className="absolute bottom-24 right-8 z-30 pointer-events-none text-right">
                <div className="flex flex-col font-mono text-[8px] text-magenta-200/40 leading-tight">
                    <span>SYNC_RATE: 0.992</span>
                    <span>FRAME_BUFFER: STABLE</span>
                    <span>LATENCY: 2.4MS</span>
                </div>
            </div>
        </div>
    );
};

export default HUD;
