const ChartScreen = () => (
  <div className="w-full h-full flex flex-col items-center justify-center p-12">
    <span className="material-symbols-outlined text-8xl text-cyan-400 mb-6">bar_chart</span>
    <h1 className="text-4xl font-headline font-black text-white uppercase tracking-widest mb-4">Performance Charts</h1>
    <p className="text-cyan-400/60 font-body text-center max-w-lg">
      Drift telemetry and mission metrics are currently offline. Calibrate your Echo first.
    </p>
  </div>
);

export default ChartScreen;
