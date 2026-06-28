import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  subtext?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon: Icon,
  subtext
}) => {
  const changeColor = 
    changeType === 'positive' ? 'text-emerald-600 bg-emerald-50' : 
    changeType === 'negative' ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-50';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:border-blue-200 transition-colors group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider font-mono">
          {title}
        </span>
        <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {value}
        </div>
        {change && (
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold font-mono ${changeColor}`}>
            {change}
          </span>
        )}
      </div>

      {subtext && (
        <p className="text-xs text-slate-400 mt-2 font-medium">
          {subtext}
        </p>
      )}
    </div>
  );
};
