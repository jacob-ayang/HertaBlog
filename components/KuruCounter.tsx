import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Zap, Pause, Play } from 'lucide-react';

const KuruCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [autoSpin, setAutoSpin] = useState(false);
  const [speedLevel, setSpeedLevel] = useState(1);
  const autoSpinRef = useRef<number | null>(null);

  // Manual Click
  const handleClick = () => {
    setCount(c => c + 1);
    triggerVisualEffect();
  };

  const triggerVisualEffect = () => {
    // Add temporary class or logic for visual pop (simplified for React state)
    const element = document.getElementById('kuru-circle');
    if(element) {
        element.style.transform = `rotate(${Math.random() * 360}deg) scale(1.1)`;
        setTimeout(() => {
            element.style.transform = `rotate(0deg) scale(1)`;
        }, 100);
    }
  };

  // Auto Spin Logic
  useEffect(() => {
    if (autoSpin) {
        const intervalTime = Math.max(50, 1000 / (speedLevel * 2)); // Faster as speed increases
        autoSpinRef.current = window.setInterval(() => {
            setCount(c => c + speedLevel);
        }, intervalTime);
    } else {
        if (autoSpinRef.current !== null) window.clearInterval(autoSpinRef.current);
    }
    return () => {
        if (autoSpinRef.current !== null) window.clearInterval(autoSpinRef.current);
    };
  }, [autoSpin, speedLevel]);

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      <div className="glass-panel p-8 rounded-2xl w-full flex flex-col items-center relative overflow-hidden">
        
        {/* Speed Badge */}
        <div className="absolute top-4 right-4 bg-purple-900/50 border border-purple-500/50 rounded px-2 py-1 text-xs font-bold text-herta-gold flex items-center gap-1">
            <Zap className="w-3 h-3" />
            SPEED x{speedLevel}
        </div>

        <h3 className="text-2xl font-bold text-herta-glow mb-8 tech-font tracking-widest">
          KURU KURU
        </h3>
        
        {/* The Herta (Abstract Representation) */}
        <div 
            className="relative mb-8 cursor-pointer group" 
            onClick={handleClick}
        >
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse-glow"></div>
            <div 
                id="kuru-circle"
                className={`
                    w-48 h-48 rounded-full border-[6px] border-herta-accent 
                    flex items-center justify-center bg-gradient-to-br from-herta-base to-black
                    shadow-[0_0_40px_rgba(168,85,247,0.6)]
                    transition-all duration-100 relative z-10
                    ${autoSpin ? 'animate-spin' : ''}
                `}
                style={{ animationDuration: `${2 / speedLevel}s` }}
            >
                {/* Inner Details simulating a character/puppet */}
                <div className="w-32 h-32 border border-purple-400/30 rounded-full flex items-center justify-center">
                    <div className="text-6xl select-none transform transition-transform group-hover:scale-110 group-active:scale-90">
                        🔨
                    </div>
                </div>
                
                {/* Orbiting particles */}
                <div className="absolute w-full h-full animate-spin-reverse">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-herta-gold rounded-full shadow-[0_0_10px_#fbbf24]"></div>
                </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-dashed border-purple-500/20 rounded-full animate-spin-slow pointer-events-none"></div>
        </div>

        <div className="flex flex-col items-center mb-8">
            <span className="text-purple-300 text-sm uppercase tracking-widest mb-1">Total Rotations</span>
            <span className="text-5xl font-mono text-white font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-purple-400">
                {count.toLocaleString()}
            </span>
        </div>

        {/* Controls */}
        <div className="flex gap-4 w-full">
            <button 
                onClick={() => setAutoSpin(!autoSpin)}
                className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                    autoSpin 
                    ? 'bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30' 
                    : 'bg-herta-accent border border-purple-400 text-white hover:bg-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                }`}
            >
                {autoSpin ? <><Pause className="w-4 h-4" /> STOP</> : <><Play className="w-4 h-4" /> AUTO-SPIN</>}
            </button>

            <button 
                onClick={() => setSpeedLevel(s => Math.min(s + 1, 10))}
                disabled={speedLevel >= 10}
                className="px-4 py-3 rounded-lg bg-purple-900/40 border border-purple-500/40 text-purple-300 font-bold hover:bg-purple-900/60 disabled:opacity-50 transition-all"
            >
                + SPD
            </button>
        </div>
        
        <p className="mt-4 text-xs text-purple-400/50 text-center">
            * Warning: Excessive rotation may cause dizziness in puppets.
        </p>
      </div>
    </div>
  );
};

export default KuruCounter;