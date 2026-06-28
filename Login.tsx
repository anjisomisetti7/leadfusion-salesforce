import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@nexusai.enterprise');
  const [password, setPassword] = useState('Salesforce2026!');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password, remember);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (eAddr: string) => {
    setEmail(eAddr);
    setPassword('Salesforce2026!');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link to="/" className="inline-flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">Lead Fusion</span>
        </Link>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">Executive Sign In</h2>
        <p className="mt-2 text-xs text-slate-400 font-mono">SOC2 Type II Protected &amp; Salesforce Gateway Auth</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-slate-900/90 py-8 px-6 shadow-2xl rounded-3xl border border-slate-800 backdrop-blur-xl sm:px-10">
          
          {/* Quick Demo Logins Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left">
            <span className="text-[10px] font-mono font-bold uppercase text-blue-400 block mb-2">⚡ DEMO QUICK ACCESS CREDENTIALS</span>
            <div className="grid grid-cols-2 gap-2">
              <button 
                type="button" 
                onClick={() => quickLogin('admin@nexusai.enterprise')}
                className="px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-[11px] font-medium transition-all text-left truncate"
              >
                👑 Salesforce Architect
              </button>
              <button 
                type="button" 
                onClick={() => quickLogin('marcus@nexusai.enterprise')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white text-[11px] font-medium transition-all text-left truncate"
              >
                💼 Senior Sales AE
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-3 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-6 text-sm" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">Executive Email</label>
              <div className="mt-2 relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">Password</label>
              <div className="mt-2 relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-slate-400 cursor-pointer select-none">
                  Remember 24h JWT Session
                </label>
              </div>

              <Link to="/forgot-password" className="font-semibold text-blue-400 hover:text-blue-300">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? 'Authenticating with Gateway...' : 'Sign In To Workspace'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-400">
            Don't have an enterprise account?{' '}
            <Link to="/register" className="font-bold text-blue-400 hover:underline">
              Create Enterprise Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
