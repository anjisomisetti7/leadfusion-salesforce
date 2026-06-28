import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Shield, CheckCircle2, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in w-full">
        <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">User Profile Workspace</h1>
          <p className="text-xs text-slate-500">Quick executive summary. For full edits and photo rotation, visit Account Details.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
          <div className="flex items-center gap-6">
            <img src={user.avatarUrl} className="w-20 h-20 rounded-full border-2 border-blue-600" alt={user.fullName} />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user.fullName}</h2>
              <p className="text-xs text-slate-500 font-mono">{user.email}</p>
              <span className="mt-2 inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 uppercase font-mono">
                {user.role}
              </span>
            </div>
          </div>
          <button onClick={() => navigate('/account-details')} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-md transition-all">
            Open Account Details
          </button>
        </div>

        {/* Platform Theme Preferences Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {theme === 'dark' ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
                Platform Appearance Setting
              </h3>
              <p className="text-xs text-slate-500 mt-1">Toggle between Light mode for daytime readability or Dark mode for low eye strain.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => setTheme('light')}
              className={`p-5 rounded-2xl border flex items-center gap-4 text-left transition-all ${theme === 'light' ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 ring-2 ring-blue-600/20' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'}`}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center font-bold">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">Light Theme</p>
                <p className="text-xs text-slate-500">Crisp high contrast canvas inspired by Salesforce standards.</p>
              </div>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-5 rounded-2xl border flex items-center gap-4 text-left transition-all ${theme === 'dark' ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 ring-2 ring-blue-600/20' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'}`}
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-400 flex items-center justify-center font-bold">
                <Moon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">Dark Theme</p>
                <p className="text-xs text-slate-500">Eye-safe midnight canvas engineered for night workflows.</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
