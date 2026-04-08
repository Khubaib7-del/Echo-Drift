import React from 'react';

interface SettingsScreenProps {
  onBack: () => void;
  config: {
    themePrimary: string;
    themeSecondary: string;
    themeBackground: string;
    fontFamily: string;
  };
  setConfig: (config: any) => void;
  resetToDefaults: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, config, setConfig, resetToDefaults }) => {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl overflow-hidden">
      <div className="w-full max-w-2xl border border-theme-primary/20 bg-zinc-950 p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-black font-headline text-white uppercase italic tracking-wider">Visual & System Calibration</h2>
          <button onClick={onBack} className="material-symbols-outlined text-zinc-500 hover:text-white transition-colors cursor-pointer">close</button>
        </div>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto animated-scrollbar pr-4">
          
          <div className="glass-panel p-4 border border-theme-primary/10">
            <h3 className="font-headline font-bold text-theme-primary text-sm uppercase mb-4">Color Overrides</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 uppercase font-headline">Primary Accent</span>
                <input 
                  type="color" 
                  value={config.themePrimary} 
                  onChange={(e) => setConfig({ ...config, themePrimary: e.target.value })}
                  className="w-12 h-8 cursor-pointer bg-transparent border-0 outline-none" 
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 uppercase font-headline">Secondary Accent</span>
                <input 
                  type="color" 
                  value={config.themeSecondary} 
                  onChange={(e) => setConfig({ ...config, themeSecondary: e.target.value })}
                  className="w-12 h-8 cursor-pointer bg-transparent border-0 outline-none" 
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 uppercase font-headline">Background Tone</span>
                <input 
                  type="color" 
                  value={config.themeBackground} 
                  onChange={(e) => setConfig({ ...config, themeBackground: e.target.value })}
                  className="w-12 h-8 cursor-pointer bg-transparent border-0 outline-none" 
                />
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-theme-primary/5 border border-theme-primary/20 flex gap-4 items-center">
               <span className="text-xs text-zinc-400 tracking-widest uppercase">Preview:</span>
               <div className="flex-1 h-2 bg-theme-primary rounded-full"></div>
               <div className="flex-1 h-2 bg-theme-secondary rounded-full"></div>
            </div>
          </div>

          <div className="glass-panel p-4 border border-theme-primary/10">
            <h3 className="font-headline font-bold text-theme-primary text-sm uppercase mb-4">Typography</h3>
            <select 
                value={config.fontFamily} 
                onChange={(e) => setConfig({ ...config, fontFamily: e.target.value })}
                className="w-full bg-zinc-900 border border-theme-primary/30 text-white p-2 font-headline cursor-pointer outline-none mb-2"
            >
                <option value='"Space Grotesk"'>Space Grotesk (Default)</option>
                <option value='"JetBrains Mono", monospace'>JetBrains Mono (Console)</option>
                <option value='"Inter", sans-serif'>Inter (Clean)</option>
            </select>
          </div>
          
        </div>

        <div className="mt-8 pt-4 border-t border-white/5 flex gap-4">
           <button 
             onClick={resetToDefaults}
             className="flex-1 py-3 bg-red-500/10 border border-red-500/30 text-red-400 font-headline uppercase text-xs hover:bg-red-500/20 transition-all cursor-pointer"
           >
             RESET DEFAULTS
           </button>
           <button 
             onClick={onBack}
             className="flex-1 py-3 bg-theme-primary/10 border border-theme-primary/30 text-theme-primary font-headline uppercase text-xs hover:bg-theme-primary hover:text-zinc-950 transition-all cursor-pointer shadow-[0_0_15px_var(--theme-primary)] shadow-theme-primary/20"
           >
             CONFIRM CALIBRATION
           </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
