export type Role = 'ADMIN' | 'SALES_REP' | 'MANAGER' | 'CUSTOMER';
export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'UNQUALIFIED' | 'CONVERTED';
export type LeadRating = 'HOT' | 'WARM' | 'COLD';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  company: string;
  industry: string;
  jobTitle: string;
  country: string;
  accountId: string;
  role: Role;
  registrationDate: string;
  lastLogin: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';
  avatarUrl?: string;
  isVerified?: boolean;
}

export interface LeadScoreBreakdown {
  websiteEngagement: number; // max 25
  emailDomainReputation: number; // max 20
  companySizeFit: number; // max 20
  revenueBudgetFit: number; // max 20
  chatInteractionScore: number; // max 15
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website?: string;
  industry: string;
  jobTitle: string;
  revenue: string;
  companySize: string;
  budget: string;
  country: string;
  city: string;
  productInterest: string;
  message?: string;
  preferredContactTime: string;
  status: LeadStatus;
  aiScore: number; // 0 - 100
  aiRating: LeadRating;
  confidencePercentage: number;
  scoreBreakdown: LeadScoreBreakdown;
  aiSummary: string;
  salesforceLeadId?: string;
  salesforceAccountId?: string;
  salesforceContactId?: string;
  salesforceOpportunityId?: string;
  assignedRepId?: string;
  assignedRepName?: string;
  createdAt: string;
  updatedAt: string;
  pagesViewed: number;
  timeSpentMinutes: number;
  isDuplicate: boolean;
  duplicateOfId?: string;
}

export interface SalesforceObjectRecord {
  id: string;
  sfId: string;
  type: 'Lead' | 'Account' | 'Contact' | 'Opportunity' | 'Task';
  name: string;
  stageOrStatus: string;
  amount?: number;
  ownerName: string;
  lastModifiedDate: string;
  attributes: Record<string, any>;
}

export interface FlowAutomationRule {
  id: string;
  name: string;
  triggerType: 'RECORD_CREATED' | 'RECORD_UPDATED' | 'SCHEDULED_DAILY' | 'AI_SCORE_THRESHOLD';
  condition: string;
  actionType: 'CREATE_SALESFORCE_LEAD' | 'ASSIGN_REP' | 'CREATE_TASK' | 'SEND_EMAIL_ALERT' | 'NOTIFY_TEAM';
  actionDetails: string;
  isActive: boolean;
  executionCount: number;
  lastRun?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER' | 'SMS_SIMULATION';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  category: 'AUTH' | 'LEAD_CAPTURE' | 'AI_SCORING' | 'SALESFORCE_SYNC' | 'AUTOMATION' | 'SECURITY';
  details: string;
  userId?: string;
  userName?: string;
  ipAddress?: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  collectedData?: Partial<Lead>;
}

export interface ReportSummary {
  totalLeads: number;
  qualifiedLeads: number;
  hotLeads: number;
  warmLeads: number;
  coldLeads: number;
  pipelineRevenue: number;
  conversionRate: number;
  leadsByIndustry: { name: string; count: number; revenue: number }[];
  leadsByStatus: { status: string; count: number }[];
  monthlyTrend: { month: string; leads: number; converted: number }[];
}

export interface ApexSnippet {
  title: string;
  category: 'TriggerHandler' | 'BulkifiedService' | 'RESTApi' | 'TestClass';
  description: string;
  code: string;
}
