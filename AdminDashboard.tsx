import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useLeads } from '../context/LeadContext';
import { Database, ShieldAlert, Users, Server, CheckCircle2, RefreshCw } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { leads, stats } = useLeads();
  const [tab, setTab] = useState('overview');

  if (user?.role !== 'ADMIN') {
    return <DashboardLayout><div className="p-8 bg-red-50 text-red-700 rounded-3xl">Access Denied: Requires Executive Salesforce Administrator RBAC Role.</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-300 w-full">
        
        <div className="bg-gradient-to-r from-red-900 via-slate-900 to-slate-950 p-8 rounded-3xl text-white shadow-2xl border border-red-500/40 flex justify-between items-center">
          <div>
            <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-widest block mb-1">⚡ SALESFORCE SYSTEM ADMINISTRATOR CONSOLE</span>
            <h1 className="text-3xl font-extrabold tracking-tight">Admin Executive Workspace</h1>
          </div>
          <span className="px-3 py-1 rounded bg-red-500/20 text-red-300 text-xs font-mono font-bold border border-red-500/30">
            ROOT PRIVILEGES
          </span>
        </div>

        <div className="flex gap-3 border-b pb-4">
          <button onClick={() => setTab('overview')} className={`px-5 py-2.5 rounded-xl text-xs font-bold ${tab === 'overview' ? 'bg-red-600 text-white shadow-md' : 'bg-white border text-slate-600'}`}>📊 System Overview</button>
          <button onClick={() => setTab('users')} className={`px-5 py-2.5 rounded-xl text-xs font-bold ${tab === 'users' ? 'bg-red-600 text-white shadow-md' : 'bg-white border text-slate-600'}`}>👥 User RBAC Management</button>
        </div>

        {tab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border shadow-xs">
              <span className="text-xs font-mono text-slate-400 block mb-1">TOTAL PIPELINE CAPTURED</span>
              <span className="text-3xl font-extrabold text-slate-900">{stats.totalLeads} Records</span>
            </div>
            <div className="bg-white p-6 rounded-3xl border shadow-xs">
              <span className="text-xs font-mono text-slate-400 block mb-1">MONGODB ATLAS MEMORY POOL</span>
              <span className="text-3xl font-extrabold text-emerald-600">Healthy (4.2 MB)</span>
            </div>
            <div className="bg-white p-6 rounded-3xl border shadow-xs">
              <span className="text-xs font-mono text-slate-400 block mb-1">REST GATEWAY CALLOUTS</span>
              <span className="text-3xl font-extrabold text-blue-600">0 Gov Violations</span>
            </div>
          </div>
        )}

        {tab === 'users' && (
          <div className="bg-white rounded-3xl p-8 border shadow-xs">
            <h3 className="font-bold text-base text-slate-900 mb-4">Active Workspace Users</h3>
            <table className="w-full text-left text-xs">
              <thead><tr className="border-b font-mono text-slate-400"><th className="pb-3">User</th><th className="pb-3">Email</th><th className="pb-3">Role</th><th className="pb-3">Status</th></tr></thead>
              <tbody className="divide-y font-medium text-slate-700">
                <tr><td className="py-3 font-bold">Sarah Jenkins</td><td className="py-3 font-mono">admin@nexusai.enterprise</td><td className="py-3"><span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-mono font-bold">ADMIN</span></td><td className="py-3 text-emerald-600 font-bold">ACTIVE</td></tr>
                <tr><td className="py-3 font-bold">Marcus Thorne</td><td className="py-3 font-mono">marcus@nexusai.enterprise</td><td className="py-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold">AE</span></td><td className="py-3 text-emerald-600 font-bold">ACTIVE</td></tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};
