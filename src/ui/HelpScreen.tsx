import React from 'react';

interface HelpScreenProps {
  onBack: () => void;
}

const HelpScreen: React.FC<HelpScreenProps> = ({ onBack }) => {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center p-12 bg-background/95 backdrop-blur-md overflow-y-auto animated-scrollbar">
      <div className="w-full max-w-4xl pt-20">
        <button 
          onClick={onBack}
          className="text-sm font-headline uppercase text-zinc-500 hover:text-theme-primary transition-colors flex items-center gap-2 mb-8"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          RETURN TO MENU
        </button>

        <div className="flex items-center gap-4 mb-12">
          <span className="material-symbols-outlined text-6xl text-theme-primary font-variation-[FILL_1]">support</span>
          <div>
            <h1 className="text-4xl font-headline font-black text-white uppercase tracking-widest">Operator's Manual</h1>
            <p className="text-theme-primary/60 font-body">Echo Drift Systems Guide</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
          <div className="glass-panel border border-theme-primary/20 p-6">
            <h2 className="text-xl font-headline font-black text-theme-primary uppercase mb-4 border-b border-theme-primary/20 pb-2">1. Mechanics Overview</h2>
            <p className="text-zinc-400 text-sm mb-4">
              Echo Drift fuses rhythmic precision with platforming. Movement requires anticipating chronological anomalies and shifting your phase state to match oncoming barriers.
            </p>
            <ul className="text-xs text-zinc-500 space-y-2 list-disc pl-4">
              <li>Dash through phase-barriers when color-synced.</li>
              <li>Avoid overlapping temporal resonance zones.</li>
              <li>Collect data shards to boost map synchronization.</li>
            </ul>
          </div>

          <div className="glass-panel border border-theme-primary/20 p-6">
            <h2 className="text-xl font-headline font-black text-theme-primary uppercase mb-4 border-b border-theme-primary/20 pb-2">2. Progression System</h2>
            <p className="text-zinc-400 text-sm mb-4">
              Sectors are unlocked sequentially. You must successfully clear all Node iterations within a Sector to decrypt the subsequent Sector payload.
            </p>
            <ul className="text-xs text-zinc-500 space-y-2 list-disc pl-4">
              <li>Completed levels increase your Sync Percentage.</li>
              <li>Previous node memories can be re-accessed at any time.</li>
            </ul>
          </div>

          <div className="glass-panel border border-theme-primary/20 p-6">
            <h2 className="text-xl font-headline font-black text-theme-primary uppercase mb-4 border-b border-theme-primary/20 pb-2">3. Troubleshooting</h2>
            <p className="text-zinc-400 text-sm mb-4">
              If visual processing becomes unstable, access CALIBRATION to alter system hues, toggle CRT emulation, or manage audio processing units.
            </p>
            <div className="bg-theme-secondary/10 border border-theme-secondary/30 p-3 mt-4 text-theme-secondary text-[10px] font-headline uppercase text-center">
              A contextual hint system activates autonomously if you repeatedly fail a synchronization attempt during drift execution.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpScreen;
