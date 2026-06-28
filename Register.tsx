import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Shield, Building2, User, Mail, Lock, Phone, Globe, ArrowRight } from 'lucide-react';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const data = {
      fullName: fd.get('fullName') as string,
      email: fd.get('email') as string,
      password: fd.get('password') as string,
      company: fd.get('company') as string,
      jobTitle: fd.get('jobTitle') as string,
      industry: fd.get('industry') as string,
      phone: fd.get('phone') as string,
      country: fd.get('country') as string
    };

    try {
      await register(data);
      // USER PROMPT REQUIREMENT: "After successful registration Automatically redirect to Account Details"
      navigate('/account-details');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center font-sans relative">
      <div className="max-w-2xl mx-auto w-full">
        
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-white">Lead Fusion</span>
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-white">Create Your Enterprise Account</h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">Upon completion, you will be directed immediately to Account Details.</p>
        </div>

        <div className="bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-2">Full Name *</label>
                <input required name="fullName" placeholder="e.g. David Kim" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-2">Corporate Email *</label>
                <input required type="email" name="email" placeholder="david@enterprise.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none font-mono text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-2">Password *</label>
                <input required type="password" name="password" placeholder="Min 8 chars" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none font-mono text-xs" />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-2">Phone Number</label>
                <input name="phone" placeholder="+1 (415) 000-0000" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none font-mono text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-2">Company Name *</label>
                <input required name="company" placeholder="Acme Corp" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-2">Industry</label>
                <select name="industry" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none">
                  <option value="Technology">Technology & SaaS</option>
                  <option value="Finance">Financial Services</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-2">Job Title</label>
                <input name="jobTitle" placeholder="VP of Sales" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-2">Country</label>
              <input name="country" defaultValue="United States" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Provisioning Org Instance...' : 'Create Account & Open Account Details'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-400">
            Already registered? <Link to="/login" className="text-blue-400 font-bold hover:underline">Sign In</Link>
          </div>
        </div>

      </div>
    </div>
  );
};
