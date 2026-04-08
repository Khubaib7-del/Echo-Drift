import React from 'react';

interface ChartScreenProps {
  highestUnlockedLevel: number;
}

const ChartScreen: React.FC<ChartScreenProps> = ({ highestUnlockedLevel }) => {
  // We have 11 total sectors (1-10 + Beta). Let's pick 7 milestone points
  const calculateSectorProgress = (sectorId: number) => {
    const startLevel = (sectorId - 1) * 5;
    const completedLevels = Math.max(0, Math.min(5, highestUnlockedLevel - startLevel - 1));
    return Math.floor((completedLevels / 5) * 100);
  };

  const chartData = [
    { label: 'ALPHA', value: calculateSectorProgress(1) },
    { label: 'S_02', value: calculateSectorProgress(2) },
    { label: 'S_04', value: calculateSectorProgress(4) },
    { label: 'S_06', value: calculateSectorProgress(6) },
    { label: 'S_08', value: calculateSectorProgress(8) },
    { label: 'S_10', value: calculateSectorProgress(10) },
    { label: 'BETA', value: calculateSectorProgress(11) }
  ];

  // Map values to 0-100 coordinates for SVG viewBox
  const points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * 100;
    const y = 100 - d.value; 
    return `${x},${y}`;
  }).join(' ');

  const areaPath = `0,100 ${points} 100,100`;

  return (
    <div className="w-full h-full flex flex-col p-12 overflow-y-auto animated-scrollbar">
      <div className="flex items-center gap-4 mb-12">
        <span className="material-symbols-outlined text-6xl text-theme-primary">bar_chart</span>
        <div>
          <h1 className="text-4xl font-headline font-black text-white uppercase tracking-widest">Performance Charts</h1>
          <p className="text-theme-primary/60 font-body">Telemetry and drift stabilization metrics</p>
        </div>
      </div>

      <div className="w-full max-w-5xl glass-panel border border-theme-primary/20 p-8 flex flex-col items-center relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-theme-primary/5 blur-3xl pointer-events-none"></div>

        <h2 className="w-full text-left text-theme-primary font-headline uppercase tracking-widest text-sm mb-12 border-b border-theme-primary/20 pb-2 flex justify-between">
            <span>Sector Sync Analysis</span>
            <span className="text-zinc-500 font-mono tracking-tighter">DATA: LIVE</span>
        </h2>
        
        <div className="w-full h-80 relative font-mono text-[10px] uppercase">
          {/* Y-Axis Labels & Grid Lines */}
          {[0, 25, 50, 75, 100].map(val => (
            <div key={val} className="absolute w-full border-t border-zinc-800/80 flex justify-between z-0" style={{ bottom: `${val}%` }}>
              <span className="text-zinc-500 -translate-y-1/2 -translate-x-12 absolute left-0 text-right w-8">{val}%</span>
            </div>
          ))}

          {/* Core SVG Chart */}
          <div className="absolute inset-0 z-10">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                {/* Area under line */}
                <polygon points={areaPath} className="fill-theme-primary/20" />
                {/* Main line */}
                <polyline points={points} className="fill-none stroke-theme-primary stroke-[0.5] drop-shadow-[0_0_5px_rgba(var(--theme-primary),1)]" vectorEffect="non-scaling-stroke" />
                
                {/* Data Points */}
                {chartData.map((d, i) => {
                    const x = (i / (chartData.length - 1)) * 100;
                    const y = 100 - d.value;
                    return (
                       <g key={i} className="group cursor-crosshair">
                           <line x1={x} y1="100" x2={x} y2={y} className="stroke-theme-primary/30 stroke-[0.2] stroke-dasharray-[1,1]" vectorEffect="non-scaling-stroke"/>
                           <circle cx={x} cy={y} r="1.5" className="fill-theme-secondary group-hover:fill-white group-hover:r-2 transition-all shadow-[0_0_10px_rgba(var(--theme-secondary),1)]" />
                       </g>
                    );
                })}
            </svg>
          </div>

          {/* X-Axis Labels */}
          <div className="absolute top-[100%] left-0 w-full flex justify-between pt-4 text-theme-primary/70 tracking-widest z-20 font-bold">
            {chartData.map((d, i) => (
              <div key={i} className="-translate-x-1/2 flex flex-col items-center gap-2 group cursor-default">
                 <span className="w-1 h-3 bg-zinc-800 group-hover:bg-theme-secondary transition-colors"></span>
                 <span className="group-hover:text-white transition-colors">{d.label}</span>
                 <span className="text-zinc-600 font-normal">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartScreen;
