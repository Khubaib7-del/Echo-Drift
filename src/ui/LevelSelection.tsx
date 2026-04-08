import React, { useState } from 'react';
import { Tooltip } from './Tooltip';

interface LevelSelectionProps {
  highestUnlockedLevel: number;
  onSelectLevel: (levelIndex: number) => void;
  onBack: () => void;
  onToggleSettings: () => void;
}

const SECTOR_DATA = [
  { id: 1, name: 'SECTOR 1: ORIGIN', levels: 5, description: 'The initiation sequence. Recover basic traversal mechanics.', reward: 'Dash Protocol' },
  { id: 2, name: 'SECTOR 2: ECHO BRIDGE', levels: 5, description: 'Crossing the temporal divide. Beware of phase shifts.', reward: 'Phase Shifter' },
  { id: 3, name: 'SECTOR 3: THE FRACTURE', levels: 5, description: 'A broken reality where timeline geometry is unstable.', reward: 'Sync Booster' },
  { id: 4, name: 'SECTOR 4: NEON INCURSION', levels: 5, description: 'High speed processing required. Minimum latency.', reward: 'Overclock' },
  { id: 5, name: 'SECTOR 5: DATALAKES', levels: 5, description: 'Deep memory sectors. Floatation algorithms engaged.', reward: 'Memory Decryptor' },
  { id: 6, name: 'SECTOR 6: THE VOID', levels: 5, description: 'Null space tracking. No active boundaries detected.', reward: 'Void Scanner' },
  { id: 7, name: 'SECTOR 7: REDUX', levels: 5, description: 'Previously unstable loops now accelerating exponentially.', reward: 'Loop Breaker' },
  { id: 8, name: 'SECTOR 8: KINETIC', levels: 5, description: 'Constant motion required. Stopping equals timeline deletion.', reward: 'Kinetic Shield' },
  { id: 9, name: 'SECTOR 9: PARADOX', levels: 5, description: 'Contradictory geometry. Trust your instruments, not your eyes.', reward: 'Paradox Resolver' },
  { id: 10, name: 'SECTOR 10: APEX', levels: 5, description: 'The final Alpha quadrant. Peak chronal distortion.', reward: 'Alpha Key' },
  { id: 11, name: 'SECTOR BETA: ANOMALY', levels: 5, description: 'Experimental timeline branch. Extreme volatility.', reward: 'Beta Access' },
];

const LevelSelection: React.FC<LevelSelectionProps> = ({ highestUnlockedLevel, onSelectLevel, onBack, onToggleSettings }) => {
  const [selectedSectorId, setSelectedSectorId] = useState<number>(() => {
     // Default to the sector of their highest unlocked level
     const sec = Math.ceil(highestUnlockedLevel / 5);
     return Math.min(Math.max(sec, 1), 11);
  });

  const selectedSector = SECTOR_DATA.find(s => s.id === selectedSectorId) || SECTOR_DATA[0];

  const getSectorStatus = (sectorId: number) => {
    const firstLevelOfSector = (sectorId - 1) * 5 + 1;
    const lastLevelOfSector = sectorId * 5;
    if (highestUnlockedLevel < firstLevelOfSector) return 'LOCKED';
    if (highestUnlockedLevel > lastLevelOfSector) return 'COMPLETED';
    return 'IN_PROGRESS';
  };

  const getSectorProgress = (sectorId: number) => {
    const start = (sectorId - 1) * 5;
    const completedInSector = Math.max(0, Math.min(5, highestUnlockedLevel - start - 1));
    return (completedInSector / 5) * 100;
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-auto bg-theme-bg/90 backdrop-blur-md overflow-hidden font-body">
      
      {/* Shared Header Component */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-transparent text-white pointer-events-none">
        <div className="text-2xl font-black italic text-theme-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] font-headline uppercase tracking-[0.1em] pointer-events-auto">
          ECHO DRIFT
        </div>
        <div className="flex gap-6 pointer-events-auto">
          <Tooltip content="System Calibration" position="bottom">
            <button 
              onClick={onToggleSettings}
              className="hover:bg-theme-primary/10 hover:skew-x-[-12deg] transition-all p-2 group"
            >
              <span className="material-symbols-outlined text-theme-primary">settings</span>
            </button>
          </Tooltip>
        </div>
      </header>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="w-full h-full border-[0.5px] border-theme-primary/20 grid grid-cols-6 grid-rows-6">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="border-[0.5px] border-theme-primary/10"></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="w-full max-w-7xl mt-20 mb-6 flex justify-between items-end relative z-10 px-4 shrink-0">
        <div>
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter uppercase text-white leading-none">
            TEMPORAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary">SECTORS</span>
          </h2>
          <div className="flex items-center gap-4 mt-2">
            <span className="w-8 h-[1px] bg-theme-primary"></span>
            <span className="text-xs font-headline uppercase tracking-widest text-theme-primary/60">Select macro-region for timeline synchronization</span>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="text-sm font-headline uppercase text-zinc-500 hover:text-theme-primary transition-colors flex items-center gap-2 border border-white/5 bg-black/20 px-4 py-2"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          ABORT
        </button>
      </div>

      <div className="w-full max-w-7xl flex-1 relative z-10 px-4 pb-12 flex flex-col lg:flex-row gap-6 overflow-hidden">
        
        {/* Main Sectors List (With Scrollbar) */}
        <div className="flex-1 overflow-y-auto animated-scrollbar pr-4 pb-8 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SECTOR_DATA.map((sector) => {
                const status = getSectorStatus(sector.id);
                const progress = getSectorProgress(sector.id);
                const isSelected = selectedSectorId === sector.id;

                return (
                  <button
                      key={sector.id}
                      onClick={() => {
                        if (isSelected && status !== 'LOCKED') {
                          // Quick launch highest unlocked level in this sector
                          const firstLevel = (sector.id - 1) * 5 + 1;
                          const highestInSector = Math.max(firstLevel, Math.min(firstLevel + 4, highestUnlockedLevel));
                          onSelectLevel(highestInSector);
                        } else {
                          setSelectedSectorId(sector.id);
                        }
                      }}
                      className={`
                      relative flex flex-col items-start p-5 transition-all duration-300 group/card text-left border
                      ${status !== 'LOCKED' ? `cursor-pointer hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(var(--theme-primary),0.1)] ${isSelected ? 'animate-pulse-soft' : ''}` : 'opacity-50 cursor-not-allowed grayscale bg-black/40'}
                      ${isSelected ? 'border-theme-primary bg-theme-primary/10' : 'border-white/10 bg-surface-container-high/80 hover:border-theme-primary/50'}
                      backdrop-blur clip-slant-rev
                      `}
                  >
                      <div className="flex justify-between w-full items-start mb-3">
                        <div className={`w-10 h-10 border flex items-center justify-center transition-colors ${isSelected ? 'bg-theme-primary border-theme-primary text-black' : 'border-white/10 text-white group-hover/card:border-theme-primary'}`}>
                          {status !== 'LOCKED' ? (
                            <span className="font-headline text-lg font-black">{sector.id.toString().padStart(2, '0')}</span>
                          ) : (
                            <span className="material-symbols-outlined text-zinc-500 text-sm">lock</span>
                          )}
                        </div>
                        {status === 'COMPLETED' && (
                          <div className="text-[10px] text-theme-primary border border-theme-primary/40 px-2 py-0.5 uppercase tracking-widest font-headline">100% CLEAR</div>
                        )}
                        {status === 'IN_PROGRESS' && (
                          <div className="text-[10px] text-theme-secondary border border-theme-secondary/40 px-2 py-0.5 uppercase tracking-widest font-headline text-center">ACTIVE<br/><span className="text-[8px] tracking-normal text-zinc-400">({progress}%)</span></div>
                        )}
                      </div>
                      
                      <div className="w-full flex justify-between items-center mb-1">
                        <h3 className={`text-sm md:text-base font-black font-headline uppercase transition-colors ${isSelected ? 'text-theme-primary' : 'text-white'}`}>
                          {sector.name}
                        </h3>
                        {isSelected && status !== 'LOCKED' && (
                          <span className="text-[9px] font-headline bg-theme-primary text-black px-1.5 py-0.5 uppercase tracking-widest opacity-80 shadow-[0_0_8px_rgba(var(--theme-primary),0.5)]">LAUNCH</span>
                        )}
                      </div>
                      
                      {status !== 'LOCKED' ? (
                        <div className="w-full mt-4">
                          <div className="flex justify-between text-[10px] font-headline text-zinc-400 mb-1">
                            <span>RECOVERY PROGRESS</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full h-1 bg-black overflow-hidden">
                            <div className="h-full bg-theme-primary transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full mt-4 text-[10px] font-headline text-red-500 uppercase tracking-widest">
                          [ ENCRYPTED / UNAVAILABLE ]
                        </div>
                      )}
                  </button>
                )
              })}
          </div>
        </div>

        {/* Side Panel Guide - Fully Populated */}
        <aside className="w-full lg:w-96 shrink-0 h-full flex flex-col order-first lg:order-none lg:h-auto max-h-[40vh] lg:max-h-none overflow-y-auto animated-scrollbar">
           <div className="w-full glass-panel border border-theme-primary/30 p-6 flex-1 flex flex-col items-start bg-black/60 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-theme-primary/5 blur-3xl rounded-full pointer-events-none"></div>

              <div className="w-full flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-theme-primary flex items-center justify-center bg-theme-primary/10">
                   <span className="material-symbols-outlined text-theme-primary font-variation-[FILL_1]">map</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase font-headline text-zinc-500">SELECTED ARCHIVE</span>
                  <span className="block text-sm font-headline text-theme-primary uppercase">{selectedSector.name.split(':')[0]}</span>
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-headline font-black text-white uppercase tracking-wider mb-2 leading-tight">
                {selectedSector.name.split(': ')[1]}
              </h3>
              
              <p className="text-zinc-400 font-body text-xs md:text-sm leading-relaxed mb-6">
                {selectedSector.description}
              </p>
              
              {/* Sector Stats & Rewards */}
              <div className="w-full grid grid-cols-2 gap-3 mb-6">
                <div className="border border-white/5 bg-white/5 p-3">
                  <span className="block text-[9px] text-zinc-500 font-headline uppercase mb-1">Total Nodes</span>
                  <span className="text-lg font-headline font-bold text-white">{selectedSector.levels}</span>
                </div>
                <div className="border border-theme-secondary/20 bg-theme-secondary/5 p-3">
                  <span className="block text-[9px] text-theme-secondary/70 font-headline uppercase mb-1">Sector Reward</span>
                  <span className="text-[11px] font-headline font-bold text-theme-secondary uppercase">{selectedSector.reward}</span>
                </div>
              </div>

              {/* Levels List */}
              <div className="w-full space-y-2 mt-auto pb-4">
                <h4 className="text-[10px] font-headline text-theme-primary uppercase border-b border-theme-primary/20 pb-2 mb-3">Accessible Temporal Nodes</h4>
                
                {Array.from({ length: selectedSector.levels }).map((_, i) => {
                  const absoluteLevelId = (selectedSector.id - 1) * 5 + (i + 1);
                  const isUnlocked = absoluteLevelId <= highestUnlockedLevel;
                  const isCompleted = absoluteLevelId < highestUnlockedLevel;
                  
                  return (
                    <button
                      key={i}
                      disabled={!isUnlocked}
                      onClick={() => onSelectLevel(absoluteLevelId)}
                      className={`
                        w-full flex items-center justify-between p-3 border transition-all text-left group
                        ${isUnlocked ? 'border-white/10 hover:border-theme-primary bg-black/40 hover:bg-theme-primary/10 cursor-pointer' : 'border-transparent bg-white/5 opacity-50 cursor-not-allowed'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-headline font-bold w-6 ${isUnlocked ? 'text-theme-primary' : 'text-zinc-600'}`}>
                          {(i+1).toString().padStart(2, '0')}
                        </span>
                        <span className={`text-xs uppercase font-headline ${isUnlocked ? 'text-white' : 'text-zinc-600'}`}>
                          Node {absoluteLevelId}
                        </span>
                      </div>
                      
                      {isCompleted ? (
                        <span className="material-symbols-outlined text-[16px] text-theme-secondary font-variation-[FILL_1]">check_circle</span>
                      ) : isUnlocked ? (
                        <span className="text-[9px] bg-theme-primary text-black px-2 py-0.5 uppercase font-headline opacity-0 group-hover:opacity-100 transition-opacity">Launch</span>
                      ) : (
                        <span className="material-symbols-outlined text-[14px] text-red-500/50">lock</span>
                      )}
                    </button>
                  );
                })}
              </div>

           </div>
        </aside>
      </div>
    </div>
  );
};

export default LevelSelection;
