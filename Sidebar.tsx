import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLeads } from '../../context/LeadContext';
import { 
  LayoutDashboard, Users, BarChart2, Sparkles, Workflow, 
  Bell, Settings, HelpCircle, Shield, Database, Cpu, ChevronRight 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { notifications } = useLeads();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Lead Management', path: '/lead-management', icon: Users },
    { name: 'Lead Analytics', path: '/lead-analytics', icon: BarChart2 },
    { name: 'AI Market Insights', path: '/ai-insights', icon: Sparkles, badge: 'Agentforce' },
    { name: 'Flow Builder', path: '/flow-builder', icon: Workflow },
    { name: 'Salesforce Hub', path: '/salesforce', icon: Cpu, badge: 'Apex' },
    { name: 'Notifications', path: '/notifications', icon: Bell, count: unreadCount },
    { name: 'Account Details', path: '/account-details', icon: Shield },
    { name: 'Settings & Security', path: '/settings', icon: Settings },
    { name: 'Help Center & Blueprint', path: '/help-center', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col shrink-0 border-r border-slate-800/80 select-none">
      
      {/* Navigation List */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
          Enterprise CRM Suite
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                isActive 
                  ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-600/30 font-semibold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'} transition-colors`} />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                }`}>
                  {item.badge}
                </span>
              )}

              {item.count !== undefined && item.count > 0 && (
                <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                  isActive ? 'bg-white text-blue-600' : 'bg-red-500 text-white animate-pulse'
                }`}>
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}

        {/* Admin Section if Admin */}
        {user?.role === 'ADMIN' && (
          <div className="pt-6 mt-6 border-t border-slate-800/80">
            <div className="px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 flex items-center justify-between">
              <span>Admin Console</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            </div>
            <Link
              to="/admin-dashboard"
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname.startsWith('/admin') ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-red-400" />
                <span>Admin Overview</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>
          </div>
        )}
      </nav>

      {/* Sync Status Footer */}
      <div className="p-4 mt-auto border-t border-slate-800/80">
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
              Salesforce Gateway
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-mono text-emerald-400">ONLINE</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 font-medium truncate">Org: 00D8a00000XYZ</p>
          <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>Apex Triggers: Active</span>
            <span className="text-blue-400 font-mono">2842 Synced</span>
          </div>
        </div>
      </div>

    </aside>
  );
};
