import React, { useState } from 'react';
import SimulatedBackground from './components/SimulatedBackground';
import HertaChat from './components/HertaChat';
import HertaWiki from './components/HertaWiki';
import HertaBlog from './components/HertaBlog';
import CurioTerminal from './components/CurioTerminal';
import { BookOpen, MessageSquare, Hexagon, Triangle, Newspaper, User } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blog' | 'chat' | 'wiki' | 'curio'>('blog');

  const navItems = [
    { id: 'blog', icon: Newspaper, label: 'Archive' },
    { id: 'chat', icon: MessageSquare, label: 'Terminal' },
    { id: 'wiki', icon: User, label: 'Profile' },
    { id: 'curio', icon: Hexagon, label: 'Curio' },
  ];

  return (
    <div className="min-h-screen relative text-purple-100 selection:bg-herta-accent selection:text-white overflow-x-hidden pb-24 md:pb-0">
      <SimulatedBackground />
      
      {/* Decorative Glows - Adjusted for mobile */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex flex-col items-center justify-center mb-6 md:mb-8 pt-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 md:h-16 bg-gradient-to-b from-transparent to-purple-500/50"></div>
          
          <div className="flex items-center gap-3 mb-2 animate-float scale-90 md:scale-100">
             <Hexagon className="w-5 h-5 text-herta-gold animate-spin-slow" fill="rgba(251, 191, 36, 0.2)" />
             <span className="text-herta-gold text-[10px] font-bold tracking-[0.3em] uppercase border border-herta-gold/30 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md">
                Genius Society #83
             </span>
             <Hexagon className="w-5 h-5 text-herta-gold animate-spin-slow" fill="rgba(251, 191, 36, 0.2)" />
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-400 tech-font tracking-tighter filter drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
             THE HERTA
          </h1>
        </header>

        {/* Desktop Navigation (Top Pill) */}
        <nav className="hidden md:flex justify-center mb-8">
             <div className="glass-panel p-1 rounded-full flex gap-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`
                            px-6 py-2 rounded-full flex items-center gap-2 font-bold transition-all duration-300
                            ${activeTab === item.id 
                                ? 'bg-herta-accent text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' 
                                : 'text-purple-300 hover:text-white hover:bg-white/5'}
                        `}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </button>
                ))}
             </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'blog' && <HertaBlog onNavigate={setActiveTab} />}
            {activeTab === 'chat' && <HertaChat />}
            {activeTab === 'wiki' && <HertaWiki />}
            {activeTab === 'curio' && <CurioTerminal />}
        </main>

      </div>

      {/* Mobile Bottom Navigation (Fixed Bar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-purple-500/30 pb-4 pt-2 px-6 backdrop-blur-xl bg-black/80">
        <div className="flex justify-between items-center max-w-sm mx-auto h-14">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`
                        flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 relative
                        ${activeTab === item.id ? 'text-herta-accent -translate-y-2' : 'text-purple-400/70'}
                    `}
                >
                    {activeTab === item.id && (
                        <div className="absolute -top-3 w-8 h-1 bg-herta-accent rounded-b-full shadow-[0_0_10px_#a855f7]"></div>
                    )}
                    <item.icon className={`w-6 h-6 ${activeTab === item.id ? 'filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : ''}`} />
                    <span className="text-[10px] font-bold tracking-widest scale-90">{item.label}</span>
                </button>
            ))}
        </div>
      </nav>

    </div>
  );
};

export default App;