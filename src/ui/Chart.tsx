import React, { useEffect, useState } from 'react';

interface ChartScreenProps {
  highestUnlockedLevel: number;
}

const ChartScreen: React.FC<ChartScreenProps> = ({ highestUnlockedLevel }) => {
  const [liveData, setLiveData] = useState<number[]>([]);
  
  useEffect(() => {
     // Generate live trembling data
     const interval = setInterval(() => {
        setLiveData(Array.from({length: 20}).map(() => 40 + Math.random() * 60));
     }, 100);
     return () => clearInterval(interval);
  }, []);

  const calculateSectorProgress = (sectorId: number) => {
    const startLevel = (sectorId - 1) * 5;
    const completedLevels = Math.max(0, Math.min(5, highestUnlockedLevel - startLevel - 1));
    return Math.floor((completedLevels / 5) * 100);
  };

  const chartData = [
    { label: 'S_ALPHA', value: calculateSectorProgress(1) },
    { label: 'S_BRIDGE', value: calculateSectorProgress(2) },
    { label: 'S_VOID', value: calculateSectorProgress(6) },
    { label: 'S_KINETIC', value: calculateSectorProgress(8) },
    { label: 'S_APEX', value: calculateSectorProgress(10) },
    { label: 'S_BETA', value: calculateSectorProgress(11) }
  ];

  const sides = chartData.length;
  const R = 40;
  const center = 50;

  // Radar 
  const radarPoints = chartData.map((d, i) => {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    const r = (d.value / 100) * R;
    const x = center + Math.cos(angle) * r;
    const y = center + Math.sin(angle) * r;
    return `${x},${y}`;
  }).join(' ');

  // Live Area path
  const areaPointsStr = liveData.map((d, i) => {
     const x = (i / (liveData.length - 1)) * 100;
     const y = 100 - d;
     return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-full flex flex-col p-12 overflow-y-auto animated-scrollbar">
      <div className="flex items-center gap-4 mb-8 shrink-0">
        <span className="material-symbols-outlined text-6xl text-theme-primary">query_stats</span>
        <div>
          <h1 className="text-4xl font-headline font-black text-white uppercase tracking-widest">Diagnostics grid</h1>
          <p className="text-theme-primary/60 font-body">Multiple node telemetry arrays online</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl mx-auto pb-12">
          
          {/* Main Radar Card */}
          <div className="glass-panel border-theme-primary/20 p-6 flex flex-col items-center justify-center relative min-h-[400px] lg:col-span-2 shadow-[inset_0_0_50px_rgba(var(--theme-primary),0.05)]">
             <div className="absolute top-4 left-4 text-theme-primary font-mono text-xs tracking-widest">01 // OVERALL SECTOR MASTERY</div>
             <div className="w-full h-full flex items-center justify-center pt-8">
                 <div className="w-[300px] aspect-square relative -translate-x-12">
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(var(--theme-primary),0.5)]">
                       {/* Web Grid */}
                       {[25,50,75,100].map((pct, idx) => {
                          const pts = Array.from({length: sides}).map((_, i) => {
                             const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
                             const r = (pct/100) * R;
                             return `${center + Math.cos(angle)*r},${center + Math.sin(angle)*r}`;
                          }).join(' ');
                          return <polygon key={idx} points={pts} className="fill-none stroke-zinc-800 stroke-[0.3]" strokeDasharray={idx === 3 ? "" : "1,1"} />
                       })}
                       {/* Axis */}
                       {Array.from({length: sides}).map((_, i) => {
                          const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
                          return <line key={i} x1={center} y1={center} x2={center + Math.cos(angle)*R} y2={center + Math.sin(angle)*R} className="stroke-zinc-700 stroke-[0.2]" />
                       })}
                       {/* Radar Data Area */}
                       <polygon points={radarPoints} className="fill-theme-primary/20 stroke-theme-primary stroke-[0.5] transition-all duration-1000" />
                       {/* Points */}
                       {chartData.map((d, i) => {
                          const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
                          const r = (d.value/100) * R;
                          const px = center + Math.cos(angle)*r;
                          const py = center + Math.sin(angle)*r;
                          return <circle key={i} cx={px} cy={py} r="1.5" className="fill-white" />
                       })}
                    </svg>
                 </div>
                 
                 <div className="flex flex-col gap-3 w-[250px] border-l border-theme-primary/20 pl-6">
                   <p className="text-[10px] text-zinc-500 mb-2 uppercase">Completion % per World</p>
                   {chartData.map((d, i) => (
                      <div key={i} className="w-full group">
                         <div className="flex justify-between font-mono text-[10px] text-zinc-400 mb-1">
                            <span>{d.label}</span>
                            <span className="text-theme-primary">{d.value}%</span>
                         </div>
                         <div className="w-full h-[2px] bg-zinc-900 border border-zinc-800 relative">
                            <div className="absolute top-0 left-0 h-full bg-theme-primary transition-all duration-1000 group-hover:shadow-[0_0_8px_rgba(var(--theme-primary),1)]" style={{ width: `${d.value}%` }}></div>
                         </div>
                      </div>
                   ))}
                 </div>
             </div>
          </div>

          {/* Secondary Live Area Graph */}
          <div className="glass-panel border-white/5 p-6 relative h-[250px] group">
              <div className="absolute top-4 left-4 text-theme-secondary font-mono text-[10px] tracking-widest">02 // ECHO CLONE ACTIVITY (LIVE)</div>
              <div className="absolute inset-0 pt-16 px-4 pb-4 w-full h-[250px]">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                     <polygon points={`0,100 ${areaPointsStr} 100,100`} className="fill-theme-secondary/10" />
                     <polyline points={areaPointsStr} className="fill-none stroke-theme-secondary stroke-[0.8] drop-shadow-[0_0_5px_rgba(var(--theme-secondary),0.8)]" vectorEffect="non-scaling-stroke" />
                  </svg>
              </div>
              <div className="absolute bottom-4 right-4 text-xs font-mono text-zinc-600 animate-pulse">RECORDING_</div>
          </div>

          {/* Tertiary Stability Bar Graph */}
          <div className="glass-panel border-white/5 p-6 relative h-[250px]">
              <div className="absolute top-4 left-4 text-white font-mono text-[10px] tracking-widest">03 // REFLEX & SURVIVAL SKILL</div>
              <div className="w-full h-full pt-16 flex items-end justify-between gap-4 px-2">
                 {[
                   { label: "AGI", value: Math.min(100, 30 + highestUnlockedLevel * 5) },
                   { label: "AWR", value: Math.min(100, 40 + highestUnlockedLevel * 4) },
                   { label: "PRC", value: Math.min(100, 20 + highestUnlockedLevel * 6) },
                   { label: "SRV", value: Math.min(100, 50 + highestUnlockedLevel * 3) },
                   { label: "SPD", value: Math.min(100, 35 + highestUnlockedLevel * 4.5) },
                   { label: "ADP", value: Math.min(100, 25 + highestUnlockedLevel * 5.5) }
                 ].map((stat, idx) => (
                    <div key={idx} className="relative w-full bg-zinc-900/50 rounded-t-sm group flex flex-col justify-end items-center" style={{ height: '100%' }}>
                        <div className="w-full bg-white transition-all duration-1000 group-hover:bg-theme-primary relative" style={{ height: `${stat.value}%` }}>
                           <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-mono text-theme-primary">{Math.floor(stat.value)}</div>
                        </div>
                        <span className="absolute -bottom-5 text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                    </div>
                 ))}
              </div>
          </div>

      </div>
    </div>
  );
};

export default ChartScreen;
