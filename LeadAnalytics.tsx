import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useLeads } from '../context/LeadContext';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, CartesianGrid 
} from 'recharts';
import { BarChart3, TrendingUp, DollarSign, Target, Sparkles, Filter } from 'lucide-react';

export const LeadAnalytics: React.FC = () => {
  const { leads, stats } = useLeads();

  const funnelData = [
    { stage: 'Inbound Captured', count: stats.totalLeads || 450, fill: '#3B82F6' },
    { stage: 'Anji Somisetti AI Scored (80+)', count: stats.qualifiedLeads || 320, fill: '#6366F1' },
    { stage: 'AE Dispatched', count: 210, fill: '#8B5CF6' },
    { stage: 'Salesforce Opportunity', count: 140, fill: '#EC4899' },
    { stage: 'Closed Won Pipeline', count: 85, fill: '#10B981' }
  ];

  const industryData = [
    { industry: 'Cloud SaaS', revenue: 450 },
    { industry: 'Fintech & Banking', revenue: 380 },
    { industry: 'Robotics & AI', revenue: 290 },
    { industry: 'Biotech', revenue: 180 },
    { industry: 'Retail E-Com', revenue: 140 }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-300">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">PIPELINE TELEMETRY</span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Lead Conversion Analytics</h1>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold shadow-md">
            ATTRIBUTION MODEL: W-SHAPED
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Funnel Chart */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 mb-1">Salesforce Conversion Funnel</h3>
            <p className="text-xs text-slate-400 font-mono mb-6">Inbound traffic progression to Closed Won deals</p>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical" margin={{ left: 40, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                  <XAxis type="number" fontSize={12} stroke="#94A3B8" />
                  <YAxis type="category" dataKey="stage" fontSize={12} stroke="#475569" width={140} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                    {funnelData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Industry Revenue Chart */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 mb-1">Revenue Attribution By Vertical ($k)</h3>
            <p className="text-xs text-slate-400 font-mono mb-6">ICP firmographic performance correlation</p>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="industry" fontSize={12} stroke="#475569" tickLine={false} />
                  <YAxis fontSize={12} stroke="#94A3B8" tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3B82F6" radius={[8, 8, 0, 0]} name="Attributed Revenue ($k)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
