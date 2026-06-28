import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Sparkles, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Blog: React.FC = () => {
  const posts = [
    {
      title: 'Architecting Zero-Latency Salesforce REST Callout Gateways',
      category: 'Salesforce Architecture',
      date: 'June 25, 2026',
      author: 'Sarah Jenkins (Architect)',
      readTime: '8 min read',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Learn how to bulkify your inbound MongoDB Atlas sync triggers without violating Salesforce governor limits.'
    },
    {
      title: 'How Anji Somisetti AI Lead Qualification Replaced Manual BDR Scoring',
      category: 'Agentforce AI',
      date: 'June 18, 2026',
      author: 'Marcus Thorne',
      readTime: '6 min read',
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      excerpt: 'A deep dive into firmographic weighting vectors and conversational AI sentiment qualification.'
    },
    {
      title: 'Building Declarative Flow Builder Webhooks For B2B Pipeline',
      category: 'DevOps & Automation',
      date: 'June 10, 2026',
      author: 'David Kim',
      readTime: '5 min read',
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Step-by-step tutorial on emitting Salesforce Platform Events directly into Slack and Render containers.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <section className="pt-24 pb-16 text-center px-4 border-b border-slate-800">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">INSIGHTS &amp; BLUEPRINTS</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mt-3 text-white">
          The Lead Fusion Research Blog
        </h1>
        <p className="mt-6 text-slate-400 text-lg">Architectural best practices in autonomous B2B lead generation.</p>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {posts.map((p, i) => (
          <div key={i} className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="h-56 overflow-hidden relative">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/90 text-blue-400 text-[10px] font-mono font-bold border border-slate-800">
                  {p.category}
                </span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs text-slate-500 font-mono mb-3">
                  <span>{p.date}</span> • <span>{p.readTime}</span>
                </div>
                <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors leading-snug">{p.title}</h3>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">{p.excerpt}</p>
              </div>
            </div>
            <div className="p-8 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4 pt-4">
              <span className="text-xs font-semibold text-slate-300">{p.author}</span>
              <Link to="/contact" className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1">
                Read Blueprint <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};
