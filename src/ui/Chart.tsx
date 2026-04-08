import React from 'react';

interface ChartScreenProps {
  highestUnlockedLevel: number;
}

const ChartScreen: React.FC<ChartScreenProps> = ({ highestUnlockedLevel }) => {
  // We have 11 total sectors (1-10 + Beta). Let's pick 6 core metrics
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
  // Radar radius
  const R = 40;
  const center = 50;

  // Generate SVG path for the radar area
  const radarPoints = chartData.map((d, i) => {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    const r = (d.value / 100) * R;
    const x = center + Math.cos(angle) * r;
    const y = center + Math.sin(angle) * r;
    return `${x},${y}`;
  }).join(' ');

  // Generate grid rings
  const ringPercentages = [25, 50, 75, 100];
  const rings = ringPercentages.map(pct => {
    return Array.from({ length: sides }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
        const r = (pct / 100) * R;
        const x = center + Math.cos(angle) * r;
        const y = center + Math.sin(angle) * r;
        return `${x},${y}`;
    }).join(' ');
  });

  return (
    <div className="w-full h-full flex flex-col p-12 overflow-y-auto animated-scrollbar">
      <div className="flex items-center gap-4 mb-8">
        <span className="material-symbols-outlined text-6xl text-theme-primary">radar</span>
        <div>
          <h1 className="text-4xl font-headline font-black text-white uppercase tracking-widest">Temporal Diagnostics</h1>
          <p className="text-theme-primary/60 font-body">Node synchronization radar telemetry</p>
        </div>
      </div>

      <div className="w-full flex-1 glass-panel border border-theme-primary/20 p-8 flex lg:flex-row flex-col gap-12 items-center justify-center relative min-h-[500px]">
        {/* Radar SVG Container */}
        <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center z-10">
            {/* Spinning background elements */}
            <div className="absolute inset-0 border border-theme-primary/10 rounded-full animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute inset-[10%] border-t border-r border-theme-secondary/20 rounded-full animate-[spin_40s_linear_reverse_infinite]"></div>
            
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(var(--theme-primary),0.5)]">
               
               {/* Background web/grid */}
               {rings.map((pts, idx) => (
                  <polygon key={idx} points={pts} className="fill-none stroke-zinc-800 stroke-[0.3]" strokeDasharray={idx === 3 ? "" : "1,1"} />
               ))}

               {/* Axis Lines */}
               {Array.from({ length: sides }).map((_, i) => {
                  const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
                  const x = center + Math.cos(angle) * R;
                  const y = center + Math.sin(angle) * R;
                  return <line key={`line-${i}`} x1={center} y1={center} x2={x} y2={y} className="stroke-zinc-700 stroke-[0.2]" />
               })}

               {/* Data Area */}
               <polygon points={radarPoints} className="fill-theme-primary/20 stroke-theme-primary stroke-[0.5] transition-all duration-1000" />

               {/* Hover Points & Labels */}
               {chartData.map((d, i) => {
                  const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
                  const r = (d.value / 100) * R;
                  const px = center + Math.cos(angle) * r;
                  const py = center + Math.sin(angle) * r;

                  const textR = R + 8;
                  const tx = center + Math.cos(angle) * textR;
                  const ty = center + Math.sin(angle) * textR;

                  return (
                      <g key={i} className="group">
                         <circle cx={px} cy={py} r="1.5" className="fill-white drop-shadow-[0_0_5px_rgba(255,255,255,1)] transition-all" />
                         <text x={tx} y={ty} dominantBaseline="middle" textAnchor="middle" className="text-[3px] font-mono fill-zinc-500 uppercase group-hover:fill-theme-primary transition-colors">{d.label}</text>
                      </g>
                  )
               })}
            </svg>
        </div>

        {/* Legend / Readout */}
        <div className="flex flex-col gap-4 z-10 w-full max-w-[300px]">
           <h3 className="font-headline text-theme-primary uppercase tracking-widest border-b border-theme-primary/30 pb-2 mb-2 flex justify-between">
              <span>Sector Integrity</span>
              <span className="material-symbols-outlined text-[16px] animate-pulse">sensors</span>
           </h3>
           
           {chartData.map((d, i) => (
              <div key={i} className="flex justify-between items-center group cursor-default">
                 <span className="font-mono text-xs text-zinc-400 group-hover:text-white transition-colors">{d.label}</span>
                 <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-theme-primary font-bold">{d.value}%</span>
                    <div className="w-16 h-1 bg-zinc-900 border border-zinc-800 relative overflow-hidden">
                       <div className="absolute top-0 left-0 h-full bg-theme-primary group-hover:bg-white transition-all duration-1000" style={{ width: `${d.value}%` }}></div>
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ChartScreen;
