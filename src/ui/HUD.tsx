import React, { useState, useEffect } from 'react';

interface HUDProps {
   activeLevel: number;
   stability: number;
}

const HUD: React.FC<HUDProps> = ({ activeLevel, stability }) => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const i = setInterval(() => setTimer(t => t+1), 1000);
        return () => clearInterval(i);
    }, [activeLevel]); // Reset timer when level changes

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const sectorId = Math.floor((activeLevel - 1) / 5) + 1;
    const levelInSector = ((activeLevel - 1) % 5) + 1;

    return (
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full font-body text-white selection:bg-cyan-400 selection:text-zinc-950 overflow-hidden">
            
            {/* Background Images Layer */}
            <div className="absolute inset-0 flex opacity-20 pointer-events-none z-[-1]">
                <div className="w-1/2 h-full relative overflow-hidden border-r border-cyan-400/20">
                    <img 
                        className="w-full h-full object-cover mix-blend-screen" 
                        alt="Present Timeline City" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7RC5GH-f_wtfcDdTyf6qmA-7KTb5RPcmGnHtm1gIfYJC6LzUcE3bvzfPlbw6mEvIDX7jODW82wxPJNnO1EI2B9iMP63skC1TtM7xoBNGpGE_IBltl0Qj0Cwwyd9sIQtQ_SGmKPHTfQUbDJjdKrnBiVb74vBqfVCq4YX8T77AAfEwMAiBqoGH2VWd8271gs6wsj-ecrbSh2dbuBGRrI3943a90WEzF3tS7lN366Bf7rWWgIJC_ykuBrc33vMMK8SEIcRPWBmDfKnZs"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent"></div>
                </div>
                <div className="w-1/2 h-full relative overflow-hidden">
                    <img 
                        className="w-full h-full object-cover grayscale opacity-60 mix-blend-color-dodge" 
                        alt="Echo Timeline Industrial" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIOzqjWvz2W505Kc72zEQTH75dqpYncFkH-w1VYmT0siA_d1Ktr5kagRX9jVvsujkoCs68R5LYo9LaA-qkZr4UQdovmbyn9cvYNYkcYO9CBZfEvp6YldOGXZ4SS2LqKyHv2K0Xj_O3qxA4yYI99VZreVkrYQbDPXPy3yt71dTFK0Me6hQFXVz-4T5Jn7AN34J9ZYzTh9EGm0jlXbMCdjoP6bQ63Uv89UFjrg67vZXr92IG6OZVPzdSFhQR2IjHHxJV9SjxgoplOs9G"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-magenta-400/10 to-transparent"></div>
                </div>
            </div>

      {/* Scanline Overlay */}
      <div className="scanline-overlay opacity-30"></div>

            {/* Robot Image (Simulated in RIFT screen) */}
            <div className="absolute bottom-1/4 left-1/4 -translate-x-1/2 w-48 h-96 opacity-10 blur-[1px] pointer-events-none">
                <img 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]" 
                    alt="Robot Silhouette" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7ofsQP27LBp5Bh9wm9fMnu648Nv40oAjv-gS-Jl5qMrrv896DUj8nThk31r9l1ImmSfAU-L8ncNF3ResCWUOlRV8lk6-72EgZPK38_ZmZDCpQtXKJmp4-vIWbijrB5VDre9btO9VwpDo79TtNQKHrQUd__yFphRB3yEhFaDxAd_zwUJotjHTZCE7yeaVWP-KStO4N9sEKwwyTJKwyH3yzGEvVJgYumEt898-KOahUtZSrlJFJqr4439bf_h1B2IlVMANen_Uz9fS7"
                />
            </div>

            {/* Top Navigation */}
            <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-transparent">
                <div className="flex items-center gap-6">
                    <h1 className="text-2xl font-black italic text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] font-headline uppercase tracking-[0.1em]">ECHO DRIFT</h1>
                    <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-400 to-transparent"></div>
                    <div className="flex gap-4">
                        <span className="text-cyan-300 border-b-2 border-cyan-400 pb-1 font-headline uppercase tracking-[0.1em] font-bold text-sm">SECTOR {sectorId} - LEVEL {levelInSector}</span>
                    </div>
                </div>
            </header>

            {/* Left Info HUD */}
            <aside className="absolute left-0 top-0 h-full flex flex-col z-40 w-64 pt-24 pb-12 opacity-80 pointer-events-none">
                <div className="px-6 mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-cyan-400 flex items-center justify-center">
                            <span className="material-symbols-outlined text-zinc-950 font-variation-[FILL_1]">rocket_launch</span>
                        </div>
                        <div>
                            <h2 className="text-cyan-400 font-bold font-headline tracking-tighter uppercase text-sm">SECTOR {sectorId}-{String.fromCharCode(64 + levelInSector)}</h2>
                            <p className={`text-[10px] font-mono uppercase tracking-widest ${stability > 50 ? 'text-cyan-400/60' : 'text-magenta-400 animate-pulse'}`}>
                                {stability === 100 ? 'TIMELINE_STABLE' : (stability > 50 ? 'TIMELINE_FLUCTUATING' : 'TIMELINE_FRACTURING!!')}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="px-6 mt-auto flex flex-col gap-1">
                    <div className="text-cyan-400 font-headline font-black text-5xl tracking-tighter mb-1 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">T+ {formatTime(timer)}</div>
                    <div className="flex flex-col font-mono text-[10px] text-cyan-400/60 leading-tight ml-1">
                        <span>COORD: {Math.floor(Math.random()*100)}.0912 // -{Math.floor(Math.random()*200)}.2437</span>
                        <span>VELOCITY: 88.2 KM/S</span>
                    </div>
                    <div className="text-[12px] text-cyan-400/80 uppercase tracking-widest ml-1 mt-1 font-bold">Synchronization Running</div>
                </div>
            </aside>

            {/* RIGHT HUD Stats */}
            <section className="absolute right-0 top-0 h-full w-72 flex flex-col items-end p-8 z-40 gap-8 pointer-events-none mt-20">
                {/* Stability Gauge */}
                <div className="pointer-events-auto flex flex-col items-center gap-2 p-6 bg-surface-container-low/60 backdrop-blur-md border-r-2 border-cyan-400">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle className="text-zinc-600/30" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="2"></circle>
                            <circle className="text-cyan-400 transition-all duration-300" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset={364.4 * (1 - stability / 100)} strokeWidth="4"></circle>
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-3xl font-black font-headline text-cyan-400">{stability}%</span>
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
                        <div className="absolute inset-y-0 left-0 bg-magenta-400 shadow-[0_0_15px_rgba(255,0,255,0.4)] w-[88%]"></div>
                        <div className="absolute inset-y-0 left-0 w-full flex">
                            {[0,1,2,3].map(i => <div key={i} className="flex-1 border-r border-background/50"></div>)}
                        </div>
                    </div>
                </div>

                {/* Controls (Non-navbar version for player focus) */}
                <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span className="text-[10px] font-headline text-cyan-400 uppercase self-center">Node Alpha: Online</span>
                    </div>
                </div>
            </section>

            {/* NO BOTTOM NAVBAR HERE - IT HAS BEEN REMOVED TO PREVENT DISTRACTION DURING MISSION */}
        </div>
    );
};

export default HUD;
