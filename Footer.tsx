import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Database, Cloud, Zap, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-800/80">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">Lead Fusion</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Enterprise AI Lead Generation Platform engineered for high conversion velocity. Natively integrated with Salesforce Lightning CRM, Agentforce AI, and MongoDB Atlas clusters.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                SOC2 Type II Certified
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-blue-400 font-mono">
                <Database className="w-3.5 h-3.5" />
                99.99% SLA
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 font-mono">Product Suite</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/features" className="hover:text-white transition-colors">Anji Somisetti AI Scoring</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">CRM Analytics Dashboard</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Intelligent Lead Forms</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Enterprise Pricing</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Security & FAQ</Link></li>
            </ul>
          </div>

          {/* Architecture Links */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 font-mono">Salesforce Hub</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/salesforce" className="hover:text-white transition-colors">Apex Trigger Handlers</Link></li>
              <li><Link to="/flow-builder" className="hover:text-white transition-colors">Flow Builder Engine</Link></li>
              <li><Link to="/salesforce" className="hover:text-white transition-colors">SOQL Query Console</Link></li>
              <li><Link to="/help-center" className="hover:text-white transition-colors">ER Diagrams & Docs</Link></li>
              <li><Link to="/help-center" className="hover:text-white transition-colors">REST API Docs</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 font-mono">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Lead Fusion</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Research Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Sales</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Create Account</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Executive Sign In</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Lead Fusion Enterprise Systems Corp. All rights reserved. Inspired by Salesforce & Stripe design standards.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Blueprint</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
