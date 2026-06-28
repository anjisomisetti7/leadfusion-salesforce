import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useLeads } from '../context/LeadContext';
import { 
  Sparkles, Send, ShieldCheck, AlertTriangle, Building2, 
  CheckCircle2, Clock, DollarSign, Globe, Briefcase, UserCheck 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Contact: React.FC = () => {
  const { createLead } = useLeads();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  const industries = [
    'Technology & SaaS', 'Financial Services & Banking', 'Manufacturing & Robotics', 
    'Healthcare & Biotech', 'Retail & E-Commerce', 'Logistics & Supply Chain', 'Other'
  ];

  const revenues = ['$1M - $5M', '$5M - $10M', '$10M - $50M', '$50M - $100M', '$100M+'];
  const sizes = ['1-50 employees', '50-100 employees', '100-250 employees', '250-500 employees', '500+ employees'];
  const budgets = ['$10,000 - $25,000', '$25,000 - $75,000', '$75,000 - $150,000', '$150,000+ (VIP Tier)'];
  const times = ['Morning (9AM - 12PM EST)', 'Afternoon (1PM - 4PM EST)', 'Evening (5PM+ EST)', 'Anytime'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDuplicateError(null);

    const fd = new FormData(e.currentTarget);
    const data = {
      firstName: fd.get('firstName') as string,
      lastName: fd.get('lastName') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
      company: fd.get('company') as string,
      website: fd.get('website') as string,
      industry: fd.get('industry') as string,
      jobTitle: fd.get('jobTitle') as string,
      revenue: fd.get('revenue') as string,
      companySize: fd.get('companySize') as string,
      budget: fd.get('budget') as string,
      country: fd.get('country') as string,
      city: fd.get('city') as string,
      productInterest: fd.get('productInterest') as string,
      message: fd.get('message') as string,
      preferredContactTime: fd.get('preferredContactTime') as string
    };

    const result = await createLead(data);
    setIsSubmitting(false);

    if (result.success) {
      setSubmittedSuccess(true);
    } else {
      setDuplicateError(result.error || 'Duplicate detected.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-24 pb-16 text-center px-4 border-b border-slate-800">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">INTELLIGENT LEAD CAPTURE DEMO</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mt-3 text-white">
          Experience Autonomous <br /> Anji Somisetti AI Qualification
        </h1>
        <p className="mt-6 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
          Submit this comprehensive enterprise form. Watch duplicate detection, predictive lead scoring (0-100), and Salesforce Lead record generation happen instantly.
        </p>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        
        {duplicateError && (
          <div className="mb-8 p-6 rounded-2xl bg-amber-950/80 border border-amber-500/60 text-amber-100 flex items-start gap-4 animate-in slide-in-from-top duration-300">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm uppercase font-mono tracking-wider">⚡ CRM Duplicate Shield Activated</h4>
              <p className="text-xs mt-1 leading-relaxed">{duplicateError}</p>
              <p className="text-[11px] font-mono text-amber-300 mt-2">Fuzzy matching prevented duplicate Salesforce Lead object creation.</p>
            </div>
          </div>
        )}

        {submittedSuccess ? (
          <div className="bg-slate-900 rounded-3xl p-12 text-center border border-emerald-500/50 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-3xl font-extrabold text-white">Lead Successfully Captured &amp; Scored!</h3>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto text-sm leading-relaxed">
              Our Anji Somisetti AI engine calculated your score and instantly dispatched BDR notifications via simulated SMS. Check the live CRM Dashboard to inspect your record.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button onClick={() => navigate('/dashboard')} className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl">
                Open CRM Dashboard
              </button>
              <button onClick={() => setSubmittedSuccess(false)} className="px-8 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm">
                Submit Another Lead
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative">
            
            <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-500" />
                <span className="font-bold text-base text-white">Enterprise Prospect Qualification Form</span>
              </div>
              <span className="text-xs font-mono text-emerald-400">⚡ AUTOSCORING ENABLED</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 text-sm">
              
              {/* Row 1: Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">First Name *</label>
                  <input required name="firstName" defaultValue="Marcus" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Last Name *</label>
                  <input required name="lastName" defaultValue="Vance" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                </div>
              </div>

              {/* Row 2: Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Corporate Email (@company.com) *</label>
                  <input required type="email" name="email" defaultValue={`mvance.${Math.floor(Math.random()*900)}@cloudscale.net`} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-mono text-xs" />
                  <span className="text-[11px] text-slate-500 mt-1 block">Tip: Use duplicate email s.jenkins@acmerobotics.io to test duplicate detection.</span>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Phone Number *</label>
                  <input required name="phone" defaultValue="+1 (415) 882-9910" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-mono text-xs" />
                </div>
              </div>

              {/* Row 3: Firmographics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Company Name *</label>
                  <input required name="company" defaultValue="CloudScale Global" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Website URL</label>
                  <input name="website" defaultValue="https://cloudscale.net" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-mono text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Job Title *</label>
                  <input required name="jobTitle" defaultValue="Chief Information Officer" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                </div>
              </div>

              {/* Row 4: Selects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Industry *</label>
                  <select name="industry" defaultValue="Technology & SaaS" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-white focus:border-blue-500 focus:outline-none">
                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Annual Revenue *</label>
                  <select name="revenue" defaultValue="$50M - $100M" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-white focus:border-blue-500 focus:outline-none">
                    {revenues.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Company Size</label>
                  <select name="companySize" defaultValue="250-500 employees" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-white focus:border-blue-500 focus:outline-none">
                    {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-blue-400 uppercase font-semibold mb-2">Project Budget *</label>
                  <select name="budget" defaultValue="$150,000+ (VIP Tier)" className="w-full bg-slate-950 border border-blue-500/40 rounded-xl px-3 py-3 text-white focus:border-blue-500 focus:outline-none font-bold">
                    {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 5: Location & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Country</label>
                  <input name="country" defaultValue="United States" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">City</label>
                  <input name="city" defaultValue="Seattle" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Preferred Contact Time</label>
                  <select name="preferredContactTime" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-white focus:border-blue-500 focus:outline-none">
                    {times.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 6: Interest & Message */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Product Module Interest</label>
                  <input name="productInterest" defaultValue="Agentforce Conversational AI & REST Sync" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Project Requirements / Notes</label>
                  <textarea name="message" rows={4} defaultValue="We need bi-directional sync with Salesforce Account objects and automated Slack alerting for Anji Somisetti AI scores above 85." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                <span className="text-xs text-slate-500 font-mono">
                  By submitting, you agree to our SOC2 Data Handling Policy.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-2xl shadow-blue-600/40 hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? 'Qualifying with Anji Somisetti AI...' : 'Submit Enterprise Lead'} <Send className="w-5 h-5" />
                </button>
              </div>

            </form>
          </div>
        )}

      </section>

      <Footer />
    </div>
  );
};
