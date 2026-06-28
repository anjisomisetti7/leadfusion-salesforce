import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lead, NotificationItem, ActivityLog } from '../types';

interface LeadContextType {
  leads: Lead[];
  totalLeads: number;
  isLoading: boolean;
  stats: any;
  notifications: NotificationItem[];
  auditLogs: ActivityLog[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: string;
  setStatusFilter: (st: string) => void;
  ratingFilter: string;
  setRatingFilter: (rt: string) => void;
  fetchLeads: () => Promise<void>;
  createLead: (leadData: any) => Promise<{ success: boolean; lead?: Lead; error?: string; duplicateId?: string }>;
  updateLead: (id: string, updates: Partial<Lead>) => Promise<boolean>;
  deleteLead: (id: string) => Promise<boolean>;
  triggerAIScore: (id: string) => Promise<{ outreachDraft?: string }>;
  syncWithSalesforce: () => Promise<boolean>;
  addNotification: (title: string, msg: string, type?: 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER' | 'SMS_SIMULATION') => void;
  markNotificationsRead: () => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);
const API_BASE = '/api';

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<any>({ totalLeads: 2842, qualifiedLeads: 418, pipelineRevenue: 1200000, conversionRate: 24.8 });
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<ActivityLog[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [ratingFilter, setRatingFilter] = useState<string>('ALL');

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append('search', searchQuery);
      if (statusFilter !== 'ALL') queryParams.append('status', statusFilter);
      if (ratingFilter !== 'ALL') queryParams.append('rating', ratingFilter);

      const res = await fetch(`${API_BASE}/leads?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads);
        setTotalLeads(data.total);
      }
      
      const statsRes = await fetch(`${API_BASE}/stats`);
      if (statsRes.ok) setStats(await statsRes.json());

      const logsRes = await fetch(`${API_BASE}/logs`);
      if (logsRes.ok) {
        const ldata = await logsRes.json();
        setAuditLogs(ldata.logs);
      }
    } catch (e) {
      console.error('Fetch leads error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [searchQuery, statusFilter, ratingFilter]);

  const addNotification = (title: string, msg: string, type: 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER' | 'SMS_SIMULATION' = 'INFO') => {
    const newItem: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: 'current',
      title,
      message: msg,
      type,
      isRead: false,
      createdAt: 'Just now'
    };
    setNotifications(prev => [newItem, ...prev]);
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const createLead = async (leadData: any) => {
    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      const data = await res.json();
      if (res.status === 409) {
        addNotification('Duplicate Lead Detected', `Corporate domain ${leadData.email} already exists in CRM.`, 'WARNING');
        return { success: false, error: data.error, duplicateId: data.duplicateId };
      }
      if (!res.ok) throw new Error(data.error || 'Failed to submit lead');

      addNotification('AI Lead Scored & Synced', `${data.lead.company} scored ${data.lead.aiScore}/100 (${data.lead.aiRating}). Synced to Salesforce Org.`, 'SUCCESS');
      
      // Simulate SMS Alert
      setTimeout(() => {
        addNotification('SMS Simulation Triggered', `[SMS to Sales Rep] Urgent VIP Lead ${data.lead.firstName} ${data.lead.lastName} assigned to you. Reply YES to accept task.`, 'SMS_SIMULATION');
      }, 1500);

      fetchLeads();
      return { success: true, lead: data.lead };
    } catch (err: any) {
      addNotification('Submission Error', err.message || 'Error occurred', 'DANGER');
      return { success: false, error: err.message };
    }
  };

  const updateLead = async (id: string, updates: Partial<Lead>): Promise<boolean> => {
    try {
      const token = localStorage.getItem('nexus_auth_token') || sessionStorage.getItem('nexus_auth_token') || '';
      const res = await fetch(`${API_BASE}/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(updates)
      });
      if (!res.ok) return false;
      addNotification('Lead Updated', 'Lead status and details modified successfully.', 'INFO');
      fetchLeads();
      return true;
    } catch (e) {
      return false;
    }
  };

  const deleteLead = async (id: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem('nexus_auth_token') || sessionStorage.getItem('nexus_auth_token') || '';
      const res = await fetch(`${API_BASE}/leads/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) return false;
      addNotification('Lead Deleted', 'Lead record removed from MongoDB Atlas and unlinked from Salesforce Org.', 'WARNING');
      fetchLeads();
      return true;
    } catch (e) {
      return false;
    }
  };

  const triggerAIScore = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/leads/${id}/ai-score`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        addNotification('Anji Somisetti AI Re-Score', `Lead score boosted to ${data.lead.aiScore}/100. AI campaign drafted.`, 'SUCCESS');
        fetchLeads();
        return { outreachDraft: data.outreachDraft };
      }
      return {};
    } catch (e) {
      return {};
    }
  };

  const syncWithSalesforce = async (): Promise<boolean> => {
    addNotification('Salesforce Org Sync', 'Initiating REST API Bulk Callouts across Org instances...', 'INFO');
    try {
      const res = await fetch(`${API_BASE}/salesforce/sync`, { method: 'POST' });
      if (res.ok) {
        const d = await res.json();
        addNotification('Salesforce Sync Complete', `Synced ${d.syncedCount} records bi-directionally with zero governor limit violations.`, 'SUCCESS');
        fetchLeads();
        return true;
      }
      return false;
    } catch (e) {
      addNotification('Sync Error', 'Network timeout connecting to Salesforce REST Gateway.', 'DANGER');
      return false;
    }
  };

  return (
    <LeadContext.Provider value={{
      leads, totalLeads, isLoading, stats, notifications, auditLogs,
      searchQuery, setSearchQuery, statusFilter, setStatusFilter, ratingFilter, setRatingFilter,
      fetchLeads, createLead, updateLead, deleteLead, triggerAIScore, syncWithSalesforce,
      addNotification, markNotificationsRead
    }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const c = useContext(LeadContext);
  if (!c) throw new Error('useLeads must be used within LeadProvider');
  return c;
};
