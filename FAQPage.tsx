import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ChevronDown, HelpCircle, Sparkles, Database, Shield, Zap } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('salesforce');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = [
    { id: 'salesforce', label: 'Salesforce CRM Integration', icon: Database },
    { id: 'ai', label: 'Somisetti AI Qualification', icon: Sparkles },
    { id: 'security', label: 'Security & Compliance', icon: Shield },
    { id: 'billing', label: 'Billing & Enterprise SLAs', icon: Zap }
  ];

  const faqData: Record<string, { q: string; a: string }[]> = {
    salesforce: [
      { q: 'How does bi-directional Salesforce synchronization work?', a: 'Lead Fusion acts as an intelligent REST API Bulk Gateway. Whenever a lead is captured or updated in Lead Fusion, an Apex callout or REST webhook instantly pushes the changes to your Salesforce org without governor limit violations.' },
      { q: 'Which Salesforce objects are supported out of the box?', a: 'We natively support Lead, Account, Contact, Opportunity, and Task objects. You can also configure custom objects via our Swagger REST endpoint definitions.' },
      { q: 'Does Lead Fusion work with Salesforce Flow Builder?', a: 'Yes! We emit standard Platform Events that trigger declarative Salesforce record-triggered flows for immediate BDR assignment and automated email campaigns.' }
    ],
    ai: [
      { q: 'How does the Somisetti AI 0-100 scoring algorithm work?', a: 'Our scoring algorithm analyzes over 15 firmographic and behavioral signals: corporate domain reputation (+20 pts), VIP budget allocation (+18 pts), pricing page velocity (+25 pts), and chatbot sentiment interaction.' },
      { q: 'Can Somisetti AI Copilot draft outreach emails automatically?', a: 'Yes! When viewing any lead in the CRM dashboard, clicking "Trigger Anji Somisetti AI Outreach" generates a hyper-personalized email campaign referencing the prospect\'s exact company and industry.' }
    ],
    security: [
      { q: 'Where is corporate prospect data stored?', a: 'Data is persisted in dedicated MongoDB Atlas enterprise clusters protected by AES-256 encryption at rest and TLS 1.3 in transit.' },
      { q: 'Are you SOC2 Type II compliance certified?', a: 'Yes. Our platform adheres strictly to SOC2 Type II, GDPR, and ISO-27001 data privacy mandates.' }
    ],
    billing: [
      { q: 'Can we upgrade our tier as our lead throughput expands?', a: 'Yes, tier upgrades take effect instantly with prorated monthly or annual invoicing.' },
      { q: 'Do you offer custom SLA agreements for Fortune 500 orgs?', a: 'Yes, our Enterprise Unlimited tier includes dedicated 99.99% uptime guarantees and 24/7 priority DevOps support.' }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-24 pb-16 text-center px-4 border-b border-slate-800">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">KNOWLEDGE BASE</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mt-3 text-white">
          Frequently Asked Questions
        </h1>
        <p className="mt-6 text-slate-400 text-lg">Everything you need to know about Lead Fusion architecture and CRM synchronization.</p>

        {/* Tabs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
          {categories.map(c => {
            const Icon = c.icon;
            const isActive = activeTab === c.id;
            return (
              <button
                key={c.id}
                onClick={() => { setActiveTab(c.id); setOpenIdx(0); }}
                className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                  isActive ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'bg-slate-900 hover:bg-slate-850 text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Accordion */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-4">
          {(faqData[activeTab] || []).map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`rounded-2xl border transition-all ${isOpen ? 'bg-slate-900 border-blue-500 shadow-xl' : 'bg-slate-900/60 border-slate-800'}`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left font-bold text-base text-white flex items-center justify-between gap-4"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-blue-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};
