import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

export const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState('842910');

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    setVerified(true);
    setTimeout(() => navigate('/account-details'), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center px-4 font-sans">
      <div className="max-w-md mx-auto w-full bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl text-center">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-white">Corporate Email Verification</h2>
        <p className="text-xs text-slate-400 mt-2">Enter the 6-digit OTP simulation code.</p>

        {verified ? (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-200 text-xs">
            ✅ Email verified! Redirecting to Account Details...
          </div>
        ) : (
          <form onSubmit={verify} className="mt-6 space-y-4">
            <input 
              value={otp} 
              onChange={e => setOtp(e.target.value)}
              className="w-full text-center text-2xl font-mono tracking-widest bg-slate-950 border border-slate-800 rounded-2xl py-3 text-white focus:border-emerald-500 focus:outline-none" 
            />
            <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg">
              Verify Token &amp; Enter Workspace
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
