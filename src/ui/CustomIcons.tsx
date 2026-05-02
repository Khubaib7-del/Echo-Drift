import React from 'react';

/**
 * ICON 1: REDESIGNED SIDEBAR TOGGLE
 * Hamburger (3 bars) -> Chevron (←) Transformation
 * Focus: Clean geometry and mechanical motion storytelling.
 */
export const SidebarToggle: React.FC<{ isOpen: boolean; onClick: () => void }> = ({ isOpen, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="group relative w-12 h-12 flex items-center justify-center transition-all duration-200 active:scale-90"
        >
            <div className="relative w-6 h-5 flex flex-col justify-between items-center pointer-events-none">
                {/* Top Bar */}
                <div className={`h-[2px] bg-white transition-all duration-500 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] origin-right
                    ${isOpen 
                        ? 'w-4 -rotate-45 translate-x-[-1px] translate-y-[2px]' 
                        : 'w-6 group-hover:w-7'}
                `}></div>
                
                {/* Middle Bar */}
                <div className={`h-[2px] bg-white transition-all duration-500 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)]
                    ${isOpen 
                        ? 'w-3 translate-x-[4px]' 
                        : 'w-6 group-hover:w-8'}
                `}></div>
                
                {/* Bottom Bar */}
                <div className={`h-[2px] bg-white transition-all duration-500 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] origin-right
                    ${isOpen 
                        ? 'w-4 rotate-45 translate-x-[-1px] translate-y-[-2px]' 
                        : 'w-6 group-hover:w-7'}
                `}></div>
            </div>

            {/* Subtle Click Snap Feedback */}
            <style>{`
                button:active div {
                    transition: transform 0.05s;
                }
            `}</style>
        </button>
    );
};

/**
 * ICON 2: REDESIGNED CLOSE BUTTON
 * X -> + -> Collapse Transformation
 * Focus: Hidden slab that emerges on interaction.
 */
export const SettingsClose: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="group relative w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
        >
            {/* Background Slab (Emerges on Hover) */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 -skew-x-[15deg] scale-0 group-hover:scale-100"></div>
            
            <div className="relative w-6 h-6 flex items-center justify-center pointer-events-none">
                {/* Line 1 (\) */}
                <div className={`absolute w-7 h-[2px] transition-all duration-300 ease-out
                    bg-white group-hover:bg-black rotate-45 
                    group-active:rotate-90 group-active:scale-x-50
                `}></div>
                
                {/* Line 2 (/) */}
                <div className={`absolute w-7 h-[2px] transition-all duration-300 ease-out
                    bg-white group-hover:bg-black -rotate-45 
                    group-active:rotate-0 group-active:scale-x-50
                `}></div>
            </div>

            {/* Click Impact Pulse */}
            <div className="absolute inset-0 bg-white opacity-0 group-active:animate-ping pointer-events-none"></div>

            <style>{`
                @keyframes impact-pulse {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                button:active .bg-white {
                    background-color: #ef4444; /* Brief red flash on break */
                }
            `}</style>
        </button>
    );
};
