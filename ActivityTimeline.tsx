import React, { useState } from 'react';
import { Lead } from '../../types';
import { 
  Clock, CheckCircle2, Sparkles, Database, Workflow, Mail, 
  PhoneCall, MessageSquare, FileText, Plus, Search, Filter, 
  Calendar, UserCheck, Zap, ArrowUpRight, Send
} from 'lucide-react';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'AI_SCORING' | 'FLOW_AUTOMATION' | 'SALESFORCE_SYNC' | 'USER_INTERACTION' | 'EMAIL_OUTREACH' | 'SMS_ALERT';
  actor: string;
  status: 'COMPLETED' | 'TRIGGERED' | 'SCHEDULED';
  metadata?: Record<string, string | number>;
}

interface ActivityTimelineProps {
  lead: Lead;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ lead }) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  
  // New manual log form state
  const [newLogType, setNewLogType] = useState<'USER_INTERACTION' | 'EMAIL_OUTREACH'>('USER_INTERACTION');
  const [newLogTitle, setNewLogTitle] = useState<string>('');
  const [newLogNotes, setNewLogNotes] = useState<string>('');

  const formatLeadTime = (dateStr?: string, offsetMins: number = 0) => {
    try {
      if (!dateStr || dateStr.includes('Just now') || dateStr.includes('ago')) {
        const d = new Date();
        d.setMinutes(d.getMinutes() - offsetMins);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '10:45 AM';
      d.setMinutes(d.getMinutes() + offsetMins);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '10:45 AM';
    }
  };

  // Initial timeline events constructed from lead data
  const [timelineEvents, setTimelineEvents] = useState<ActivityItem[]>(() => [
    {
      id: `evt_capture_${lead.id}`,
      title: 'Inbound Lead Captured & Form Parsed',
      description: `Prospect captured from pricing page inbound inquiry. Recorded ${lead.pagesViewed || 4} pages viewed (${lead.timeSpentMinutes || 3.5} mins session duration).`,
      timestamp: formatLeadTime(lead.createdAt, -15),
      type: 'USER_INTERACTION',
      actor: 'Web Gateway SDK',
      status: 'COMPLETED',
      metadata: { 'Source': 'nexusai.enterprise/inbound', 'IP': '192.0.2.148' }
    },
    {
      id: `evt_ai_${lead.id}`,
      title: 'Somisetti AI Qualification Engine Executed',
      description: `Calculated ICP Fit Score of ${lead.aiScore}/100 (${lead.aiRating}). Firmographic budget verified at ${lead.budget || '$150,000+'}. Domain reputation checks: PASSED.`,
      timestamp: formatLeadTime(lead.createdAt, -12),
      type: 'AI_SCORING',
      actor: 'Somisetti AI v4.2',
      status: 'COMPLETED',
      metadata: { 'Confidence': `${lead.confidencePercentage || 96.4}%`, 'Tier': 'ICP Tier 1' }
    },
    {
      id: `evt_flow_${lead.id}`,
      title: 'Salesforce Flow Event: Lead Routing Automation',
      description: `Platform Event "InboundLead_HighIntent" emitted to Flow Builder. Routed record ownership to Enterprise AE ${lead.assignedRepName || 'Marcus Thorne'}.`,
      timestamp: formatLeadTime(lead.createdAt, -10),
      type: 'FLOW_AUTOMATION',
      actor: 'Salesforce Flow Engine',
      status: 'COMPLETED',
      metadata: { 'Flow Name': 'AutoAssign_VIP_Leads_v2', 'SLA': '5-Minute Response' }
    },
    {
      id: `evt_sf_${lead.id}`,
      title: 'Bi-Directional Salesforce REST Bulk Sync',
      description: `Synchronized object payload to Salesforce Org instance. Generated Salesforce Lead ID ${lead.salesforceLeadId || '00Q8aXYZ9910'}.`,
      timestamp: formatLeadTime(lead.createdAt, -8),
      type: 'SALESFORCE_SYNC',
      actor: 'LeadFusion REST Gateway',
      status: 'COMPLETED',
      metadata: { 'SF_ID': lead.salesforceLeadId || '00Q8aXYZ9910', 'API Gov Limits': '0% Used' }
    },
    {
      id: `evt_sms_${lead.id}`,
      title: 'BDR SMS Escalation Simulation Triggered',
      description: `Sent priority SMS alert to ${lead.assignedRepName || 'Marcus Thorne'} mobile device: "Urgent VIP Lead ${lead.company} ready for walkthrough."`,
      timestamp: formatLeadTime(lead.createdAt, -5),
      type: 'SMS_ALERT',
      actor: 'Twilio Gateway Bridge',
      status: 'TRIGGERED',
      metadata: { 'Recipient': '+1 (415) 882-0042', 'Delivery Status': 'Delivered' }
    },
    {
      id: `evt_copilot_${lead.id}`,
      title: 'Somisetti AI Copilot Synthesized Campaign',
      description: `Generated hyper-personalized executive outreach draft addressing ${lead.firstName} ${lead.lastName} in the ${lead.industry} sector.`,
      timestamp: formatLeadTime(lead.createdAt, -1),
      type: 'EMAIL_OUTREACH',
      actor: 'Somisetti AI Copilot',
      status: 'COMPLETED',
      metadata: { 'Tone': 'Executive Walkthrough', 'Subject': `Autonomous AI scaling for ${lead.company}` }
    }
  ]);

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogTitle.trim()) return;

    const newEvent: ActivityItem = {
      id: `evt_manual_${Date.now()}`,
      title: newLogTitle,
      description: newLogNotes || 'Manual executive log entry recorded by Account Executive.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: newLogType,
      actor: lead.assignedRepName || 'Marcus Thorne (AE)',
      status: 'COMPLETED',
      metadata: { 'Logged By': 'Manual Dashboard Entry', 'Channel': newLogType === 'EMAIL_OUTREACH' ? 'Direct Email' : 'Phone/Meeting' }
    };

    setTimelineEvents(prev => [newEvent, ...prev]);
    setNewLogTitle('');
    setNewLogNotes('');
    setShowAddModal(false);
  };

  const filteredEvents = timelineEvents.filter(evt => {
    const matchesFilter = filterType === 'ALL' || evt.type === filterType;
    const matchesSearch = searchQuery === '' || 
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.actor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIconAndStyle = (type: ActivityItem['type']) => {
    switch (type) {
      case 'AI_SCORING':
        return {
          icon: <Sparkles className="w-4 h-4 text-blue-400" />,
          badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
          dotBg: 'bg-blue-600 dark:bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-950/60',
          label: 'AI QUALIFICATION'
        };
      case 'FLOW_AUTOMATION':
        return {
          icon: <Workflow className="w-4 h-4 text-purple-400" />,
          badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
          dotBg: 'bg-purple-600 dark:bg-purple-500 ring-4 ring-purple-100 dark:ring-purple-950/60',
          label: 'FLOW BUILDER'
        };
      case 'SALESFORCE_SYNC':
        return {
          icon: <Database className="w-4 h-4 text-emerald-500" />,
          badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          dotBg: 'bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950/60',
          label: 'SALESFORCE REST'
        };
      case 'EMAIL_OUTREACH':
        return {
          icon: <Mail className="w-4 h-4 text-indigo-400" />,
          badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
          dotBg: 'bg-indigo-600 dark:bg-indigo-500 ring-4 ring-indigo-100 dark:ring-indigo-950/60',
          label: 'OUTREACH COPILOT'
        };
      case 'SMS_ALERT':
        return {
          icon: <Zap className="w-4 h-4 text-amber-500" />,
          badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          dotBg: 'bg-amber-500 ring-4 ring-amber-100 dark:ring-amber-950/60',
          label: 'BDR ALERT'
        };
      default:
        return {
          icon: <PhoneCall className="w-4 h-4 text-slate-500 dark:text-slate-400" />,
          badgeBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
          dotBg: 'bg-slate-600 dark:bg-slate-500 ring-4 ring-slate-100 dark:ring-slate-900',
          label: 'INTERACTION'
        };
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      
      {/* Component Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Activity Timeline &amp; Flow Automation Audit
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time chronological telemetry for {lead.company} ({lead.firstName} {lead.lastName}).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter timeline..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-9 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-700 dark:text-slate-200 appearance-none focus:outline-none focus:border-blue-500 cursor-pointer transition-colors"
            >
              <option value="ALL">All Events ({timelineEvents.length})</option>
              <option value="AI_SCORING">Somisetti AI ({timelineEvents.filter(e => e.type === 'AI_SCORING').length})</option>
              <option value="FLOW_AUTOMATION">Flow Builder ({timelineEvents.filter(e => e.type === 'FLOW_AUTOMATION').length})</option>
              <option value="SALESFORCE_SYNC">Salesforce Sync ({timelineEvents.filter(e => e.type === 'SALESFORCE_SYNC').length})</option>
              <option value="USER_INTERACTION">Rep Interactions ({timelineEvents.filter(e => e.type === 'USER_INTERACTION').length})</option>
              <option value="EMAIL_OUTREACH">Copilot Outreach ({timelineEvents.filter(e => e.type === 'EMAIL_OUTREACH').length})</option>
              <option value="SMS_ALERT">BDR SMS Alerts ({timelineEvents.filter(e => e.type === 'SMS_ALERT').length})</option>
            </select>
          </div>

          {/* Log Activity Button */}
          <button 
            onClick={() => setShowAddModal(!showAddModal)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Log Interaction
          </button>
        </div>
      </div>

      {/* Expandable Manual Activity Log Drawer */}
      {showAddModal && (
        <form onSubmit={handleAddActivity} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-blue-500/30 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono flex items-center gap-2">
              <FileText className="w-4 h-4" /> Record Manual AE Interaction
            </span>
            <button type="button" onClick={() => setShowAddModal(false)} className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Activity Type</label>
              <select 
                value={newLogType} 
                onChange={(e) => setNewLogType(e.target.value as any)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-500"
              >
                <option value="USER_INTERACTION">📞 Executive Call / Meeting Note</option>
                <option value="EMAIL_OUTREACH">✉️ Custom Email Campaign Sent</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Summary Title *</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Discovery Walkthrough Completed with VP of Eng"
                value={newLogTitle}
                onChange={(e) => setNewLogTitle(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Detailed Interaction Notes</label>
            <textarea 
              rows={2}
              placeholder="Add key takeaway highlights, budget confirmation, or next steps agreed upon..."
              value={newLogNotes}
              onChange={(e) => setNewLogNotes(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button 
              type="submit" 
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <Send className="w-3 h-3" /> Append To Timeline
            </button>
          </div>
        </form>
      )}

      {/* Timeline Stream Container */}
      <div className="relative pl-6 sm:pl-8 py-2">
        {/* Continuous Vertical Connector Rail */}
        <div className="absolute left-[13px] sm:left-[17px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs font-mono">
            No timeline telemetry matching current filter or search criteria.
          </div>
        ) : (
          <div className="space-y-8">
            {filteredEvents.map((evt, idx) => {
              const style = getIconAndStyle(evt.type);
              const isLatest = idx === 0;

              return (
                <div key={evt.id} className="relative group animate-in fade-in duration-200">
                  {/* Timeline Node Dot */}
                  <div className={`absolute -left-[25px] sm:-left-[29px] top-1 w-6 h-6 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-sm ${style.dotBg}`}>
                    {style.icon}
                  </div>

                  {/* Event Card */}
                  <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${isLatest ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60 shadow-sm' : 'bg-slate-50/50 dark:bg-slate-950/50 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border font-mono uppercase tracking-wider ${style.badgeBg}`}>
                          {style.label}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {evt.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono text-slate-400 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {evt.timestamp}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                          {evt.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-3">
                      {evt.description}
                    </p>

                    {/* Metadata Badges & Actor Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-[11px]">
                      <div className="flex flex-wrap items-center gap-2 font-mono">
                        <span className="text-slate-400 dark:text-slate-500">ACTOR:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                          {evt.actor}
                        </span>
                      </div>

                      {evt.metadata && (
                        <div className="flex flex-wrap items-center gap-2">
                          {Object.entries(evt.metadata).map(([key, val]) => (
                            <span key={key} className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                              <strong className="text-slate-700 dark:text-slate-300">{key}:</strong> {val}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Timeline Footer Summary */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 font-mono">
        <span>🔒 SOC2 Type II Telemetry Log: VERIFIED &amp; TAMPER-PROOF</span>
        <span>Salesforce Gateway Bi-Directional Webhooks: HEALTHY (200 OK)</span>
      </div>

    </div>
  );
};
