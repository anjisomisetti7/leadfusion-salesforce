import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useLeads } from '../context/LeadContext';
import { StatsCard } from '../components/common/StatsCard';
import { 
  Users, Sparkles, Flame, Zap, Snowflake, DollarSign, 
  TrendingUp, ArrowRight, Bell, RefreshCw, Cpu, Workflow 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { leads, stats, fetchLeads, notifications } = useLeads();
  const navigate = useNavigate();

  const recentLeads = leads.slice(0, 5);
  const recentNotifs = notifications.slice(0, 4);

  // Chart Mock Data
  const monthlyPipeline = [
    { name: 'Jan', leads: 400, revenue: 240 },
    { name: 'Feb', leads: 600, revenue: 380 },
    { name: 'Mar', leads: 900, revenue: 520 },
    { name: 'Apr', leads: 1200, revenue: 840 },
    { name: 'May', leads: 1500, revenue: 1100 },
    { name: 'Jun', leads: 2100, revenue: 1650 }
  ];

  const pieColors = ['#EF4444', '#F59E0B', '#3B82F6', '#10B981'];
  const ratingData = [
    { name: 'Hot Tier 1', value: stats.hotLeads || 12 },
    { name: 'Warm Tier 2', value: stats.warmLeads || 15 },
    { name: 'Cold Tier 3', value: stats.coldLeads || 8 }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-300">
        
        {/* Top Executive Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              SALESFORCE LIGHTNING WORKSPACE • REALTIME PIPELINE
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">CRM Analytics Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => fetchLeads()}
              className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-xs transition-all"
              title="Refresh Salesforce REST Gateway"
            >
              <RefreshCw className="w-4 h-4 animate-spin-once" />
            </button>
            <Link 
              to="/contact" 
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4" /> Simulate New Lead Form
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Total Inbound Leads" 
            value={stats.totalLeads} 
            change="+18.4% this mo" 
            icon={Users} 
            subtext="Synced via MongoDB Gateway" 
          />
          <StatsCard 
            title="Anji Somisetti AI Scored (80+)" 
            value={stats.qualifiedLeads} 
            change="74.2% rate" 
            icon={Sparkles} 
            subtext="Auto-dispatched to AE org" 
          />
          <StatsCard 
            title="Hot Leads Tier 1" 
            value={stats.hotLeads} 
            change="High Closing Vel" 
            icon={Flame} 
            changeType="neutral"
          />
          <StatsCard 
            title="Pipeline Revenue" 
            value={`$${((stats.totalRevenue || 450000) / 1000).toFixed(0)}k`} 
            change="+32% vs SLA" 
            icon={DollarSign} 
            subtext="Attributed Salesforce Opps" 
          />
        </div>

        {/* AI Market Insights Teaser Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold">
              <Sparkles className="w-4 h-4 animate-pulse" /> AGENTFORCE MARKET INTELLIGENCE CORE • LIVE PREDICTIVE STUDIO
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">AI Market Insights &amp; Trending Sales</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore dynamic multi-dimensional analytics analyzing product velocity, geo hot-spots, conversion anomalies, and real-time Gemini recommendations.
            </p>
          </div>
          <Link
            to="/ai-insights"
            className="relative z-10 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-blue-500/25 flex items-center gap-2 group whitespace-nowrap transition-all transform hover:-translate-y-0.5"
          >
            Launch AI Market Studio <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Area Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-base text-slate-900">Pipeline Generation &amp; Revenue Velocity</h3>
                <p className="text-xs text-slate-400 font-mono">Simulated monthly progression ($k vs lead count)</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold">
                2026 H1 FORECAST
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyPipeline}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" name="Revenue ($k)" />
                  <Area type="monotone" dataKey="leads" stroke="#10B981" strokeWidth={2} fill="none" name="Leads" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Rating Breakdown */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">Anji Somisetti AI Tier Distribution</h3>
              <p className="text-xs text-slate-400 font-mono">Active CRM database segmentation</p>
              
              <div className="h-56 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ratingData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={6} dataKey="value">
                      {ratingData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
              <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Hot Tier 1</span> <span className="font-mono font-bold">{stats.hotLeads}</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Warm Tier 2</span> <span className="font-mono font-bold">{stats.warmLeads}</span></div>
              <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Cold Tier 3</span> <span className="font-mono font-bold">{stats.coldLeads}</span></div>
            </div>
          </div>

        </div>

        {/* Bottom Row: Recent Leads Table & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Inbound Leads Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-base text-slate-900">Recent Salesforce Synced Leads</h3>
                <p className="text-xs text-slate-400 font-mono">Bi-directional object mapping queue</p>
              </div>
              <Link to="/lead-management" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                View All {leads.length} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-mono uppercase">
                    <th className="pb-3 pr-4">Prospect</th>
                    <th className="pb-3 pr-4">Company</th>
                    <th className="pb-3 pr-4">AI Score</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {recentLeads.map(ld => (
                    <tr key={ld.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-3.5 pr-4 font-bold text-slate-900">{ld.firstName} {ld.lastName}</td>
                      <td className="py-3.5 pr-4 text-slate-500 truncate max-w-[120px]">{ld.company}</td>
                      <td className="py-3.5 pr-4">
                        <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                          ld.aiScore >= 80 ? 'bg-emerald-100 text-emerald-800' : 
                          ld.aiScore >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {ld.aiScore}/100
                        </span>
                      </td>
                      <td className="py-3.5 pr-4"><span className="text-[11px] font-mono">{ld.status}</span></td>
                      <td className="py-3.5 text-right">
                        <button onClick={() => navigate(`/lead-details/${ld.id}`)} className="text-blue-600 font-bold hover:underline">
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Alerts & BDR SMS Feed */}
          <div className="bg-[#0F172A] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between border border-slate-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400">
                  <Bell className="w-4 h-4" /> BDR AUTOMATION FEED
                </div>
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
              </div>

              <div className="space-y-4">
                {recentNotifs.map(n => (
                  <div key={n.id} className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1">
                      <span className="text-blue-300 font-bold">{n.title}</span>
                      <span>{n.createdAt.split(' ')[1]}</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 text-center">
              <Link to="/notifications" className="block w-full py-3 rounded-xl bg-slate-800 hover:bg-blue-600 font-bold text-xs transition-colors">
                Open Notifications Hub
              </Link>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
