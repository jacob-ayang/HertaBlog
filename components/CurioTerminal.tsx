import React, { useState, useEffect } from 'react';
import { generateRandomCurio, getSettings, saveSettings } from '../services/geminiService';
import { Curio, ChatSettings } from '../types';
import { Sparkles, RefreshCw, Triangle, Hexagon, Settings, Save, Key, Bot } from 'lucide-react';

const CurioTerminal: React.FC = () => {
    const [curio, setCurio] = useState<Curio | null>(null);
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [needsConfig, setNeedsConfig] = useState(false);

    useEffect(() => {
        const settings = getSettings();
        if (settings.apiKey) {
            setApiKey(settings.apiKey);
        } else {
            setNeedsConfig(true);
        }
    }, []);

    const handleSaveKey = () => {
        const current = getSettings();
        saveSettings({ ...current, apiKey });
        setNeedsConfig(false);
        // Automatically trigger generation after saving if it was empty
        if (!curio) handleGenerate();
    };

    const handleGenerate = async () => {
        setLoading(true);
        const newCurio = await generateRandomCurio();
        setCurio(newCurio);
        
        if (newCurio.type === 'Error' && (newCurio.description.includes("API Key"))) {
            setNeedsConfig(true);
        }
        
        setLoading(false);
    };

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'Legendary': return 'text-yellow-400 border-yellow-500/50 shadow-yellow-500/20';
            case 'Rare': return 'text-blue-400 border-blue-500/50 shadow-blue-500/20';
            case 'Error': return 'text-red-400 border-red-500/50 shadow-red-500/20';
            default: return 'text-gray-300 border-gray-500/50 shadow-gray-500/10';
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto min-h-[500px] flex flex-col items-center">
            <div className="w-full glass-panel rounded-2xl p-8 relative overflow-hidden group">
                {/* Background Tech UI */}
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Hexagon className="w-32 h-32 text-purple-500 animate-spin-slow" />
                </div>
                
                <h2 className="text-2xl font-bold text-herta-glow tech-font mb-6 flex items-center gap-3">
                    <Triangle className="w-6 h-6 rotate-180 text-herta-accent" fill="currentColor" />
                    SIMULATED UNIVERSE TERMINAL
                </h2>

                <p className="text-purple-200/70 mb-8 font-light">
                    Extrapolate new data from the Ether. Generate random Curios or Blessings approved by Nous.
                </p>

                {/* Display Area */}
                <div className="min-h-[250px] flex items-center justify-center mb-8 relative">
                    {loading ? (
                        <div className="flex flex-col items-center gap-4 animate-pulse">
                            <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
                            <span className="text-purple-300 tech-font tracking-widest">CALCULATING PROBABILITIES...</span>
                        </div>
                    ) : needsConfig ? (
                        <div className="w-full bg-black/60 border border-red-500/30 p-6 rounded-xl flex flex-col items-center text-center animate-in fade-in">
                            <Settings className="w-12 h-12 text-red-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">CONFIGURATION REQUIRED</h3>
                            <p className="text-sm text-purple-300 mb-6">Access to the Simulated Universe requires a valid API Key.</p>
                            
                            <div className="w-full max-w-sm space-y-3">
                                <div className="relative">
                                    <Key className="absolute left-3 top-2.5 w-4 h-4 text-purple-500" />
                                    <input 
                                        type="password" 
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        placeholder="Enter API Key (sk-...)"
                                        className="w-full bg-black/50 border border-purple-500/30 rounded p-2 pl-9 text-sm text-white focus:border-herta-accent outline-none font-mono"
                                    />
                                </div>
                                <button 
                                    onClick={handleSaveKey}
                                    className="w-full bg-herta-accent hover:bg-purple-500 text-white font-bold py-2 rounded flex items-center justify-center gap-2 transition-all"
                                >
                                    <Save className="w-4 h-4" /> SAVE & CONNECT
                                </button>
                            </div>
                        </div>
                    ) : curio ? (
                        <div className={`w-full bg-black/40 border p-6 rounded-xl transition-all duration-500 animate-float ${getRarityColor(curio.rarity)}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase bg-white/10 ${curio.rarity === 'Legendary' ? 'text-yellow-400' : curio.type === 'Error' ? 'text-red-400' : 'text-purple-300'}`}>
                                        {curio.type} // {curio.rarity}
                                    </span>
                                    <h3 className="text-3xl font-bold mt-2 text-white font-serif">{curio.name}</h3>
                                </div>
                                {curio.type !== 'Error' && <Sparkles className={`w-8 h-8 ${curio.rarity === 'Legendary' ? 'text-yellow-400' : 'text-purple-400'}`} />}
                            </div>
                            
                            <p className="text-gray-300 italic mb-4 border-l-2 border-purple-500/30 pl-3 break-words">
                                "{curio.description}"
                            </p>
                            
                            <div className="bg-purple-900/20 p-3 rounded mb-4">
                                <span className="text-purple-300 font-bold text-sm block mb-1">EFFECT</span>
                                <p className="text-white text-sm">{curio.effect}</p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/10 flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0 border border-purple-300 overflow-hidden">
                                     <span className="text-xl">🤖</span>
                                </div>
                                <p className="text-purple-200 text-sm italic">
                                    <span className="font-bold text-herta-accent not-italic">Herta: </span>
                                    "{curio.herta_comment}"
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-purple-500/50 border-2 border-dashed border-purple-500/20 rounded-xl p-10 w-full">
                            NO DATA LOADED
                        </div>
                    )}
                </div>

                {!needsConfig && (
                    <button 
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full group relative overflow-hidden bg-herta-accent hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
                        <span className="flex items-center justify-center gap-2 relative z-10 tech-font tracking-wider">
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                            {loading ? 'COMPUTING...' : 'EXTRAPOLATE REALITY'}
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default CurioTerminal;