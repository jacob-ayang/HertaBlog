import React, { useState } from 'react';
import { Hexagon, Sparkles, Database, BrainCircuit, Star, ArrowRight, Share2, History, Users, Sword, Shield, Zap, Target, Scroll, Book, Quote, Crown } from 'lucide-react';

type WikiTab = 'overview' | 'combat' | 'eidolons' | 'archive';

const HertaWiki: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WikiTab>('overview');

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in-up pb-12">
      
      {/* Hero / Header Section */}
      <div className="spotlight-card rounded-2xl p-8 mb-8 border-l-4 border-l-herta-gold flex flex-col md:flex-row gap-8 items-center relative overflow-hidden bg-herta-dark/80">
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-herta-gold/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative group shrink-0">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-herta-gold p-1 relative overflow-hidden bg-black/50 shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(251,191,36,0.6)]">
             <div className="w-full h-full rounded-full bg-gradient-to-b from-purple-900 to-black flex items-center justify-center overflow-hidden relative">
                {/* Image Avatar */}
                <img 
                    src="https://s3.bmp.ovh/imgs/2026/01/08/f58c842bd680bbd1.png" 
                    alt="The Herta" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                {/* Simulated Hologram Effect Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
             </div>
             <div className="absolute inset-0 border border-dashed border-herta-gold/60 rounded-full animate-spin-slow pointer-events-none"></div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-herta-gold text-black font-bold px-3 py-1 rounded-full text-xs tech-font border border-white shadow-lg flex items-center gap-1">
            <Crown className="w-3 h-3" /> EMANATOR
          </div>
        </div>

        <div className="content-z flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
            {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-5 h-5 text-herta-gold fill-herta-gold" />
            ))}
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white tech-font tracking-tight mb-2 group cursor-default">
            THE HERTA <span className="text-herta-gold text-lg font-normal tracking-widest opacity-80 group-hover:opacity-100 transition-opacity ml-2">大黑塔</span>
          </h2>
          
          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
             <span className="px-3 py-1 bg-blue-900/40 border border-blue-400/30 rounded text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2">
                <Hexagon className="w-3 h-3" /> Ice
             </span>
             <span className="px-3 py-1 bg-purple-900/40 border border-purple-400/30 rounded text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                <BrainCircuit className="w-3 h-3" /> Erudition
             </span>
             <span className="px-3 py-1 bg-yellow-900/40 border border-yellow-400/30 rounded text-xs font-bold text-yellow-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> Genius Society #83
             </span>
          </div>

          <p className="text-purple-200/80 leading-relaxed font-light max-w-2xl italic border-l-2 border-herta-gold/50 pl-4">
            "You thought the puppet was all I had? How quaint. Witness the true prowess of an Emanator of Erudition. Try not to blink; you might miss the solution to the universe."
          </p>
        </div>
      </div>

      {/* Wiki Navigation - Scrollable on Mobile */}
      <div className="flex overflow-x-auto md:overflow-visible pb-2 md:pb-0 items-center gap-4 mb-8 border-b border-purple-500/20 no-scrollbar">
        {[
            { id: 'overview', icon: Database, label: 'Overview' },
            { id: 'combat', icon: Sword, label: 'Emanator Protocols' },
            { id: 'eidolons', icon: Target, label: 'True Eidolons' },
            { id: 'archive', icon: Book, label: 'True Records' },
        ].map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as WikiTab)}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold tech-font tracking-wide transition-all duration-300 border-b-2 whitespace-nowrap shrink-0 ${
                    activeTab === tab.id 
                    ? 'bg-herta-gold/10 text-herta-gold border-herta-gold' 
                    : 'text-purple-400 border-transparent hover:text-white hover:bg-white/5'
                }`}
            >
                <tab.icon className="w-4 h-4" />
                {tab.label.toUpperCase()}
            </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        
        {/* === OVERVIEW TAB === */}
        {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Left Column: Stats */}
                <div className="md:col-span-8 space-y-6">
                    <div className="spotlight-card rounded-xl p-6 border-herta-gold/20">
                        <h3 className="text-xl font-bold tech-font text-white mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-herta-gold" /> EMANATOR PROFILE
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-sm">
                            <div>
                                <span className="block text-purple-400 text-xs font-mono uppercase mb-1">True Identity</span>
                                <span className="text-white font-bold">Madam Herta (True Form)</span>
                            </div>
                            <div>
                                <span className="block text-purple-400 text-xs font-mono uppercase mb-1">Rarity</span>
                                <span className="text-white font-bold flex text-herta-gold">
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                </span>
                            </div>
                            <div>
                                <span className="block text-purple-400 text-xs font-mono uppercase mb-1">Gaze</span>
                                <span className="text-white font-bold">Nous The Erudition</span>
                            </div>
                            <div>
                                <span className="block text-purple-400 text-xs font-mono uppercase mb-1">Status</span>
                                <span className="text-white font-bold text-herta-gold glow">Active Emanator</span>
                            </div>
                            <div className="md:col-span-2">
                                <span className="block text-purple-400 text-xs font-mono uppercase mb-1">Description</span>
                                <p className="text-purple-100/80 leading-relaxed">
                                    The true form of Genius Society Member #83. Unlike her puppets, "The Herta" wields the direct power of the Erudition. She perceives the universe as a series of solvable equations. Her presence alone is enough to distort reality within the Simulated Universe. She is elegant, terrifyingly intelligent, and utterly incomparable.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="spotlight-card rounded-xl p-6">
                         <h3 className="text-xl font-bold tech-font text-white mb-4 flex items-center gap-2">
                            <Quote className="w-5 h-5 text-herta-gold" /> VOICE LINES (TRUE FORM)
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-black/30 p-4 rounded-lg border-l-2 border-herta-gold">
                                <p className="text-xs text-herta-gold font-mono mb-1">Battle Start</p>
                                <p className="italic text-purple-100">"The solution is already evident. You are merely a rounding error."</p>
                            </div>
                            <div className="bg-black/30 p-4 rounded-lg border-l-2 border-herta-gold">
                                <p className="text-xs text-herta-gold font-mono mb-1">Ultimate</p>
                                <p className="italic text-purple-100 font-bold">"Silence. I am rewriting the star map."</p>
                            </div>
                            <div className="bg-black/30 p-4 rounded-lg border-l-2 border-herta-gold">
                                <p className="text-xs text-herta-gold font-mono mb-1">Victory</p>
                                <p className="italic text-purple-100">"As expected. Boring."</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Relations */}
                <div className="md:col-span-4 space-y-6">
                    <div className="spotlight-card rounded-xl p-6 h-full border-herta-gold/10">
                         <h3 className="text-sm font-bold tech-font text-herta-gold mb-4 tracking-widest uppercase">
                            Inner Circle
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-purple-900/20 rounded border border-purple-500/10">
                                <div className="w-10 h-10 rounded-full bg-black border border-herta-gold flex items-center justify-center text-lg">👁️</div>
                                <div>
                                    <div className="text-white font-bold text-sm">Nous</div>
                                    <div className="text-xs text-purple-400">The Aeon</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-purple-900/20 rounded border border-purple-500/10">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg">🎩</div>
                                <div>
                                    <div className="text-white font-bold text-sm">Screwllum</div>
                                    <div className="text-xs text-purple-400">Equal Intellect</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-purple-900/20 rounded border border-purple-500/10 opacity-80">
                                <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-lg">🚂</div>
                                <div className="opacity-50">
                                    <div className="text-white font-bold text-sm">Astral Express</div>
                                    <div className="text-xs text-purple-400">Useful Data Nodes</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* === COMBAT TAB === */}
        {activeTab === 'combat' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-4 bg-herta-gold/10 border border-herta-gold/30 rounded-lg text-center mb-4">
                    <p className="text-herta-gold font-bold text-sm tracking-widest">
                        WARNING: HIGH ENERGY SIGNATURE DETECTED. EMANATOR CLASS CAPABILITIES.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Basic ATK */}
                    <div className="bg-black/40 border border-purple-500/20 p-5 rounded-xl hover:border-herta-gold transition-colors group">
                        <div className="flex justify-between items-start mb-3">
                             <h4 className="font-bold text-white group-hover:text-herta-gold transition-colors">A Touch of Brilliance</h4>
                             <span className="text-[10px] bg-purple-900 px-2 py-0.5 rounded text-purple-200">BASIC ATK</span>
                        </div>
                        <p className="text-sm text-purple-200/80 leading-snug">
                            Deals <span className="text-blue-300">Ice DMG</span> equal to 150% of The Herta's ATK to a single enemy. Generates 1 stack of <span className="text-herta-gold">"Inspiration"</span>.
                        </p>
                    </div>

                    {/* Skill */}
                    <div className="bg-black/40 border border-purple-500/20 p-5 rounded-xl hover:border-herta-gold transition-colors group">
                        <div className="flex justify-between items-start mb-3">
                             <h4 className="font-bold text-white group-hover:text-herta-gold transition-colors">Detonation of Truth</h4>
                             <span className="text-[10px] bg-purple-900 px-2 py-0.5 rounded text-purple-200">SKILL</span>
                        </div>
                        <p className="text-sm text-purple-200/80 leading-snug">
                            Deals massive <span className="text-blue-300">Ice DMG</span> to all enemies. If The Herta possesses 3+ stacks of "Inspiration", consumes them to ignore 20% RES.
                        </p>
                    </div>

                    {/* Ultimate */}
                    <div className="bg-gradient-to-br from-purple-900/20 to-black border border-herta-gold/50 p-5 rounded-xl hover:border-herta-gold transition-colors group shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                        <div className="flex justify-between items-start mb-3">
                             <h4 className="font-bold text-white group-hover:text-herta-gold transition-colors">Aesthetics of the Sorceress</h4>
                             <span className="text-[10px] bg-herta-gold text-black font-bold px-2 py-0.5 rounded">ULTIMATE</span>
                        </div>
                        <p className="text-sm text-purple-200/80 leading-snug">
                            "I will show you the true starry sky."
                            <br/>
                            Deals devastating <span className="text-blue-300">Ice DMG</span> (300% ATK) to all enemies and freezes them for 2 turns. This Freeze ignores Control RES.
                        </p>
                    </div>

                    {/* Talent */}
                    <div className="bg-black/40 border border-purple-500/20 p-5 rounded-xl hover:border-herta-gold transition-colors group">
                        <div className="flex justify-between items-start mb-3">
                             <h4 className="font-bold text-white group-hover:text-herta-gold transition-colors">Apex of Erudition</h4>
                             <span className="text-[10px] bg-purple-900 px-2 py-0.5 rounded text-purple-200">TALENT</span>
                        </div>
                        <p className="text-sm text-purple-200/80 leading-snug">
                            When any ally attacks, The Herta gains 1 stack of <span className="text-herta-gold">"Inspiration"</span> (Max 10). At 5 stacks, she launches an immediate Follow-up Attack dealing damage to all enemies.
                        </p>
                    </div>
                </div>

                {/* Traces Section */}
                <div className="spotlight-card rounded-xl p-6 mt-6 border-t-2 border-t-herta-gold">
                    <h3 className="text-lg font-bold tech-font text-white mb-4 flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5 text-herta-gold" /> EMANATOR ASCENSION
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded bg-herta-gold/20 border border-herta-gold/50 shrink-0 flex items-center justify-center text-herta-gold font-bold">1</div>
                            <div>
                                <h5 className="font-bold text-white text-sm">Pure Logic</h5>
                                <p className="text-xs text-purple-300 mt-1">Crit DMG increases by 10% for every stack of Inspiration.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded bg-herta-gold/20 border border-herta-gold/50 shrink-0 flex items-center justify-center text-herta-gold font-bold">2</div>
                            <div>
                                <h5 className="font-bold text-white text-sm">Rewrite</h5>
                                <p className="text-xs text-purple-300 mt-1">Upon entering battle, immediately gains 3 stacks of Inspiration.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded bg-herta-gold/20 border border-herta-gold/50 shrink-0 flex items-center justify-center text-herta-gold font-bold">3</div>
                            <div>
                                <h5 className="font-bold text-white text-sm">Absolute Zero</h5>
                                <p className="text-xs text-purple-300 mt-1">DMG against Frozen enemies increases by 50%.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* === EIDOLONS TAB === */}
        {activeTab === 'eidolons' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {[
                    { lvl: 1, name: "Author's Hubris", desc: "Skill deals 40% increased DMG to enemies with >50% HP." },
                    { lvl: 2, name: "Unseen Dimensions", desc: "Max stacks of Inspiration increased to 15. Every stack provides 2% ATK." },
                    { lvl: 3, name: "The Galaxy in a Nut Shell", desc: "Ultimate Lv +2, Talent Lv +2." },
                    { lvl: 4, name: "Solution to Everything", desc: "When Talent is triggered, regenerates 10 Energy." },
                    { lvl: 5, name: "Gaze of the Nous", desc: "Skill Lv +2, Basic ATK Lv +1." },
                    { lvl: 6, name: "The One and Only", desc: "Ultimate attacks ignore 100% of enemy DEF and RES. Can only occur once every 3 turns." },
                ].map((eidolon) => (
                    <div key={eidolon.lvl} className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-purple-500/10 hover:border-herta-gold hover:bg-purple-900/10 transition-all group">
                        <div className="w-12 h-12 rounded-full border-2 border-herta-gold/30 flex items-center justify-center bg-black group-hover:border-herta-gold group-hover:text-herta-gold transition-colors shrink-0 font-black text-xl text-herta-gold shadow-[0_0_10px_rgba(251,191,36,0.2)]">
                            E{eidolon.lvl}
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-lg mb-1 group-hover:text-herta-gold transition-colors">{eidolon.name}</h4>
                            <p className="text-sm text-purple-200/70 leading-relaxed">{eidolon.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* === ARCHIVE TAB === */}
        {activeTab === 'archive' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="spotlight-card rounded-xl p-8 relative overflow-hidden border-herta-gold/10">
                    <Crown className="absolute top-4 right-4 w-12 h-12 text-herta-gold/10" />
                    <h3 className="text-xl font-bold tech-font text-white mb-6">CHARACTER STORY: THE TRUE FORM</h3>
                    <p className="text-purple-100/80 leading-loose text-sm md:text-base">
                        "The Herta." This title carries weight across the cosmos. 
                        <br/><br/>
                        Most know her as the puppet that spins and mocks them in the Space Station. But the puppet is merely a low-bandwidth interface for a mind that spans dimensions.
                        <br/><br/>
                        The true Herta is an Emanator of Nous, the Erudition. She does not just "study" the universe; she decrypts it. She has solved the Solitary Wave theory, reversed her own aging, and built the Simulated Universe to cage Aeons.
                        <br/><br/>
                        Why does she finally step forward now? Perhaps the variables of the universe have finally become interesting enough to warrant her personal attention. Or perhaps she simply grew tired of watching the puppets do a clumsy job.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/40 border border-purple-500/20 p-6 rounded-xl hover:border-herta-gold transition-colors">
                        <h4 className="font-bold text-herta-gold mb-2">The Gaze of Nous</h4>
                        <p className="text-sm text-purple-300/70">
                            When Herta first solved the Solitary Wave, the Aeon of Erudition glanced at her. That single moment of contact elevated her existence. She is no longer just a genius; she is an extension of the library of the universe.
                        </p>
                    </div>
                    <div className="bg-black/40 border border-purple-500/20 p-6 rounded-xl hover:border-herta-gold transition-colors">
                        <h4 className="font-bold text-herta-gold mb-2">The Art of Containment</h4>
                        <p className="text-sm text-purple-300/70">
                            The Herta views reality as a canvas and logic as her brush. She has captured Stellaron Hunters, contained Leviathans, and simulated gods. Her "collection" is not just objects; it is laws of physics she has subjugated.
                        </p>
                    </div>
                </div>
             </div>
        )}

      </div>
    </div>
  );
};

export default HertaWiki;