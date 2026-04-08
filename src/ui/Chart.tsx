const ChartScreen = () => {
  const chartData = [
    { label: 'ALPHA', value: 85 },
    { label: 'BETA', value: 62 },
    { label: 'GAMMA', value: 94 },
    { label: 'DELTA', value: 45 },
    { label: 'OMEGA', value: 78 }
  ];

  return (
    <div className="w-full h-full flex flex-col p-12 overflow-y-auto animated-scrollbar">
      <div className="flex items-center gap-4 mb-12">
        <span className="material-symbols-outlined text-6xl text-cyan-400">bar_chart</span>
        <div>
          <h1 className="text-4xl font-headline font-black text-white uppercase tracking-widest">Performance Charts</h1>
          <p className="text-cyan-400/60 font-body">Telemetry and drift stabilization metrics</p>
        </div>
      </div>

      <div className="w-full max-w-4xl glass-panel border border-cyan-500/20 p-8 flex flex-col items-center">
        <h2 className="w-full text-left text-cyan-400 font-headline uppercase tracking-widest text-sm mb-8 border-b border-cyan-400/20 pb-2">Sector Sync Analysis</h2>
        
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
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-950 text-cyan-400 text-xs py-1 px-3 border border-cyan-400/50 clip-slant font-black">
                  {data.value}%
                </div>
                {/* Bar */}
                <div className="w-full bg-zinc-800 flex items-end overflow-hidden">
                    <div 
                        className="w-full bg-gradient-to-t from-cyan-900 to-cyan-400 hover:to-white transition-all group-hover:shadow-[0_0_15px_#00F0FF] relative before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] before:opacity-20"
                        style={{ height: `${data.value}%` }}
                    ></div>
                </div>
                {/* Label */}
                <div className="mt-4 text-xs font-headline uppercase text-zinc-400 group-hover:text-cyan-400 transition-colors tracking-widest font-bold">
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
