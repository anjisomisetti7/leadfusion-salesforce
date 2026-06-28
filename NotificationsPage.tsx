import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useLeads } from '../context/LeadContext';
import { Bell, Smartphone, Mail, CheckCircle2, Trash2, ShieldAlert } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationsRead } = useLeads();
  const [filter, setFilter] = useState('ALL');

  const filtered = notifications.filter(n => filter === 'ALL' || n.type === filter);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300 w-full">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">EVENT AUDIT TRAIL</span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Notifications Hub</h1>
          </div>
          <button 
            onClick={() => markNotificationsRead()}
            className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-colors"
          >
            Mark All As Read
          </button>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setFilter('ALL')} className={`px-4 py-2 rounded-xl text-xs font-bold ${filter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-white border text-slate-600'}`}>All Logs</button>
          <button onClick={() => setFilter('SUCCESS')} className={`px-4 py-2 rounded-xl text-xs font-bold ${filter === 'SUCCESS' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-600'}`}>CRM Sync Success</button>
          <button onClick={() => setFilter('SMS_SIMULATION')} className={`px-4 py-2 rounded-xl text-xs font-bold ${filter === 'SMS_SIMULATION' ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-600'}`}>⚡ BDR SMS Alerts</button>
        </div>

        <div className="space-y-4">
          {filtered.map(nf => (
            <div key={nf.id} className={`p-6 rounded-3xl border transition-all ${!nf.isRead ? 'bg-white shadow-md border-blue-300' : 'bg-slate-50/60 border-slate-200 opacity-80'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono uppercase text-blue-600">{nf.title}</span>
                <span className="text-[11px] font-mono text-slate-400">{nf.createdAt}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{nf.message}</p>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};
