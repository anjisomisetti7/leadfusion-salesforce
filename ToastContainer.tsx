import React from 'react';
import { useLeads } from '../../context/LeadContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, Smartphone, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { notifications, markNotificationsRead } = useLeads();
  const recentToasts = notifications.slice(0, 3); // show latest 3

  if (recentToasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4">
      {recentToasts.map((toast) => {
        const isSuccess = toast.type === 'SUCCESS';
        const isWarning = toast.type === 'WARNING';
        const isDanger = toast.type === 'DANGER';
        const isSMS = toast.type === 'SMS_SIMULATION';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 ${
              isSuccess ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100' :
              isWarning ? 'bg-amber-950/90 border-amber-500/50 text-amber-100' :
              isDanger ? 'bg-red-950/90 border-red-500/50 text-red-100' :
              isSMS ? 'bg-indigo-950/95 border-indigo-400 text-indigo-100 ring-2 ring-indigo-500/30' :
              'bg-slate-900/90 border-slate-700 text-slate-100'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {isDanger && <XCircle className="w-5 h-5 text-red-400" />}
              {isSMS && <Smartphone className="w-5 h-5 text-indigo-400 animate-bounce" />}
              {!isSuccess && !isWarning && !isDanger && !isSMS && <Info className="w-5 h-5 text-blue-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold font-mono tracking-wider uppercase opacity-80">
                  {isSMS ? '⚡ SIMULATED BDR SMS ALERT' : toast.title}
                </p>
                <span className="text-[10px] opacity-60 font-mono">{toast.createdAt}</span>
              </div>
              <p className="text-xs mt-1 leading-relaxed">{toast.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
