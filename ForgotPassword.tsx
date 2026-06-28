import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, CheckCircle2, ArrowLeft } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center px-4 font-sans">
      <div className="max-w-md mx-auto w-full bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl text-center">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white">Reset Password Token</h2>
        
        {sent ? (
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs leading-relaxed">
              We have dispatched an encrypted password recovery token to <strong>{email}</strong>.
            </div>
            <Link to="/reset-password" className="block w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs">
              Simulate Clicking Reset Token Link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSend} className="mt-6 space-y-4 text-left">
            <p className="text-xs text-slate-400 leading-relaxed text-center mb-4">
              Enter your corporate email. We will emit a JWT reset link valid for 15 minutes.
            </p>
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Email Address</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@enterprise.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs font-mono focus:border-blue-500 focus:outline-none" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-600/30">
              Dispatch Recovery Email
            </button>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-slate-800">
          <Link to="/login" className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
