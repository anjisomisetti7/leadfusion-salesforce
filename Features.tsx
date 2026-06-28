import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { 
  Sparkles, Workflow, Cpu, Bot, ShieldAlert, BarChart3, 
  Database, Zap, ArrowRight, CheckCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Features: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-24 pb-20 border-b border-slate-800 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">DEEP DIVE CAPABILITIES</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mt-3 text-white">
            Enterprise Architecture Engineered <br /> For Sales Velocity
          </h1>
          <p className="mt-6 text-slate-400 text-lg">
            Explore how Somisetti AI scoring, Flow Builder automation, and Salesforce Apex Trigger Handlers work together in unison.
          </p>
        </div>
      </section>

      {/* Feature Section 1: AI Scoring */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-b border-slate-800">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-600/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Anji Somisetti AI Lead Qualification Engine</h2>
          <p className="mt-4 text-slate-400 leading-relaxed text-base">
            Every form submission and chatbot inquiry is dynamically evaluated against 5 critical B2B weighting vectors:
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" /> Corporate Email Domain Reputation Analysis</li>
            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" /> Revenue & Budget Tier Alignment ($150k+ VIP trigger)</li>
            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" /> Pricing & Documentation Page View Velocity</li>
            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" /> Agentforce Conversational Sentiment Weighting</li>
          </ul>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl font-mono text-xs">
          <div className="text-slate-500 mb-4">// ANJI SOMISETTI AI SCORING RESPONSE JSON</div>
          <pre className="text-blue-300 overflow-x-auto leading-relaxed">
{`{
  "prospect": "Sarah Jenkins",
  "firm": "Acme Robotics Global",
  "aiScore": 98,
  "classification": "HOT_LEAD_TIER_1",
  "confidence": "96.4%",
  "vectors": {
    "domainReputation": "+20 pts",
    "budgetAllocation": "+18 pts",
    "velocity": "+25 pts"
  },
  "predictedCloseDays": 14,
  "action": "DISPATCH_SENIOR_AE_MARCUS_THORNE"
}`}
          </pre>
        </div>
      </section>

      {/* Feature Section 2: Flow Builder */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-b border-slate-800">
        <div className="order-2 lg:order-1 bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-6">
            <Workflow className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-mono font-bold text-white">FLOW BUILDER AUTOMATION RULE #104</span>
          </div>
          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-blue-500/30 text-blue-300">
              ⚡ TRIGGER: Record.Created [Object: Lead]
            </div>
            <div className="pl-6 border-l-2 border-slate-700 space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                🔍 CONDITION: Lead.aiScore &gt;= 85
              </div>
              <div className="p-4 bg-emerald-950/60 rounded-xl border border-emerald-500/40 text-emerald-300">
                🎯 ACTION: Assign Owner [Marcus Thorne] &amp; Create Task [24h Due]
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-600/30">
            <Workflow className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Visual Flow Builder Engine</h2>
          <p className="mt-4 text-slate-400 leading-relaxed text-base">
            Simulate declarative Salesforce record-triggered automation without writing a single line of code. Configure scheduled daily batch follow-ups and Slack alerts instantly.
          </p>
          <div className="mt-8">
            <Link to="/flow-builder" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300">
              Try Interactive Flow Builder <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section 3: Salesforce Hub */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 mb-2">APEX &amp; LWC NATIVE</h2>
        <h3 className="text-3xl sm:text-5xl font-bold text-white">Salesforce Developer Workspace</h3>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base">
          Inspect production bulkified Apex trigger handlers, REST callout gateways, and interactive SOQL query consoles.
        </p>
        <div className="mt-10">
          <Link to="/salesforce" className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-2xl shadow-emerald-600/30 inline-block">
            Open Salesforce Developer Workspace
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
