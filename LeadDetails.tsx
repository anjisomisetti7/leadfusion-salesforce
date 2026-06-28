import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useLeads } from '../context/LeadContext';
import { ActivityTimeline } from '../components/leads/ActivityTimeline';
import { 
  Sparkles, Mail, Send, Cpu, Workflow, ShieldCheck, 
  ArrowLeft, Building2, Phone, Globe, Briefcase, DollarSign, 
  Clock, CheckCircle2, AlertTriangle, RefreshCw 
} from 'lucide-react';

export const LeadDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { leads, updateLeadStatus } = useLeads();
  const navigate = useNavigate();

  const [generatedEmail, setGeneratedEmail] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const lead = leads.find(l => l.id === id) || leads[0];

  if (!lead) {
    return <DashboardLayout><p>Lead record not found in gateway cache.</p></DashboardLayout>;
  }

  const triggerAnjiSomisettiOutreach = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedEmail(
        `Subject: Autonomous AI scaling for ${lead.company}\n\nHi ${lead.firstName},\n\nI noticed ${lead.company} is actively exploring modern B2B lead generation architecture within the ${lead.industry} vertical.\n\nOur Anji Somisetti AI engines calculated a Tier 1 fit score of ${lead.aiScore}/100 based on your firm's domain reputation and budget allocation. I'd love to schedule a 10-minute executive walkthrough with our Salesforce Lightning Org specialists this week.\n\nBest regards,\nMarcus Thorne\nSenior Enterprise AE, Lead Fusion`
      );
    }, 1200);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
        
        {/* Top Back Navigation & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button onClick={() => navigate('/lead-management')} className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors font-mono">
            <ArrowLeft className="w-4 h-4" /> BACK TO LEAD MANAGEMENT HUB
          </button>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => updateLeadStatus(lead.id, 'Qualified')}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md"
            >
              Mark Salesforce Qualified
            </button>
            <button 
              onClick={triggerAnjiSomisettiOutreach}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 animate-spin-once" /> Trigger Anji Somisetti AI Outreach
            </button>
          </div>
        </div>

        {/* Lead Identity Header Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold border border-blue-200">
                SF_ID: {lead.salesforceId || '00Q8aXYZ9910'}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-emerald-600 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> REST SYNC ACTIVE
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {lead.firstName} {lead.lastName}
            </h1>
            <p className="text-sm font-semibold text-slate-500 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" /> {lead.jobTitle || 'VP of Engineering'} at <span className="text-slate-900 font-bold">{lead.company}</span>
            </p>
          </div>

          {/* AI Confidence Badge */}
          <div className="bg-gradient-to-br from-slate-900 to-[#1E293B] text-white p-6 rounded-2xl shadow-xl border border-blue-500/40 min-w-[240px] text-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block mb-1">
              🧠 ANJI SOMISETTI FIT SCORE
            </span>
            <div className="text-5xl font-black tracking-tight">{lead.aiScore}<span className="text-lg font-mono font-normal text-blue-300">/100</span></div>
            <span className="mt-2 inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 font-mono">
              96.4% Confidence (Tier 1)
            </span>
          </div>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: AI Score Vectors & Breakdown */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 font-mono">
              <Cpu className="w-5 h-5 text-indigo-600" /> // Weighting Breakdown
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1"><span>Domain Reputation Vector</span> <span className="font-mono text-blue-600">+20 pts</span></div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-blue-600 h-full w-[95%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between font-semibold mb-1"><span>Firmographic VIP Budget ($150k+)</span> <span className="font-mono text-indigo-600">+18 pts</span></div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-indigo-600 h-full w-[90%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between font-semibold mb-1"><span>Web Velocity Engagement</span> <span className="font-mono text-emerald-600">+25 pts</span></div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full w-[100%]"></div></div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900 leading-relaxed">
              <strong>Anji Somisetti Summary:</strong> Prospect matches ICP Tier 1. Corporate domain verifies active MX records with zero spam complaints. Immediate executive engagement advised.
            </div>
          </div>

          {/* Middle Column: Contact & Firmographics */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-base text-slate-900 font-mono uppercase tracking-wider text-slate-500">
              Firmographics
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="pb-3 border-b"><span className="text-slate-400 block">EMAIL:</span> <span className="font-bold text-slate-800 text-sm">{lead.email}</span></div>
              <div className="pb-3 border-b"><span className="text-slate-400 block">PHONE:</span> <span className="font-bold text-slate-800 text-sm">{lead.phone || '+1 (415) 882-9910'}</span></div>
              <div className="pb-3 border-b"><span className="text-slate-400 block">INDUSTRY:</span> <span className="font-bold text-slate-800">{lead.industry}</span></div>
              <div className="pb-3 border-b"><span className="text-slate-400 block">BUDGET:</span> <span className="font-bold text-emerald-600 text-sm">{lead.budget || '$150,000+'}</span></div>
              <div><span className="text-slate-400 block">COUNTRY:</span> <span className="font-bold text-slate-800">{lead.country || 'United States'}</span></div>
            </div>
          </div>

          {/* Right Column: Anji Somisetti Generated Outreach Viewer */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between border border-slate-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <span className="text-xs font-mono font-bold text-blue-400 flex items-center gap-2"><Mail className="w-4 h-4" /> ANJI SOMISETTI COPILOT DRAFT</span>
                {isGenerating && <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />}
              </div>

              {generatedEmail ? (
                <div className="font-mono text-xs text-slate-300 whitespace-pre-wrap bg-slate-950 p-4 rounded-2xl border border-slate-800 leading-relaxed max-h-[320px] overflow-y-auto">
                  {generatedEmail}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-500 text-xs">
                  Click "Trigger Anji Somisetti AI Outreach" above to synthesize customized B2B sales email.
                </div>
              )}
            </div>

            {generatedEmail && (
              <button 
                onClick={() => { navigator.clipboard.writeText(generatedEmail); alert('Outreach draft copied to clipboard!'); }}
                className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Copy To AE Clipboard
              </button>
            )}
          </div>

        </div>

        {/* Activity Timeline & Flow Automation Tracker */}
        <ActivityTimeline lead={lead} />

      </div>
    </DashboardLayout>
  );
};
