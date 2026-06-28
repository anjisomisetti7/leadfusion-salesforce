import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { mongoDBSchemaDocs } from '../data/mockDatabase';
import { BookOpen, Database, Cpu, Workflow, Layers, HelpCircle, Shield, CheckCircle2 } from 'lucide-react';

export const HelpCenter: React.FC = () => {
  const [tab, setTab] = useState('arch');

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300 w-full">
        
        <div className="pb-6 border-b border-slate-200">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">SYSTEM MANUALS &amp; BLUEPRINTS</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Help Center &amp; Architecture Blueprints</h1>
        </div>

        <div className="flex flex-wrap gap-2 border-b pb-4">
          <button onClick={() => setTab('arch')} className={`px-5 py-2.5 rounded-xl text-xs font-bold ${tab === 'arch' ? 'bg-slate-900 text-white' : 'bg-white border text-slate-600'}`}>📐 Architecture Diagram</button>
          <button onClick={() => setTab('er')} className={`px-5 py-2.5 rounded-xl text-xs font-bold ${tab === 'er' ? 'bg-slate-900 text-white' : 'bg-white border text-slate-600'}`}>🗄️ ER Diagram &amp; MongoDB Schema</button>
          <button onClick={() => setTab('manual')} className={`px-5 py-2.5 rounded-xl text-xs font-bold ${tab === 'manual' ? 'bg-slate-900 text-white' : 'bg-white border text-slate-600'}`}>📖 User &amp; Admin Manual</button>
        </div>

        {tab === 'arch' && (
          <div className="bg-[#0F172A] p-8 sm:p-12 rounded-3xl text-white font-mono text-xs space-y-8 border border-slate-800 shadow-2xl text-center select-none">
            <span className="text-blue-400 font-bold block mb-4">// ENTERPRISE BI-DIRECTIONAL LEAD GEN ARCHITECTURE</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="p-6 rounded-2xl bg-slate-900 border border-blue-500/50">
                <span className="text-blue-400 font-bold block">1. Inbound Capture Layer</span>
                <p className="text-[11px] text-slate-400 mt-2">Intelligent React Forms &amp; Agentforce AI Chatbot emitting HTTPS JSON payload</p>
              </div>
              <div className="p-6 rounded-2xl bg-indigo-950 border border-indigo-400">
                <span className="text-indigo-300 font-bold block">2. Express Gateway &amp; Anji Somisetti AI</span>
                <p className="text-[11px] text-slate-300 mt-2">JWT verification, Rate Limiting, 0-100 Predictive Scoring vector calculation</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-950 border border-emerald-400">
                <span className="text-emerald-300 font-bold block">3. Salesforce Lightning Hub</span>
                <p className="text-[11px] text-slate-300 mt-2">REST Bulk API Callouts, Apex Trigger Handlers, Flow Builder Task Dispatch</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'er' && (
          <div className="bg-[#0F172A] p-8 rounded-3xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto shadow-2xl space-y-4">
            <div className="text-slate-500 mb-2">// MONGODB ATLAS &amp; SALESFORCE ER OBJECT DEFINITION</div>
            <p className="text-blue-400">Database: {mongoDBSchemaDocs.database}</p>
            {mongoDBSchemaDocs.collections.map((c, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <p className="text-amber-400 font-bold">Collection: {c.name}</p>
                <p className="text-slate-300">{c.description}</p>
                <p className="text-slate-500">Indexes: {c.indexes.join(', ')}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'manual' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-sm">
            <h3 className="font-bold text-lg text-slate-900">Executive Operation Manual</h3>
            <p className="text-slate-600 leading-relaxed">
              1. <strong>Lead Qualification:</strong> All inbound leads appear instantly on the CRM Dashboard and Lead Management table. <br />
              2. <strong>Salesforce Gateway:</strong> Clicking "Inspect" opens the Lead Details page where AE reps can trigger Anji Somisetti AI Copilot outreach emails. <br />
              3. <strong>Flow Automation:</strong> Use Flow Builder to simulate declarative record-triggered workflows.
            </p>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};
