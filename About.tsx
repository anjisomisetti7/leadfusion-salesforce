import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Sparkles, Target, Shield, Users, Award, Building2, Globe2 } from 'lucide-react';

export const About: React.FC = () => {
  const leadership = [
    { name: 'Sarah Jenkins', role: 'Chief Executive Officer', exp: 'Ex-Salesforce AI Architect', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80' },
    { name: 'Marcus Thorne', role: 'Chief Revenue Officer', exp: 'Ex-Stripe Enterprise Growth', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80' },
    { name: 'Elena Rodriguez', role: 'VP of AI Engineering', exp: 'Ex-DeepMind Lead Scientist', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80' },
    { name: 'David Kim', role: 'Head of Infrastructure', exp: 'Ex-Vercel Core Systems', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-20 border-b border-slate-800 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">OUR MISSION & ORIGIN</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mt-3 text-white">
            Architecting The Future Of <br /> Autonomous B2B Sales
          </h1>
          <p className="mt-6 text-slate-400 text-lg leading-relaxed">
            Founded in San Francisco in 2024 by veteran Salesforce architects and Stripe engineers, Lead Fusion was built to solve a single glaring problem: manual lead qualification is broken.
          </p>
        </div>
      </section>

      {/* Story & Values */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-800">
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <Target className="w-10 h-10 text-blue-500 mb-6" />
          <h3 className="text-xl font-bold text-white mb-3">Zero Data Loss Velocity</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Every prospect touchpoint is instantly ingested, validated against MongoDB clusters, and synced bi-directionally to Salesforce CRM objects in under 50 milliseconds.
          </p>
        </div>
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <Sparkles className="w-10 h-10 text-indigo-500 mb-6" />
          <h3 className="text-xl font-bold text-white mb-3">Agentforce AI Native</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            We don't rely on simple keyword regex. Our Anji Somisetti AI qualification engines analyze corporate domain reputation, web velocity, and budget firmographics autonomously.
          </p>
        </div>
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <Shield className="w-10 h-10 text-emerald-500 mb-6" />
          <h3 className="text-xl font-bold text-white mb-3">Enterprise Grade Security</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            SOC2 Type II compliance, strict RBAC permissions, bcrypt encryption, and immutable audit logging ensure your corporate data is bulletproof.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 mb-2">EXECUTIVE TEAM</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white">World Class Engineering & Sales Leadership</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadership.map((member, i) => (
            <div key={i} className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 text-center group">
              <div className="h-64 overflow-hidden relative">
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg text-white">{member.name}</h4>
                <p className="text-xs text-blue-400 font-semibold mt-1">{member.role}</p>
                <p className="text-[11px] font-mono text-slate-500 mt-2">{member.exp}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
