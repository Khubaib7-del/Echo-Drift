import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [visible, setVisible] = useState(false);

  // Position classes mapping
  const posClasses = {
    top: 'bottom-full left-1/2 -content-center -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div 
      className="relative flex items-center group/tooltip"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {visible && (
        <div className={`absolute z-[200] max-w-xs w-max bg-zinc-900 border border-theme-primary/50 p-2 text-theme-primary text-[10px] font-headline uppercase tracking-widest shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none animate-pulse-soft ${posClasses[position]}`}>
          {content}
        </div>
      )}
      {children}
    </div>
  );
};
