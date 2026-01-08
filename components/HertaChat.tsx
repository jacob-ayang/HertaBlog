import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Terminal, Loader2 } from 'lucide-react';
import { sendMessageToHerta } from '../services/geminiService';
import { ChatMessage, SimulatedUniverseState } from '../types';

const SUGGESTED_QUESTIONS = [
    "Who are you really?",
    "Explain the Solitary Wave theory.",
    "What is your opinion on Ruan Mei?",
    "Why build the Simulated Universe?"
];

const HertaChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Terminal link established. State your purpose. If it is trivial, I will disconnect you."
    }
  ]);
  const [status, setStatus] = useState<SimulatedUniverseState>(SimulatedUniverseState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || status === SimulatedUniverseState.CALCULATING) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStatus(SimulatedUniverseState.CALCULATING);

    try {
      const responseText = await sendMessageToHerta(userMsg.text, messages);
      
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      
      setMessages(prev => [...prev, modelMsg]);
      setStatus(SimulatedUniverseState.IDLE);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Error 404: Genius not found. Just kidding, it's a connection error."
      };
      setMessages(prev => [...prev, errorMsg]);
      setStatus(SimulatedUniverseState.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[75vh] md:h-[600px] flex gap-4 relative">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col glass-panel rounded-xl overflow-hidden relative">
            {/* Header */}
            <div className="bg-purple-900/40 p-3 border-b border-purple-500/30 flex items-center justify-between backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-herta-accent animate-pulse shadow-[0_0_10px_#a855f7]"></div>
                    <span className="tech-font text-purple-100 font-bold tracking-widest flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        ACCESS_TERMINAL_83
                    </span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center border ${
                            msg.role === 'user' 
                            ? 'bg-purple-900/50 border-purple-500/30' 
                            : 'bg-herta-accent/20 border-herta-accent/50'
                        }`}>
                            {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>

                        {/* Bubble */}
                        <div className={`max-w-[80%] rounded-lg p-3 text-sm leading-relaxed ${
                            msg.role === 'user'
                            ? 'bg-purple-600/20 border border-purple-500/30 text-purple-100'
                            : 'bg-black/40 border border-herta-accent/20 text-purple-200'
                        }`}>
                            {msg.role === 'model' && (
                                <span className="block text-[10px] font-mono text-herta-accent mb-1 opacity-70">
                                    MADAM HERTA
                                </span>
                            )}
                            {msg.text}
                        </div>
                    </div>
                ))}
                
                {/* Typing Indicator */}
                {status === SimulatedUniverseState.CALCULATING && (
                    <div className="flex gap-4 animate-in fade-in">
                         <div className="w-8 h-8 rounded shrink-0 bg-herta-accent/20 border border-herta-accent/50 flex items-center justify-center">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-black/40 border border-herta-accent/20 rounded-lg p-3 flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-herta-accent" />
                            <span className="text-xs font-mono text-purple-400 animate-pulse">CALCULATING RESPONSE...</span>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/40 border-t border-purple-500/20 backdrop-blur-md">
                {/* Suggestions (Only show when empty history or idle) */}
                {messages.length < 2 && (
                    <div className="flex gap-2 overflow-x-auto pb-3 mb-2 custom-scrollbar">
                        {SUGGESTED_QUESTIONS.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(q)}
                                className="whitespace-nowrap px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-900/20 text-xs text-purple-300 hover:bg-herta-accent hover:text-white hover:border-herta-accent transition-all"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter command or query..."
                        className="flex-1 bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-sm focus:border-herta-accent focus:bg-purple-900/10 outline-none transition-all placeholder:text-purple-500/50 font-mono text-purple-100 min-w-0"
                        disabled={status === SimulatedUniverseState.CALCULATING}
                    />
                    <button
                        onClick={() => handleSend(input)}
                        disabled={!input.trim() || status === SimulatedUniverseState.CALCULATING}
                        className="px-4 py-2 bg-herta-accent hover:bg-purple-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] shrink-0"
                    >
                        {status === SimulatedUniverseState.CALCULATING ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default HertaChat;
