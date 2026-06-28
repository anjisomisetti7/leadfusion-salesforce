import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { 
  Sparkles, ArrowRight, CheckCircle2, Bot, ShieldCheck, 
  Workflow, Cpu, BarChart3, Users, Zap, Building2, Star, 
  TrendingUp, Layers, RefreshCw, Check 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const companies = ['Salesforce', 'Stripe', 'HubSpot', 'Linear', 'Notion', 'Vercel', 'Microsoft'];

  const features = [
    {
      title: 'Somisetti AI Lead Scoring',
      desc: 'Predictive 0-100 scoring based on domain reputation, engagement velocity, and firmographics.',
      icon: Sparkles,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      title: 'Native Salesforce Lightning Gateway',
      desc: 'Zero-latency bi-directional sync across Lead, Account, Opportunity, and Task objects.',
      icon: Cpu,
      color: 'from-indigo-600 to-violet-600'
    },
    {
      title: 'Flow Builder Engine',
      desc: 'Visual record-triggered automation dispatching sales reps and custom email follow-ups.',
      icon: Workflow,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Agentforce Conversational AI',
      desc: 'Floating chatbot that qualifies prospects 24/7 and books executive walkthroughs.',
      icon: Bot,
      color: 'from-emerald-600 to-teal-600'
    },
    {
      title: 'Real-Time Duplicate Shield',
      desc: 'Automatic fuzzy duplicate detection guarding your CRM data integrity.',
      icon: ShieldCheck,
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Enterprise Analytics Dashboard',
      desc: 'Executive pipeline Recharts tracking revenue attribution and conversion velocity.',
      icon: BarChart3,
      color: 'from-purple-600 to-pink-600'
    }
  ];

  const testimonials = [
    {
      quote: "Lead Fusion reduced our inbound lead qualification time from 4 hours to 45 seconds. The bi-directional sync with our Salesforce Lightning Org is flawless.",
      author: "Sarah Jenkins",
      role: "VP of Enterprise Engineering",
      company: "Acme Robotics Global",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "The Somisetti AI fit scores are shockingly accurate. Our BDRs only focus on Tier 1 Hot leads now, boosting our conversion rate by 34%.",
      author: "Marcus Thorne",
      role: "Chief Revenue Officer",
      company: "CloudScale Inc.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "Looks and feels exactly like software built by Stripe or Linear. The visual Flow Builder made automating custom AE email alerts effortless.",
      author: "Elena Rodriguez",
      role: "Director of Growth Operations",
      company: "Fintech Solutions EMEA",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden border-b border-slate-800">
        
        {/* Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-blue-500/30 text-blue-400 text-xs font-mono mb-8 shadow-xl">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>ANNUAL ENTERPRISE RELEASE v4.2 • AGENTFORCE READY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1]">
            Turn Inbound Traffic Into <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Salesforce Qualified Pipeline
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            The AI-Powered Lead Generation platform engineered for enterprise speed. Capture prospects via intelligent forms, score with Anji Somisetti AI, automatically dispatch BDRs, and sync natively with MongoDB Atlas & Salesforce Lightning.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/register" 
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-2xl shadow-blue-600/40 hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              Get Started Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-base transition-all flex items-center justify-center gap-2"
            >
              Test Intelligent Lead Capture
            </Link>
          </div>

          {/* Trusted Companies Banner */}
          <div className="mt-20 pt-10 border-t border-slate-900">
            <p className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-6 font-semibold">
              TRUSTED BY ARCHITECTS AT LEADING TECH COMPANIES
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-50 grayscale hover:grayscale-0 transition-all">
              {companies.map(c => (
                <span key={c} className="text-lg sm:text-2xl font-bold tracking-tighter text-slate-300 font-mono">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Animated Interactive Preview Mockup */}
          <div className="mt-16 rounded-3xl p-3 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 shadow-2xl max-w-5xl mx-auto text-left relative overflow-hidden">
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-850">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="ml-4 text-xs font-mono text-slate-500">nexusai.enterprise/lightning-hub</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  REST Sync: ACTIVE
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono text-slate-400">⚡ INBOUND CAPTURE</span>
                  <p className="text-base font-bold text-white mt-1">Acme Robotics Corp</p>
                  <p className="text-xs text-slate-400 mt-0.5">VP Eng Sarah Jenkins</p>
                  <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-blue-400">Budget: $150k+</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">Verified</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/30 p-5 rounded-2xl border border-blue-500/40">
                  <span className="text-xs font-mono text-blue-300">🧠 ANJI SOMISETTI AI SCORE</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-extrabold text-white">98</span>
                    <span className="text-xs text-blue-300 font-mono">/100 (Tier 1 Hot)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-blue-400 h-full w-[98%]"></div>
                  </div>
                  <p className="text-[11px] text-blue-200 mt-2">92% closing probability prediction</p>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono text-indigo-400">☁️ SALESFORCE CRM</span>
                  <p className="text-xs font-mono text-slate-300 mt-2">ID: <span className="text-amber-400">00Q8a000XYZ</span></p>
                  <p className="text-xs text-slate-400 mt-1">Owner: Senior AE Marcus T.</p>
                  <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md">
                    Trigger Follow-up Flow
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">84%</div>
              <p className="text-sm text-slate-400 mt-2 font-medium">Faster Lead Qualification</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-400 tracking-tight">2.8k+</div>
              <p className="text-sm text-slate-400 mt-2 font-medium">Daily Salesforce Orgs Synced</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight">$1.2M</div>
              <p className="text-sm text-slate-400 mt-2 font-medium">Avg Pipeline Generated Per User</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-purple-400 tracking-tight">99.99%</div>
              <p className="text-sm text-slate-400 mt-2 font-medium">Enterprise Uptime SLA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 mb-3">
              ENTERPRISE ARCHITECTURE
            </h2>
            <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Built Like Stripe. Powered By Salesforce.
            </h3>
            <p className="mt-4 text-slate-400 text-base sm:text-lg">
              Every micro-interaction and backend REST callout is crafted to maximize enterprise revenue conversion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div 
                  key={idx}
                  className="bg-slate-900/80 rounded-3xl p-8 border border-slate-800/80 hover:border-blue-500/50 transition-all hover:-translate-y-1 group flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${f.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{f.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-blue-400 group-hover:text-blue-300">
                    <span>EXPLORE MODULE</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 mb-2">
              CUSTOMER TESTIMONIALS
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">Loved By Sales & DevOps Leaders</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-950 p-8 rounded-3xl border border-slate-800 relative flex flex-col justify-between">
                <div className="flex gap-1 mb-6 text-amber-400">
                  {[...Array(5)].map((_, si) => <Star key={si} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic mb-8">"{t.quote}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-900">
                  <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full object-cover border-2 border-blue-600" />
                  <div>
                    <p className="text-sm font-bold text-white">{t.author}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                    <p className="text-[11px] font-mono text-blue-400 mt-0.5">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative text-center px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 sm:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready To Supercharge Your <br /> Salesforce Lead Generation?
          </h2>
          <p className="mt-6 text-blue-100 text-lg max-w-2xl mx-auto">
            Deploy your AI chatbot and intelligent lead forms in under 3 minutes. Natively integrated with Salesforce & MongoDB.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/register" 
              className="px-8 py-4 rounded-2xl bg-white text-blue-700 font-extrabold text-base shadow-2xl hover:bg-slate-100 transition-all hover:scale-105"
            >
              Get Started Free Now
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 rounded-2xl bg-blue-800/80 hover:bg-blue-800 text-white font-bold text-base border border-white/20 transition-all"
            >
              Request Enterprise Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
