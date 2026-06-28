import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Check, Sparkles, Zap, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: 'Starter',
      price: isAnnual ? '$399' : '$499',
      desc: 'Ideal for growing B2B teams automating initial lead capture.',
      features: ['Up to 2,500 AI Scored Leads/mo', 'Basic Salesforce Lead Sync', 'Standard Lead Form Builder', 'Email Alerts & Toasts', 'Standard SLA Support'],
      cta: 'Get Started Now',
      popular: false
    },
    {
      name: 'Professional',
      price: isAnnual ? '$799' : '$999',
      desc: 'Engineered for mid-market sales teams scaling inbound pipeline.',
      features: ['Up to 10,000 AI Scored Leads/mo', 'Bi-Directional Salesforce Sync', 'Anji Somisetti AI Outreach Drafts', 'Flow Builder Automation Rules', 'Real-Time Duplicate Detection', 'Dedicated Account Manager'],
      cta: 'Upgrade To Professional',
      popular: true
    },
    {
      name: 'Enterprise',
      price: isAnnual ? '$1,899' : '$2,299',
      desc: 'Maximum throughput for enterprise organizations requiring custom SLAs.',
      features: ['Unlimited AI Scored Leads', 'Custom Apex Trigger Integration', 'Agentforce 24/7 AI Chatbot', 'MongoDB Atlas Dedicated Tier', 'SOC2 Type II Audit Reports', '24/7 Priority Phone Support'],
      cta: 'Contact Sales Enterprise',
      popular: false
    }
  ];

  const faqs = [
    { q: 'How does Salesforce synchronization work?', a: 'We utilize standard REST Bulk API Gateway callouts with zero governor limit violations. Records sync bi-directionally in near real-time.' },
    { q: 'Can I test the Anji Somisetti AI without connecting Salesforce?', a: 'Yes! Our standalone sandbox mode stores leads securely in MongoDB Atlas clusters so you can evaluate AI fit scores immediately.' },
    { q: 'Is there a contract lock-in?', a: 'No. You can cancel or change pricing tiers at any time from your executive Settings dashboard.' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-24 pb-20 text-center px-4">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">TRANSPARENT ENTERPRISE PRICING</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mt-3 text-white">
          Predictable Pricing For <br /> Unstoppable Sales Growth
        </h1>
        <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto">
          Every tier includes instant access to our Anji Somisetti AI qualification engine.
        </p>

        {/* Billing Toggle */}
        <div className="mt-10 inline-flex items-center gap-4 bg-slate-900 p-2 rounded-full border border-slate-800">
          <button 
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${!isAnnual ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400'}`}
          >
            Monthly Billing
          </button>
          <button 
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${isAnnual ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400'}`}
          >
            Annual Billing <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px]">Save 20%</span>
          </button>
        </div>
      </section>

      {/* Tiers Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((t, i) => (
          <div 
            key={i}
            className={`rounded-3xl p-8 border relative flex flex-col justify-between transition-all duration-300 ${
              t.popular 
                ? 'bg-gradient-to-b from-slate-900 to-slate-850 border-blue-500 shadow-2xl shadow-blue-500/20 md:-translate-y-4' 
                : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            {t.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold font-mono tracking-wider shadow-lg">
                ⚡ MOST POPULAR
              </span>
            )}

            <div>
              <h3 className="text-2xl font-bold text-white">{t.name}</h3>
              <p className="text-xs text-slate-400 mt-2 min-h-[32px]">{t.desc}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-white tracking-tight">{t.price}</span>
                <span className="text-xs text-slate-400 font-mono">/month</span>
              </div>

              <ul className="mt-8 space-y-3.5 pt-8 border-t border-slate-800 text-sm text-slate-300">
                {t.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <Link 
                to="/register"
                className={`w-full py-4 rounded-2xl font-bold text-sm block text-center transition-all ${
                  t.popular ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {t.cta}
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* FAQ Preview */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6">
        <h3 className="text-2xl font-bold text-white text-center mb-12">Frequently Asked Questions</h3>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h4 className="font-bold text-base text-white">{faq.q}</h4>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
