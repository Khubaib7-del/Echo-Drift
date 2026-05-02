import React from 'react';
import { SettingsClose } from './CustomIcons';

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
    <div className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-3xl overflow-y-auto animated-scrollbar pointer-events-auto flex flex-col p-8 md:p-24">
      
      {/* Background Detail */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white -skew-x-[15deg] translate-x-1/4"></div>
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col relative z-10 flex-1">
        
        {/* Header */}
        <header className="flex justify-between items-start mb-32 border-b border-white/10 pb-16">
          <div className="space-y-6">
            <h2 className="text-8xl font-black font-headline italic uppercase leading-none tracking-tighter text-white">CALIBRATION</h2>
            <div className="flex items-center gap-4">
              <span className="w-12 h-0.5 bg-white"></span>
              <p className="text-[10px] font-mono uppercase tracking-[1em] text-zinc-500">Global_Parameter_Override</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <SettingsClose onClick={onBack} />
            <span className="text-[8px] font-mono text-zinc-500 tracking-widest uppercase">DISCONNECT</span>
          </div>
        </header>

        <div className="flex flex-col gap-24 pb-32">
          
          {/* CHROMATIC SECTION */}
          <section className="space-y-12">
            <div className="flex items-center gap-6">
               <span className="text-zinc-700 font-mono text-xs">01 //</span>
               <h3 className="text-2xl font-black font-headline italic uppercase tracking-widest text-white">Neural_Color_Array</h3>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {[
                { label: 'Primary_Sync', val: config.themePrimary, key: 'themePrimary', desc: 'Active UI focus and energetic feedback.' },
                { label: 'Secondary_Link', val: config.themeSecondary, key: 'themeSecondary', desc: 'Peripheral data and status highlights.' },
                { label: 'Base_Obsidian', val: config.themeBackground, key: 'themeBackground', desc: 'Core environmental atmosphere.' }
              ].map((color) => (
                <div key={color.label} className="group relative flex items-center justify-between p-8 bg-zinc-900/20 border border-white/5 hover:bg-zinc-900/40 hover:border-white/20 transition-all">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">{color.label}</span>
                    <p className="text-[8px] font-mono text-zinc-700 uppercase">{color.desc}</p>
                  </div>
                  
                  <div className="flex items-center gap-12">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{color.val}</span>
                    <input 
                      type="color" 
                      value={color.val}
                      onChange={(e) => setConfig({ ...config, [color.key]: e.target.value })}
                      className="w-32 h-12 bg-transparent border-0 cursor-pointer outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TYPOGRAPHY SECTION */}
          <section className="space-y-12">
            <div className="flex items-center gap-6">
               <span className="text-zinc-700 font-mono text-xs">02 //</span>
               <h3 className="text-2xl font-black font-headline italic uppercase tracking-widest text-white">Symbol_Processor</h3>
            </div>
            
            <div className="bg-zinc-900/20 border border-white/5 p-8 flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="flex-1 space-y-6">
                <select 
                  value={config.fontFamily} 
                  onChange={(e) => setConfig({ ...config, fontFamily: e.target.value })}
                  className="w-full bg-transparent border-0 text-5xl font-black font-headline italic uppercase tracking-tighter text-white cursor-pointer outline-none"
                >
                  <option className="bg-zinc-950" value='"Space Grotesk"'>Space_Grotesk</option>
                  <option className="bg-zinc-950" value='"JetBrains Mono"'>JetBrains_Mono</option>
                  <option className="bg-zinc-950" value='"Inter"'>Inter_Static</option>
                </select>
                <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest leading-relaxed">
                   Changes the visual rendering of all neural data streams. High-contrast sans-serif recommended.
                </p>
              </div>
              <div className="w-1/3 h-24 border border-white/5 bg-zinc-950/50 flex items-center justify-center overflow-hidden">
                <span className="text-3xl font-black italic text-white/10 select-none -rotate-12">PREVIEW</span>
              </div>
            </div>
          </section>

          {/* SYSTEM OVERRIDE */}
          <section className="pt-12 border-t border-white/5">
            <div className="bg-red-500/5 p-8 border border-red-500/10 flex justify-between items-center group hover:bg-red-500/10 transition-colors">
              <div className="space-y-1">
                <h4 className="text-xl font-black font-headline italic uppercase text-red-500">HARD_RESET</h4>
                <p className="text-[8px] font-mono text-red-900 uppercase">Clear all cached parameters and revert to factory defaults.</p>
              </div>
              <button 
                onClick={resetToDefaults}
                className="px-8 py-3 bg-red-600 text-white font-black font-headline italic text-xs uppercase hover:bg-white hover:text-red-600 transition-all shadow-[0_0_20px_rgba(255,0,0,0.2)]"
              >
                Execute_Wipe
              </button>
            </div>
          </section>

          {/* Confirm Button */}
          <div className="mt-12 flex justify-center">
             <button 
               onClick={onBack}
               className="w-full max-w-md py-6 bg-white text-black font-black font-headline italic text-3xl uppercase tracking-tighter hover:scale-[1.02] transition-transform"
               style={{ transform: 'skewX(-15deg)' }}
             >
                Apply_Changes
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
