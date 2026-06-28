import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useLeads } from '../context/LeadContext';
import { 
  Sparkles, TrendingUp, TrendingDown, Globe, Building2, Users, DollarSign, 
  BarChart3, PieChart as PieChartIcon, Filter, Download, RefreshCw, Clock, 
  ShieldCheck, AlertTriangle, CheckCircle, ArrowRight, Search, FileText, 
  Printer, Sun, Moon, HelpCircle, X, Send, Zap, Flame, Target, Award, 
  Briefcase, Radio, Layers, Activity, ChevronDown, MapPin, Share2
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, 
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
import { Link } from 'react-router-dom';

// Type definitions for AI Market Studio
interface TrendingProduct {
  id: string;
  name: string;
  totalLeads: number;
  convRate: number;
  growth: number;
  trend: 'UP' | 'DOWN';
}

interface TrendingIndustry {
  name: string;
  leads: number;
  qualified: number;
  growth: number;
  insight: string;
}

interface Opportunity {
  id: string;
  type: string;
  title: string;
  customer: string;
  val: string;
  prob: string;
  badge: string;
}

interface Recommendation {
  id?: string;
  text: string;
  type?: string;
  priority?: string;
  tag?: string;
  score?: string;
}

export const AIInsights: React.FC = () => {
  const { leads, stats } = useLeads();

  // Theme & UI state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CHARTS' | 'GEO' | 'OPPORTUNITIES' | 'FORECAST'>('OVERVIEW');
  const [activeChartType, setActiveChartType] = useState<'AREA' | 'BAR' | 'LINE' | 'DONUT' | 'RADAR' | 'FUNNEL' | 'HEATMAP'>('AREA');
  
  // Filter state
  const [timeFilter, setTimeFilter] = useState<string>('Last 30 Days');
  const [countryFilter, setCountryFilter] = useState<string>('ALL');
  const [industryFilter, setIndustryFilter] = useState<string>('ALL');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');
  const [repFilter, setRepFilter] = useState<string>('ALL');
  const [productFilter, setProductFilter] = useState<string>('ALL');

  // Real-time state
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(30);
  const [liveLeadCounter, setLiveLeadCounter] = useState<number>(2842);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  
  // Data state loaded from server
  const [marketData, setMarketData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    { text: "Healthcare companies have shown the highest conversion rate today (+42.8%).", tag: "INSIGHT", score: "High Velocity" },
    { text: "LinkedIn campaigns generated the most qualified enterprise leads (+310% ROI).", tag: "STRATEGY", score: "Top Channel" },
    { text: "Leads requesting live demos convert 45% faster than standard ebook downloads.", tag: "VELOCITY", score: "SLA Boost" },
    { text: "Technology companies are expected to generate 14 more opportunities this week.", tag: "FORECAST", score: "Pipeline Growth" },
    { text: "Increase marketing allocation for Google Ads by 15% to capture APAC traffic.", tag: "ACTION", score: "Budget Allocation" }
  ]);

  // Explain Modal State
  const [selectedExplainLead, setSelectedExplainLead] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch real-time insights from backend REST API
  const fetchInsights = async () => {
    try {
      const queryParams = new URLSearchParams({
        filter: timeFilter,
        industry: industryFilter,
        country: countryFilter
      }).toString();
      const res = await fetch(`/api/market-insights?${queryParams}`);
      if (res.ok) {
        const data = await res.json();
        setMarketData(data);
      }
    } catch (err) {
      console.error('Failed to load market insights:', err);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [timeFilter, industryFilter, countryFilter]);

  // Real-time counter & countdown timer
  useEffect(() => {
    if (!autoRefresh) return;
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          fetchInsights();
          setLiveLeadCounter(c => c + Math.floor(Math.random() * 3) + 1);
          showToast('Real-time Salesforce & AI Market data refreshed');
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [autoRefresh, timeFilter]);

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Trigger Gemini AI Live Analyzer
  const handleRunAIAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/market-insights/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customPrompt, filter: timeFilter })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.recommendations) {
          setRecommendations(data.recommendations);
          showToast('Gemini AI strategic recommendations updated!');
        }
      }
    } catch (err) {
      showToast('Error running Gemini live reasoning');
    } finally {
      setIsAnalyzing(false);
      setCustomPrompt('');
    }
  };

  // Export simulator
  const handleExport = (type: string) => {
    showToast(`Generating ${type} Market Intelligence Report... Download starting.`);
  };

  // Fallback default data if server response is pending
  const defaultProducts: TrendingProduct[] = marketData?.trendingProducts || [
    { id: 'p1', name: 'Agentforce Autonomous CRM Suite', totalLeads: 1420, convRate: 34.2, growth: 48.5, trend: 'UP' },
    { id: 'p2', name: 'Anji Somisetti Copilot Enterprise AI', totalLeads: 980, convRate: 29.8, growth: 38.1, trend: 'UP' },
    { id: 'p3', name: 'Salesforce Data Cloud Gateway', totalLeads: 740, convRate: 26.5, growth: 22.4, trend: 'UP' },
    { id: 'p4', name: 'MuleSoft Flow Builder Hub', totalLeads: 510, convRate: 21.4, growth: -4.2, trend: 'DOWN' },
    { id: 'p5', name: 'Tableau Pulse AI Studio', totalLeads: 420, convRate: 28.1, growth: 18.9, trend: 'UP' }
  ];

  const defaultIndustries: TrendingIndustry[] = marketData?.trendingIndustries || [
    { name: 'Healthcare & Life Sciences', leads: 840, qualified: 340, growth: 42.8, insight: 'Highest conversion rate today' },
    { name: 'Financial Services & Banking', leads: 790, qualified: 310, growth: 38.5, insight: 'Hot leads demoing Fraud Shield' },
    { name: 'Information Technology', leads: 920, qualified: 390, growth: 31.2, insight: 'SaaS buyers prioritizing vector data' },
    { name: 'Manufacturing & Logistics', leads: 540, qualified: 180, growth: 18.4, insight: 'Predictive telemetry expansion' },
    { name: 'Retail & E-Commerce', leads: 610, qualified: 210, growth: 24.1, insight: 'Reducing cart abandonment' }
  ];

  const defaultSources = marketData?.leadSources || [
    { source: 'LinkedIn Ads & Outreach', leads: 820, qualified: 360, convRate: 43.9, roi: '+310%' },
    { source: 'Google Organic Search', leads: 1140, qualified: 380, convRate: 33.3, roi: '+480%' },
    { source: 'AI Autonomous Chatbot', leads: 640, qualified: 310, convRate: 48.4, roi: '+620%' },
    { source: 'Direct Website Visitors', leads: 710, qualified: 210, convRate: 29.5, roi: '+240%' },
    { source: 'Executive Email Campaigns', leads: 490, qualified: 180, convRate: 36.7, roi: '+390%' }
  ];

  const salesPerf = marketData?.salesPerformance || {
    today: { revenue: 48500, leads: 24, qualified: 11, closed: 4, growth: '+18.4%' },
    thisWeek: { revenue: 215000, leads: 142, qualified: 68, closed: 19, growth: '+24.1%' },
    thisMonth: { revenue: 890000, leads: 580, qualified: 274, closed: 82, growth: '+34.8%' },
    thisYear: { revenue: 10450000, leads: 6840, qualified: 3120, closed: 940, growth: '+48.2%' }
  };

  const aiForecast = marketData?.aiForecast || {
    tomorrowLeads: 32,
    weeklyLeads: 184,
    monthlyRevenue: '$1,150,000',
    quarterlyGrowth: '+32.8%',
    annualSales: '$14.2M',
    confidencePercentage: 94.8
  };

  const opps: Opportunity[] = marketData?.opportunities || [
    { id: 'op1', type: 'ENTERPRISE_CLIENT', title: 'Acme Global BioTech Expansion', customer: 'Dr. Aris Thorne', val: '$240,000', prob: '96%', badge: 'High-Value Enterprise' },
    { id: 'op2', type: 'LIKELY_CONVERT', title: 'Apex Vector Hub Upgrade', customer: 'Elena Rostova', val: '$115,000', prob: '92%', badge: 'Hot Velocity' },
    { id: 'op3', type: 'REPEAT_BUYER', title: 'Agentforce Seat Expansion x50', customer: 'Marcus Vance', val: '$85,000', prob: '89%', badge: 'Returning Buyer' },
    { id: 'op4', type: 'CHURN_RISK', title: 'Legacy Flow Builder Migration', customer: 'Global Logistics Inc', val: '$60,000', prob: '14%', badge: 'Intervention Needed' }
  ];

  const pieColors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899'];

  return (
    <DashboardLayout>
      <div className={`min-h-screen pb-16 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} rounded-3xl p-4 sm:p-8 space-y-8 animate-in fade-in duration-300 relative`}>
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-8 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin-once" />
            <span className="text-xs font-bold font-mono">{toastMessage}</span>
          </div>
        )}

        {/* Sticky Executive Glassmorphic Header */}
        <div className={`sticky top-0 z-40 backdrop-blur-xl ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'} border-b pb-6 pt-2 transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-6`}>
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-blue-500 font-bold mb-1">
              <Radio className="w-4 h-4 animate-pulse text-emerald-500" />
              SALESFORCE LIGHTNING PREDICTIVE ENGINE • REALTIME AI MARKET INSIGHTS
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-3">
              AI Market Insights &amp; Trending Sales
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 font-mono font-normal">
                GEMINI 2.5 LIVE
              </span>
            </h1>
          </div>

          {/* Controls Right Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Realtime Counter */}
            <div className={`px-4 py-2 rounded-2xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'} border flex items-center gap-2 text-xs font-mono`}>
              <Activity className="w-3.5 h-3.5 text-emerald-500 animate-bounce" />
              <span>LIVE LEADS:</span>
              <strong className="text-blue-500 text-sm font-bold">{liveLeadCounter.toLocaleString()}</strong>
            </div>

            {/* Auto Refresh Toggle */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-2 border transition-all ${
                autoRefresh ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title="Toggle Real-Time Salesforce Telemetry Sync"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? `${countdown}s REFRESH` : 'PAUSED'}
            </button>

            {/* Dark Mode / Light Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-white border-slate-300 text-slate-700 shadow-sm'}`}
              title="Switch Visual Appearance"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Export Menu */}
            <div className="flex items-center gap-1 bg-blue-600/10 border border-blue-500/30 rounded-xl p-1">
              <button onClick={() => handleExport('PDF')} className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-blue-400 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1">
                <Download className="w-3 h-3" /> PDF
              </button>
              <button onClick={() => handleExport('Excel')} className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-1">
                <FileText className="w-3 h-3" /> XLS
              </button>
              <button onClick={() => handleExport('CSV')} className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all">
                CSV
              </button>
              <button onClick={() => handleExport('Print')} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all" title="Print Executive Summary">
                <Printer className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Comprehensive Multi-Dimensional Filters Bar */}
        <div className={`p-5 rounded-3xl backdrop-blur-md border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} flex flex-wrap items-center justify-between gap-4`}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
            <Filter className="w-4 h-4 text-blue-500" /> MULTI-GATEWAY FILTERS:
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Date Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono">TIME:</span>
              <select 
                value={timeFilter} 
                onChange={e => setTimeFilter(e.target.value)}
                className={`px-3 py-1.5 rounded-xl border font-bold text-xs focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
              >
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 90 Days">Last 90 Days</option>
                <option value="Custom Date">Custom Date Range</option>
              </select>
            </div>

            {/* Country Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono">COUNTRY:</span>
              <select 
                value={countryFilter} 
                onChange={e => setCountryFilter(e.target.value)}
                className={`px-3 py-1.5 rounded-xl border font-bold text-xs focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
              >
                <option value="ALL">All Regions</option>
                <option value="US">United States (Top)</option>
                <option value="GB">United Kingdom</option>
                <option value="DE">Germany</option>
                <option value="SG">Singapore</option>
                <option value="JP">Japan</option>
              </select>
            </div>

            {/* Industry Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono">INDUSTRY:</span>
              <select 
                value={industryFilter} 
                onChange={e => setIndustryFilter(e.target.value)}
                className={`px-3 py-1.5 rounded-xl border font-bold text-xs focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
              >
                <option value="ALL">All Sectors</option>
                <option value="Healthcare & Life Sciences">Healthcare</option>
                <option value="Financial Services & Banking">Finance</option>
                <option value="Information Technology">Information Tech</option>
                <option value="Manufacturing & Logistics">Manufacturing</option>
                <option value="Retail & E-Commerce">Retail</option>
                <option value="Education & EdTech">Education</option>
              </select>
            </div>

            {/* Lead Source Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono">SOURCE:</span>
              <select 
                value={sourceFilter} 
                onChange={e => setSourceFilter(e.target.value)}
                className={`px-3 py-1.5 rounded-xl border font-bold text-xs focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
              >
                <option value="ALL">All Channels</option>
                <option value="LinkedIn">LinkedIn Ads</option>
                <option value="Google">Google Search</option>
                <option value="AI Chatbot">AI Chatbot</option>
                <option value="Website">Website</option>
              </select>
            </div>

            {/* Sales Rep Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono">REP:</span>
              <select 
                value={repFilter} 
                onChange={e => setRepFilter(e.target.value)}
                className={`px-3 py-1.5 rounded-xl border font-bold text-xs focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
              >
                <option value="ALL">All AEs</option>
                <option value="Marcus Thorne">Marcus Thorne</option>
                <option value="Sarah Jenkins">Sarah Jenkins</option>
                <option value="Elena Rostova">Elena Rostova</option>
              </select>
            </div>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-2">
          {[
            { id: 'OVERVIEW', label: '🔥 Market Overview & Trends', icon: Sparkles },
            { id: 'CHARTS', label: '📉 Interactive Chart Studio (10 Types)', icon: BarChart3 },
            { id: 'GEO', label: '🌍 World Geo Hotspots', icon: Globe },
            { id: 'OPPORTUNITIES', label: '⚡ AI Opportunity Radar', icon: Zap },
            { id: 'FORECAST', label: '📅 AI Sales Forecast', icon: Target }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400' 
                  : `${isDarkMode ? 'bg-slate-900 hover:bg-slate-800 text-slate-400' : 'bg-slate-200/60 hover:bg-slate-200 text-slate-600'}`
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* 📊 Sales Performance Section (KPI Grid) */}
            <div>
              <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" /> SALES PERFORMANCE MATRIX
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Today's Sales", data: salesPerf.today, badge: 'REALTIME' },
                  { title: "This Week", data: salesPerf.thisWeek, badge: 'ACTIVE' },
                  { title: "This Month", data: salesPerf.thisMonth, badge: 'SYNCED' },
                  { title: "This Year (YTD)", data: salesPerf.thisYear, badge: 'ENTERPRISE' }
                ].map((item, idx) => (
                  <div key={idx} className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} relative overflow-hidden group hover:border-blue-500/50 transition-all`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-slate-400 font-bold">{item.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">{item.badge}</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-500 mb-4">
                      ${item.data.revenue.toLocaleString()}
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/60 text-center">
                      <div>
                        <div className="text-[10px] font-mono text-slate-400">LEADS</div>
                        <div className="font-bold text-xs">{item.data.leads}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-slate-400">QUALIFIED</div>
                        <div className="font-bold text-xs text-emerald-400">{item.data.qualified}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-slate-400">GROWTH</div>
                        <div className="font-bold text-xs text-blue-400">{item.data.growth}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🔥 Trending Products Table */}
            <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-500 animate-bounce" /> 🔥 Trending Products &amp; Offerings
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Products generating highest lead velocity and Anji Somisetti AI conversion probability</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                  TOP PRODUCT: AGENTFORCE CRM
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-xs font-mono uppercase tracking-wider`}>
                      <th className="py-4 px-4">Product Name</th>
                      <th className="py-4 px-4 text-center">Total Leads</th>
                      <th className="py-4 px-4 text-center">Conversion Rate</th>
                      <th className="py-4 px-4 text-center">Growth %</th>
                      <th className="py-4 px-4 text-right">Trend Indicator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs">
                    {defaultProducts.map(prod => (
                      <tr key={prod.id} className={`hover:${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50'} transition-colors group`}>
                        <td className="py-4 px-4 font-bold font-sans text-sm flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 font-mono text-xs">{prod.id.toUpperCase()}</div>
                          {prod.name}
                        </td>
                        <td className="py-4 px-4 text-center font-mono font-bold text-sm">{prod.totalLeads.toLocaleString()}</td>
                        <td className="py-4 px-4 text-center font-mono font-bold text-emerald-400">{prod.convRate}%</td>
                        <td className="py-4 px-4 text-center font-mono font-bold text-blue-400">+{prod.growth}%</td>
                        <td className="py-4 px-4 text-right">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-mono text-xs font-bold ${
                            prod.trend === 'UP' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'
                          }`}>
                            {prod.trend === 'UP' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                            {prod.trend}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 📈 Trending Industries & 📢 Trending Lead Sources Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Trending Industries */}
              <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} space-y-6`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-indigo-400" /> 📈 Trending Industries
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">QUALIFIED LEADS</span>
                </div>

                <div className="space-y-4">
                  {defaultIndustries.map((ind, i) => (
                    <div key={i} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'} space-y-2 hover:border-blue-500/40 transition-all`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{ind.name}</span>
                        <div className="flex items-center gap-3 font-mono text-xs">
                          <span className="text-emerald-400 font-bold">{ind.qualified} QLs</span>
                          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold">+{ind.growth}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 bg-blue-500/5 p-2 rounded-xl border border-blue-500/10">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span><strong>AI Insight:</strong> {ind.insight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Lead Sources */}
              <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} space-y-6`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold flex items-center gap-2">
                    <Radio className="w-5 h-5 text-emerald-400" /> 📢 Trending Lead Sources
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">ROI ATTRIBUTION</span>
                </div>

                <div className="space-y-4">
                  {defaultSources.map((src, i) => (
                    <div key={i} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'} flex items-center justify-between gap-4`}>
                      <div>
                        <div className="font-bold text-sm text-slate-100 mb-1">{src.source}</div>
                        <div className="text-xs text-slate-400 font-mono">
                          {src.leads} Total • <span className="text-blue-400 font-bold">{src.qualified} Qualified</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-xs font-bold text-emerald-400">{src.convRate}% Conv</div>
                        <div className="text-xs font-mono font-extrabold text-amber-400 mt-0.5">{src.roi} ROI</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 🤖 AI Recommendations Studio & Anomaly Detector */}
            <div className={`p-8 rounded-3xl bg-gradient-to-br ${isDarkMode ? 'from-blue-950/40 via-slate-900 to-indigo-950/40 border-blue-500/30' : 'from-blue-50 via-white to-indigo-50 border-blue-200'} border shadow-2xl relative overflow-hidden space-y-6`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold mb-1">
                    <Sparkles className="w-4 h-4 animate-spin-once" /> GEMINI PREDICTIVE REASONING &amp; ANOMALY SHIELD
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-100">🤖 AI Recommendations &amp; Strategic Actions</h3>
                </div>
                <button 
                  onClick={() => setSelectedExplainLead({ company: 'Acme Robotics', aiScore: 98, status: 'HOT VIP', desc: 'Pricing page velocity x3 today. Domain IP matched Silicon Valley corporate subnet.' })}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-1.5 hover:brightness-110 transition-all self-start sm:self-auto"
                >
                  <HelpCircle className="w-4 h-4" /> Explain Why Lead is Hot/Warm/Cold
                </button>
              </div>

              {/* Gemini Live Prompt Analyzer */}
              <form onSubmit={handleRunAIAnalysis} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={customPrompt}
                    onChange={e => setCustomPrompt(e.target.value)}
                    placeholder="Ask AI Copilot for deep market reasoning (e.g., 'How can we increase EMEA closing velocity by 15%?')..."
                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-xs font-mono focus:outline-none focus:border-blue-500 ${
                      isDarkMode ? 'bg-slate-950/80 border-slate-800 text-white placeholder:text-slate-500' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {isAnalyzing ? 'Gemini Reasoning...' : 'Run Analysis'}
                </button>
              </form>

              {/* Recommendation Feed */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'} space-y-3 flex flex-col justify-between hover:border-blue-500/50 transition-all`}>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {rec.tag || 'AI INSIGHT'}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400">{rec.score || '+15% Win Rate'}</span>
                      </div>
                      <p className="text-xs leading-relaxed font-sans font-medium">{rec.text}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-blue-400">
                      <span>Agentforce Verified</span>
                      <Link to="/flow-builder" className="hover:underline flex items-center gap-1 font-bold">
                        Auto-Execute <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🏆 Leaderboards & 💼 Top Companies */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Leaderboards */}
              <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} space-y-6`}>
                <h3 className="text-lg font-extrabold flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" /> 🏆 Top Sales Representatives
                </h3>
                <div className="space-y-4">
                  {[
                    { rank: 1, name: 'Marcus Thorne', deals: 34, rev: '$1.24M', win: '68%' },
                    { rank: 2, name: 'Sarah Jenkins', deals: 29, rev: '$1.08M', win: '64%' },
                    { rank: 3, name: 'Elena Rostova', deals: 26, rev: '$920k', win: '61%' },
                    { rank: 4, name: 'David Kim', deals: 22, rev: '$810k', win: '59%' }
                  ].map(rep => (
                    <div key={rep.rank} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                          rep.rank === 1 ? 'bg-amber-400 text-slate-950' : rep.rank === 2 ? 'bg-slate-300 text-slate-900' : 'bg-amber-700 text-white'
                        }`}>{rep.rank}</span>
                        <div>
                          <div className="font-bold text-sm">{rep.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">{rep.deals} Closed Deals</div>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-xs font-bold text-emerald-400">{rep.rev}</div>
                        <div className="text-[10px] text-blue-400">{rep.win} Win Rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Companies */}
              <div className={`lg:col-span-2 p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} space-y-6`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-400" /> 💼 Top Enterprise Prospects
                  </h3>
                  <span className="text-xs font-mono text-blue-400">HIGH VALUE PIPELINE</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase">
                        <th className="py-3 px-3">Company Name</th>
                        <th className="py-3 px-3">Industry</th>
                        <th className="py-3 px-3 text-center">Lead Score</th>
                        <th className="py-3 px-3 text-center">Est. Revenue</th>
                        <th className="py-3 px-3 text-right">Conv. Probability</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {leads.slice(0, 5).map((ld, i) => (
                        <tr key={ld.id || i} className="hover:bg-slate-800/40">
                          <td className="py-3 px-3 font-bold text-sm">{ld.company || 'Acme Global'}</td>
                          <td className="py-3 px-3 text-slate-400">{ld.industry || 'Technology'}</td>
                          <td className="py-3 px-3 text-center font-mono font-bold text-amber-400">{ld.aiScore || 88}/100</td>
                          <td className="py-3 px-3 text-center font-mono font-bold text-emerald-400">{ld.revenue || '$50M+'}</td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-blue-400">96%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: INTERACTIVE CHARTS STUDIO */}
        {activeTab === 'CHARTS' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} space-y-6`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-2xl font-extrabold flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-blue-500" /> 📉 Interactive Charts &amp; Visualizers
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Switch between 10 dynamic charting models analyzing CRM telemetry. All charts support real-time filtering &amp; export.</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['AREA', 'BAR', 'LINE', 'DONUT', 'RADAR', 'FUNNEL'].map(type => (
                    <button
                      key={type}
                      onClick={() => setActiveChartType(type as any)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                        activeChartType === type ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Canvas */}
              <div className="h-96 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  {activeChartType === 'AREA' ? (
                    <AreaChart data={[
                      { month: 'Jan', revenue: 420, leads: 320, qualified: 140 },
                      { month: 'Feb', revenue: 480, leads: 380, qualified: 170 },
                      { month: 'Mar', revenue: 540, leads: 420, qualified: 195 },
                      { month: 'Apr', revenue: 610, leads: 490, qualified: 230 },
                      { month: 'May', revenue: 720, leads: 540, qualified: 260 },
                      { month: 'Jun', revenue: 890, leads: 610, qualified: 310 }
                    ]}>
                      <XAxis dataKey="month" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Revenue ($k)" />
                      <Area type="monotone" dataKey="leads" stroke="#10B981" fill="#10B981" fillOpacity={0.2} name="Total Leads" />
                    </AreaChart>
                  ) : activeChartType === 'BAR' ? (
                    <BarChart data={[
                      { ind: 'Healthcare', leads: 840, qualified: 340 },
                      { ind: 'Finance', leads: 790, qualified: 310 },
                      { ind: 'Tech', leads: 920, qualified: 390 },
                      { ind: 'Manufacturing', leads: 540, qualified: 180 },
                      { ind: 'Retail', leads: 610, qualified: 210 }
                    ]}>
                      <XAxis dataKey="ind" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="leads" fill="#3B82F6" name="Total Inbound" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="qualified" fill="#10B981" name="Anji Somisetti AI Qualified" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  ) : activeChartType === 'LINE' ? (
                    <LineChart data={[
                      { day: 'Mon', score: 82, conv: 24 },
                      { day: 'Tue', score: 88, conv: 28 },
                      { day: 'Wed', score: 91, conv: 34 },
                      { day: 'Thu', score: 89, conv: 31 },
                      { day: 'Fri', score: 96, conv: 42 },
                      { day: 'Sat', score: 94, conv: 39 }
                    ]}>
                      <XAxis dataKey="day" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#F59E0B" strokeWidth={3} name="Avg Lead Score" />
                      <Line type="monotone" dataKey="conv" stroke="#8B5CF6" strokeWidth={3} name="Conversion %" />
                    </LineChart>
                  ) : activeChartType === 'DONUT' ? (
                    <PieChart>
                      <Pie data={[
                        { name: 'LinkedIn Ads', value: 820 },
                        { name: 'Google Organic', value: 1140 },
                        { name: 'AI Chatbot', value: 640 },
                        { name: 'Direct Web', value: 710 },
                        { name: 'Email Outreach', value: 490 }
                      ]} innerRadius={80} outerRadius={130} paddingAngle={5} dataKey="value">
                        {pieColors.map((col, idx) => <Cell key={idx} fill={col} />)}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  ) : activeChartType === 'RADAR' ? (
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                      { subject: 'Lead Velocity', A: 92, B: 74 },
                      { subject: 'AI Scoring Fit', A: 96, B: 68 },
                      { subject: 'SLA Response', A: 88, B: 65 },
                      { subject: 'Deal Size', A: 94, B: 80 },
                      { subject: 'Retention Prob', A: 91, B: 72 },
                      { subject: 'Data Integrity', A: 99, B: 85 }
                    ]}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" stroke="#94A3B8" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Acme Workspace" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                      <Radar name="Industry Benchmark" dataKey="B" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                      <Legend />
                    </RadarChart>
                  ) : (
                    <BarChart layout="vertical" data={[
                      { stage: 'Unique Visitors', count: 18400 },
                      { stage: 'Captured Leads', count: 4820 },
                      { stage: 'AI Qualified', count: 2140 },
                      { stage: 'Demo Scheduled', count: 1120 },
                      { stage: 'Closed Won Deals', count: 640 }
                    ]}>
                      <XAxis type="number" stroke="#94A3B8" />
                      <YAxis dataKey="stage" type="category" stroke="#94A3B8" width={140} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8B5CF6" name="Funnel Conversion" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>

              {/* Auxiliary Chart Types Teaser Grid (Heatmap, Treemap, Pie, Geo) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800">
                {[
                  { title: 'Heat Map Studio', desc: 'Hourly conversion velocity matrix', icon: Flame },
                  { title: 'Treemap Cluster', desc: 'Account hierarchy revenue blocks', icon: Layers },
                  { title: 'Cohort Retention', desc: '90-day repeat customer survival', icon: Target },
                  { title: 'Apex Telemetry', desc: 'REST Gateway payload throughput', icon: Activity }
                ].map((aux, i) => (
                  <div key={i} onClick={() => showToast(`Loaded ${aux.title} simulation`)} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-blue-500 transition-all">
                    <aux.icon className="w-4 h-4 text-blue-400 mb-2" />
                    <div className="font-bold text-xs">{aux.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{aux.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GEO WORLD HOTSPOTS */}
        {activeTab === 'GEO' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'} space-y-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold flex items-center gap-2">
                    <Globe className="w-6 h-6 text-emerald-400" /> 🌍 Trending Countries &amp; Cities
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Interactive world map highlighting regions with highest inbound velocity and Anji Somisetti AI closing rates</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                  TOP GEO: UNITED STATES (44.5%)
                </span>
              </div>

              {/* Simulated Interactive World Map Banner */}
              <div className="h-80 w-full rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border border-blue-500/30 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Pulsing City Pins */}
                {[
                  { name: 'San Francisco, CA', top: '35%', left: '18%', leads: '740 Leads' },
                  { name: 'New York, NY', top: '32%', left: '26%', leads: '620 Leads' },
                  { name: 'London, UK', top: '28%', left: '46%', leads: '510 Leads' },
                  { name: 'Frankfurt, DE', top: '30%', left: '50%', leads: '320 Leads' },
                  { name: 'Singapore', top: '58%', left: '78%', leads: '410 Leads' },
                  { name: 'Tokyo, JP', top: '38%', left: '84%', leads: '290 Leads' }
                ].map((pin, i) => (
                  <div key={i} style={{ top: pin.top, left: pin.left }} className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 rounded-full bg-blue-500 animate-ping absolute"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-white relative z-10"></div>
                    <div className="absolute left-4 -top-2 bg-slate-900 border border-slate-700 text-white px-2.5 py-1 rounded-xl text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-xl">
                      <strong>{pin.name}</strong> • {pin.leads}
                    </div>
                  </div>
                ))}

                <div className="text-center z-10 space-y-2 max-w-lg px-4">
                  <Globe className="w-12 h-12 text-blue-400 mx-auto animate-pulse" />
                  <h4 className="text-lg font-bold text-white">Global Vector Telemetry Mesh Active</h4>
                  <p className="text-xs text-blue-200">Hover over pulsing pins to inspect regional lead concentration. Automated data routing compliant with EU GDPR and California CCPA.</p>
                </div>
              </div>

              {/* Geo Breakdown Tables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-300 font-mono uppercase mb-3 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-400" /> Top Generating Countries
                  </h4>
                  <div className="space-y-2 text-xs font-mono">
                    {[
                      { name: 'United States', code: 'US', leads: 2140, share: '44.5%', growth: '+34%' },
                      { name: 'United Kingdom', code: 'GB', leads: 680, share: '14.2%', growth: '+28%' },
                      { name: 'Germany', code: 'DE', leads: 520, share: '10.8%', growth: '+22%' },
                      { name: 'Singapore', code: 'SG', leads: 410, share: '8.5%', growth: '+46%' },
                      { name: 'Canada', code: 'CA', leads: 380, share: '7.9%', growth: '+18%' }
                    ].map(c => (
                      <div key={c.code} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <span className="font-bold text-slate-200">{c.name} ({c.code})</span>
                        <div className="flex items-center gap-3">
                          <span className="text-blue-400">{c.leads}</span>
                          <span className="text-slate-500">{c.share}</span>
                          <span className="text-emerald-400 font-bold">{c.growth}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-300 font-mono uppercase mb-3 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-400" /> Top Generating Metropolitan Cities
                  </h4>
                  <div className="space-y-2 text-xs font-mono">
                    {[
                      { city: 'San Francisco, CA', country: 'USA', leads: 740, vel: 'Hot Tier 1' },
                      { city: 'New York, NY', country: 'USA', leads: 620, vel: 'High Closing' },
                      { city: 'London', country: 'UK', leads: 510, vel: 'Enterprise' },
                      { city: 'Singapore', country: 'SG', leads: 410, vel: 'FinTech Blitz' },
                      { city: 'Frankfurt', country: 'DE', leads: 320, vel: 'SaaS Expansion' }
                    ].map((ct, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <span className="font-bold text-slate-200">{ct.city}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-blue-400">{ct.leads} Leads</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">{ct.vel}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AI OPPORTUNITY RADAR */}
        {activeTab === 'OPPORTUNITIES' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'} space-y-6`}>
              <div>
                <h2 className="text-2xl font-extrabold flex items-center gap-2">
                  <Zap className="w-6 h-6 text-amber-400" /> ⚡ AI Opportunity Detection &amp; Churn Shield
                </h2>
                <p className="text-xs text-slate-400 mt-1">Autonomous machine learning detection identifying high-value customers, likely converters, repeat buyers, and intervention triggers.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {opps.map(op => (
                  <div key={op.id} className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-amber-400/50 transition-all">
                    <div>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        op.type === 'ENTERPRISE_CLIENT' ? 'bg-blue-500/10 text-blue-400' :
                        op.type === 'CHURN_RISK' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {op.badge}
                      </span>
                      <h4 className="font-bold text-base text-white mt-3 mb-1">{op.title}</h4>
                      <p className="text-xs text-slate-400 font-mono">Contact: {op.customer}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between font-mono">
                      <div>
                        <div className="text-[10px] text-slate-500">EST VALUE</div>
                        <div className="text-sm font-bold text-amber-400">{op.val}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500">PROBABILITY</div>
                        <div className="text-sm font-bold text-emerald-400">{op.prob}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AI SALES FORECAST */}
        {activeTab === 'FORECAST' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'} space-y-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold flex items-center gap-2">
                    <Target className="w-6 h-6 text-blue-400" /> 📅 AI Sales Forecast &amp; Predictive Targets
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Monte Carlo statistical regression predicting inbound pipeline volume and revenue closure thresholds.</p>
                </div>
                <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> CONFIDENCE: {aiForecast.confidencePercentage}%
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-4">
                {[
                  { label: "Tomorrow's Leads", val: aiForecast.tomorrowLeads, unit: 'Inbound Prospects' },
                  { label: "Weekly Leads", val: aiForecast.weeklyLeads, unit: 'Qualified Target' },
                  { label: "Monthly Revenue", val: aiForecast.monthlyRevenue, unit: 'Attributed Opps' },
                  { label: "Quarterly Growth", val: aiForecast.quarterlyGrowth, unit: 'YoY Expansion' },
                  { label: "Annual Sales (FY26)", val: aiForecast.annualSales, unit: 'Enterprise Ceiling' }
                ].map((fc, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-2 hover:border-blue-500 transition-all">
                    <div className="text-xs font-mono text-slate-400 font-bold">{fc.label}</div>
                    <div className="text-2xl font-extrabold font-mono text-blue-400">{fc.val}</div>
                    <div className="text-[10px] text-slate-500">{fc.unit}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button (FAB) for Quick AI Copilot */}
        <button
          onClick={() => {
            setCustomPrompt("Summarize today's top market anomalies and recommended AE actions.");
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-600/50 border border-white/20 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
          title="Instant AI Executive Briefing"
        >
          <Sparkles className="w-6 h-6 animate-spin-once" />
        </button>

        {/* EXPLAIN WHY LEAD IS HOT/WARM/COLD MODAL */}
        {selectedExplainLead && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative space-y-6">
              <button 
                onClick={() => setSelectedExplainLead(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">ANJI SOMISETTI AI PREDICTIVE RATING</span>
                  <h3 className="text-xl font-bold text-white">{selectedExplainLead.company} • {selectedExplainLead.status}</h3>
                </div>
              </div>

              <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                <p>
                  <strong>Why is this lead marked HOT?</strong><br />
                  Agentforce reasoning models evaluated 14 distinct telemetry signals across Salesforce Sales Cloud &amp; website interaction histories.
                </p>

                <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-slate-400">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>Signal 1: Pricing Velocity</span>
                    <span>+45 Pts</span>
                  </div>
                  <div>Prospect visited pricing page 3 times within 4 hours.</div>
                  
                  <div className="flex items-center justify-between text-blue-400 font-bold pt-2 border-t border-slate-800">
                    <span>Signal 2: Corporate Domain Reputation</span>
                    <span>+30 Pts</span>
                  </div>
                  <div>Verified enterprise email matches Fortune 500 IP registry.</div>

                  <div className="flex items-center justify-between text-indigo-400 font-bold pt-2 border-t border-slate-800">
                    <span>Signal 3: Anji Somisetti AI Fit Score</span>
                    <span>98/100</span>
                  </div>
                  <div>Product interest aligns directly with autonomous Agentforce seats.</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setSelectedExplainLead(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
                >
                  Close Shield
                </button>
                <Link
                  to="/lead-management"
                  onClick={() => setSelectedExplainLead(null)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all"
                >
                  Inspect Lead Record
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};
