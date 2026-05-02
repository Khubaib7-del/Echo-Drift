import React from 'react';

interface PauseScreenProps {
    onResume: () => void;
    onRestart: () => void;
    onMenu: () => void;
}

const PauseScreen: React.FC<PauseScreenProps> = ({ onResume, onRestart, onMenu }) => {
    return (
        <div className="absolute inset-0 z-[150] flex items-center justify-center bg-zinc-950/80 backdrop-blur-md pointer-events-auto overflow-x-hidden">
            
            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
                <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-white/10"></div>
                <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-white/10"></div>
            </div>

            <div className="relative w-full max-w-lg p-1 bg-white -skew-x-[12deg] shadow-[0_0_100px_rgba(255,255,255,0.1)]">
                <div className="bg-zinc-950 p-12 flex flex-col items-center">
                    <div className="skew-x-[12deg] text-center mb-12">
                        <span className="block text-[10px] font-mono uppercase tracking-[1em] text-zinc-600 mb-4">Simulation_Halted</span>
                        <h2 className="text-7xl font-black font-headline italic uppercase tracking-tighter leading-none text-white">PAUSED</h2>
                        <div className="h-1 w-24 bg-cyan-400 mx-auto mt-6"></div>
                    </div>

                    <div className="w-full flex flex-col gap-4 skew-x-[12deg]">
                        <button 
                            onClick={onResume}
                            className="w-full py-6 bg-white hover:bg-cyan-400 text-zinc-950 font-black font-headline uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 group"
                        >
                            <span className="material-symbols-outlined text-2xl group-hover:scale-125 transition-transform">play_arrow</span>
                            Resume_Drift
                        </button>

                        <button 
                            onClick={onRestart}
                            className="w-full py-4 border border-white/10 hover:bg-white/5 text-white font-bold font-headline uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4"
                        >
                            <span className="material-symbols-outlined text-xl">replay</span>
                            Restart_Node
                        </button>

                        <button 
                            onClick={onMenu}
                            className="w-full py-4 border border-white/5 hover:bg-red-500/10 text-zinc-600 hover:text-red-400 font-bold font-headline uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4"
                        >
                            <span className="material-symbols-outlined text-xl">terminal</span>
                            Abort_Sequence
                        </button>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 w-full flex justify-between items-center opacity-20 skew-x-[12deg]">
                        <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">System_Status: Idle</span>
                        <div className="flex gap-2">
                            <div className="w-1.5 h-1.5 bg-white"></div>
                            <div className="w-1.5 h-1.5 bg-white"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scanline-overlay opacity-10 pointer-events-none"></div>
        </div>
    );
};

export default PauseScreen;
