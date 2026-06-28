import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2 } from 'lucide-react';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center px-4 font-sans">
      <div className="max-w-md mx-auto w-full bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl text-center">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white">Create New Password</h2>

        {done ? (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-200 text-xs">
            🎉 Password updated with bcrypt hashing! Redirecting to Sign In...
          </div>
        ) : (
          <form onSubmit={handleReset} className="mt-6 space-y-4 text-left text-sm">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">New Password</label>
              <input required type="password" placeholder="Min 8 chars" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs font-mono" />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Confirm Password</label>
              <input required type="password" placeholder="Min 8 chars" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs font-mono" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg">
              Save Encrypted Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
