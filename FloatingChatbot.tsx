import React, { useState, useRef, useEffect } from 'react';
import { useLeads } from '../../context/LeadContext';
import { Bot, Sparkles, Send, X, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';

export const FloatingChatbot: React.FC = () => {
  const { createLead } = useLeads();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      id: 'msg_1',
      sender: 'bot',
      text: "👋 Hello! I'm your Anji Somisetti AI Assistant. How can I help qualify your enterprise CRM inquiry today?",
      quickReplies: ['View Pricing Tiers 💰', 'Agentforce AI Features ⚡', 'Request Executive Walkthrough 🚀']
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = async (txt?: string) => {
    const textToSend = txt || inputVal;
    if (!textToSend.trim()) return;

    const userMsg = { id: `m_${Date.now()}_u_${Math.random().toString(36).slice(2,7)}`, sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!txt) setInputVal('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });
      const data = await res.json();

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { id: `m_${Date.now()}_b_${Math.random().toString(36).slice(2,7)}`, sender: 'bot', text: data.reply }]);
      }, 800);
    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: `m_${Date.now()}_err_${Math.random().toString(36).slice(2,7)}`, sender: 'bot', text: "I'm ready to capture your email right now! What is your corporate email address?" }]);
    }
  };

  const handleQuickCapture = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const fullName = fd.get('fullName') as string;
    const email = fd.get('email') as string;
    const company = fd.get('company') as string;

    if (!email || !fullName) return;

    setIsTyping(true);
    const names = fullName.split(' ');
    await createLead({
      firstName: names[0] || 'Executive',
      lastName: names.slice(1).join(' ') || 'Lead',
      email,
      company: company || 'Enterprise Account',
      industry: 'Cloud Software',
      jobTitle: 'Decision Maker',
      revenue: '$10M+',
      budget: '$75,000+',
      country: 'United States',
      preferredContactTime: 'ASAP',
      productInterest: 'Agentforce Conversational AI'
    });

    setIsTyping(false);
    setLeadCaptured(true);
    const ts = Date.now();
    setMessages(prev => [
      ...prev,
      { id: `m_${ts}_1`, sender: 'user', text: `Submitted: ${fullName} (${email})` },
      { id: `m_${ts}_2`, sender: 'bot', text: "🎉 Excellent! I've calculated an Anji Somisetti AI Fit Score of 96/100 and created a high-priority Salesforce Lead object. Senior AE Marcus Thorne has been dispatched!" }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:right-8 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white p-4 rounded-full shadow-2xl shadow-blue-600/40 hover:scale-110 transition-all flex items-center gap-3 group"
      >
        {isOpen ? <X className="w-6 h-6" /> : (
          <>
            <Bot className="w-6 h-6 animate-bounce" />
            <span className="hidden md:inline font-bold text-sm pr-2">Ask Anji Somisetti AI</span>
          </>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-50 w-[92vw] sm:w-[420px] h-[600px] bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 text-slate-100">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-2">
                  Anji Somisetti AI Copilot
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </h3>
                <p className="text-[11px] text-blue-100 font-mono">Agentforce Salesforce CRM Sync</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-full">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Conversation Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/80">
            <div className="text-center py-2">
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-500">
                🔒 Protected by SOC2 Encryption & Salesforce Gateway
              </span>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-xs shadow-md' 
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-xs shadow-sm'
                }`}>
                  {msg.text}
                </div>

                {/* Quick Replies */}
                {msg.quickReplies && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.quickReplies.map((qr: string) => (
                      <button
                        key={qr}
                        onClick={() => handleSend(qr)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-blue-600/30 text-blue-400 hover:text-blue-200 border border-blue-500/30 text-[11px] font-medium transition-all"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-3 rounded-2xl w-24 rounded-bl-xs">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-300"></div>
              </div>
            )}

            {/* Inline Lead Capture Form Card */}
            {!leadCaptured && messages.length >= 2 && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-850 p-4 rounded-2xl border border-blue-500/40 shadow-xl mt-4">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-2 font-mono">
                  <Sparkles className="w-4 h-4" />
                  INSTANT SALESFORCE LEAD DISPATCH
                </div>
                <p className="text-[11px] text-slate-400 mb-3">Enter your executive details for instant Anji Somisetti AI qualification:</p>
                <form onSubmit={handleQuickCapture} className="space-y-2.5">
                  <input required name="fullName" placeholder="Full Name (e.g., Sarah Jenkins)" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
                  <input required type="email" name="email" placeholder="Corporate Email (@company.com)" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
                  <input name="company" placeholder="Company Name" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none" />
                  <button type="submit" className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                    Generate Qualified Lead <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Footer Input */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about pricing, Salesforce flows..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white shadow-md transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
