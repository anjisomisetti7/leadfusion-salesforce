import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ShieldCheck, Lock, Globe, Zap, Cpu, Server, CheckCircle2, AlertTriangle, Key } from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('security');

  const swaggerSpec = `{
  "openapi": "3.0.3",
  "info": {
    "title": "Lead Fusion Salesforce Lightning REST Gateway",
    "version": "4.2.0",
    "description": "Bi-directional CRM synchronization API with SOC2 Type II compliance."
  },
  "paths": {
    "/api/leads": {
      "post": {
        "summary": "Ingest & Anji Somisetti AI Score Prospect Lead",
        "security": [{"BearerAuth": []}],
        "responses": {"201": {"description": "Salesforce Lead Object Created"}}
      }
    },
    "/api/leads/{id}/sync": {
      "post": {
        "summary": "Trigger Immediate REST Bulk Callout To Salesforce Org"
      }
    }
  }
}`;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300 w-full">
        
        <div className="pb-6 border-b border-slate-200">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">DEVOPS &amp; SECURITY CONSOLE</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Settings &amp; Security Shield</h1>
        </div>

        <div className="flex gap-3 border-b border-slate-200 pb-4">
          <button onClick={() => setActiveTab('security')} className={`px-6 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${activeTab === 'security' ? 'bg-slate-900 text-white shadow-md' : 'bg-white border text-slate-600'}`}>🛡️ SOC2 Security Config</button>
          <button onClick={() => setActiveTab('api')} className={`px-6 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${activeTab === 'api' ? 'bg-slate-900 text-white shadow-md' : 'bg-white border text-slate-600'}`}>⚡ Swagger API Blueprint</button>
          <button onClick={() => setActiveTab('logs')} className={`px-6 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${activeTab === 'logs' ? 'bg-slate-900 text-white shadow-md' : 'bg-white border text-slate-600'}`}>🖥️ System Health Logs</button>
        </div>

        {activeTab === 'security' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between"><span className="font-bold">Helmet HTTP Headers</span> <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">ENABLED</span></div>
              <p className="text-xs text-slate-500">Strict Content Security Policies protecting against XSS &amp; MIME sniffing.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between"><span className="font-bold">Express Rate Limiting</span> <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-mono font-bold">100 REQ/15MIN</span></div>
              <p className="text-xs text-slate-500">IP-based throttling mitigating DoS and brute-force authentication attacks.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between"><span className="font-bold">CORS Policy Shield</span> <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-xs font-mono font-bold">RESTRICTED</span></div>
              <p className="text-xs text-slate-500">Origin whitelisting configured for production Salesforce Org domains.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between"><span className="font-bold">RBAC Role Permissions</span> <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-mono font-bold">ACTIVE</span></div>
              <p className="text-xs text-slate-500">JWT claim verification enforcing executive vs admin boundary separation.</p>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="bg-[#0F172A] p-8 rounded-3xl border border-slate-800 font-mono text-xs text-blue-300 overflow-x-auto shadow-2xl">
            <div className="text-slate-500 mb-4">// SWAGGER / OPENAPI DEFINITION JSON</div>
            <pre>{swaggerSpec}</pre>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 font-mono text-xs space-y-2 text-emerald-400">
            <p>[LeadFusion.Gateway] 2026-06-27 11:48:00 - MongoDB Atlas Cluster Connection: ESTABLISHED (Pool: 50)</p>
            <p>[LeadFusion.Gateway] 2026-06-27 11:48:05 - Express JWT Bearer Auth Middleware Mounted on /api/*</p>
            <p>[LeadFusion.Gateway] 2026-06-27 11:48:10 - Salesforce Lightning Bulk API Sync Handler Initialized</p>
            <p className="text-blue-400">[LeadFusion.Gateway] 2026-06-27 11:49:00 - Anji Somisetti AI Qualification Engine: Ready</p>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};
