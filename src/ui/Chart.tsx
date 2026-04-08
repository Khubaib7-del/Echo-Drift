interface ChartScreenProps {
  highestUnlockedLevel: number;
}

const ChartScreen: React.FC<ChartScreenProps> = ({ highestUnlockedLevel }) => {
  // We have 11 total sectors (1-10 + Beta). Let's pick 5 core milestone sectors to display on the chart
  const calculateSectorProgress = (sectorId: number) => {
    const startLevel = (sectorId - 1) * 5;
    const completedLevels = Math.max(0, Math.min(5, highestUnlockedLevel - startLevel - 1));
    return Math.floor((completedLevels / 5) * 100);
  };

  const chartData = [
    { label: 'SECTOR_1', value: calculateSectorProgress(1) },
    { label: 'SECTOR_3', value: calculateSectorProgress(3) },
    { label: 'SECTOR_6', value: calculateSectorProgress(6) },
    { label: 'SECTOR_9', value: calculateSectorProgress(9) },
    { label: 'S_BETA', value: calculateSectorProgress(11) }
  ];

  return (
    <div className="w-full h-full flex flex-col p-12 overflow-y-auto animated-scrollbar">
      <div className="flex items-center gap-4 mb-12">
        <span className="material-symbols-outlined text-6xl text-theme-primary">bar_chart</span>
        <div>
          <h1 className="text-4xl font-headline font-black text-white uppercase tracking-widest">Performance Charts</h1>
          <p className="text-theme-primary/60 font-body">Telemetry and drift stabilization metrics</p>
        </div>
      </div>

      <div className="w-full max-w-4xl glass-panel border border-theme-primary/20 p-8 flex flex-col items-center">
        <h2 className="w-full text-left text-theme-primary font-headline uppercase tracking-widest text-sm mb-8 border-b border-theme-primary/20 pb-2">Sector Sync Analysis</h2>
        
        <div className="flex items-end justify-between w-full h-64 px-4 pb-8 border-b border-zinc-800 relative">
          {/* Horizontal Grid lines */}
          {[0, 25, 50, 75, 100].map(val => (
            <div key={val} className="absolute w-full border-t border-zinc-800/50 flex justify-between" style={{ bottom: `${val}%` }}>
              <span className="text-[10px] text-zinc-600 -translate-y-1/2 -translate-x-full pr-2">{val}%</span>
            </div>
          ))}

          {chartData.map((data, idx) => (
            <div key={idx} className="flex flex-col items-center group w-1/6 z-10 relative">
                {/* Value tooltip */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950 text-theme-primary text-xs py-1 px-3 border border-theme-primary/50 clip-slant font-black">
                  {data.value}%
                </div>
                {/* Bar */}
                <div className="w-full bg-zinc-800 flex items-end overflow-hidden">
                    <div 
                        className="w-full bg-theme-primary hover:bg-white transition-all group-hover:shadow-[0_0_15px_rgba(var(--theme-primary),0.8)] relative before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] before:opacity-20"
                        style={{ height: `${data.value}%` }}
                    ></div>
                </div>
                {/* Label */}
                <div className="mt-4 text-xs font-headline uppercase text-zinc-400 group-hover:text-theme-primary transition-colors tracking-widest font-bold">
                    {data.label}
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartScreen;
