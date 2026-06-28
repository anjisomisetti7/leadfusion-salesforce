import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'nexusai_enterprise_super_secret_key_2026';

app.set('trust proxy', 1);

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // disabled for Vite inline dev scripts & CDN styles
  crossOriginEmbedderPolicy: false
}));
app.use(cors());
app.use(express.json());

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false, xForwardedForHeader: false, forwardedHeader: false },
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', apiLimiter);

// In-Memory Database (Simulating MongoDB Atlas & Salesforce Sync State)
interface ServerUser {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  phone: string;
  company: string;
  industry: string;
  jobTitle: string;
  country: string;
  accountId: string;
  role: 'ADMIN' | 'SALES_REP' | 'MANAGER' | 'CUSTOMER';
  registrationDate: string;
  lastLogin: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';
  avatarUrl?: string;
}

const dbUsers: ServerUser[] = [
  {
    id: 'usr_sf_admin_01',
    email: 'admin@nexusai.enterprise',
    passwordHash: bcrypt.hashSync('Salesforce2026!', 10),
    fullName: 'Sarah Jenkins (Architect)',
    phone: '+1 (415) 555-0199',
    company: 'Salesforce & NexusAI Corp',
    industry: 'Enterprise SaaS & AI',
    jobTitle: 'Principal Salesforce AI Architect',
    country: 'United States',
    accountId: 'ACC-ENT-9942',
    role: 'ADMIN',
    registrationDate: '2026-01-15T08:30:00Z',
    lastLogin: new Date().toISOString(),
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr_rep_02',
    email: 'marcus@nexusai.enterprise',
    passwordHash: bcrypt.hashSync('Salesforce2026!', 10),
    fullName: 'Marcus Thorne',
    phone: '+1 (415) 555-0244',
    company: 'NexusAI Global Sales',
    industry: 'Cloud Computing',
    jobTitle: 'Senior Account Executive',
    country: 'United States',
    accountId: 'ACC-ENT-9942',
    role: 'SALES_REP',
    registrationDate: '2026-02-10T11:15:00Z',
    lastLogin: new Date().toISOString(),
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
  }
];

let dbLeads: any[] = [
  {
    id: 'ld_9821a',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 's.jenkins@acmerobotics.io',
    phone: '+1 (800) 555-0192',
    company: 'Acme Robotics',
    website: 'https://acmerobotics.io',
    industry: 'Manufacturing & Robotics',
    jobTitle: 'VP of Engineering',
    revenue: '$50M - $100M',
    companySize: '250-500 employees',
    budget: '$150,000+',
    country: 'United States',
    city: 'Boston',
    productInterest: 'Agentforce AI Cloud CRM Suite',
    message: 'Looking to automate our inbound enterprise dealer inquiries with conversational Anji Somisetti AI.',
    preferredContactTime: 'Morning (9AM - 12PM EST)',
    status: 'QUALIFIED',
    aiScore: 98,
    aiRating: 'HOT',
    confidencePercentage: 96,
    scoreBreakdown: {
      websiteEngagement: 25,
      emailDomainReputation: 20,
      companySizeFit: 20,
      revenueBudgetFit: 20,
      chatInteractionScore: 13
    },
    aiSummary: 'Acme Robotics visited pricing page 3 times. High revenue fit and urgent budget allocation for AI CRM automation. 92% chance of close.',
    salesforceLeadId: '00Q8a00000XYZ12EAH',
    salesforceAccountId: '0018a00000ABC45EAG',
    assignedRepId: 'usr_rep_02',
    assignedRepName: 'Marcus Thorne',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
    pagesViewed: 14,
    timeSpentMinutes: 28,
    isDuplicate: false
  },
  {
    id: 'ld_9412b',
    firstName: 'Marcus',
    lastName: 'Thorne',
    email: 'm.thorne@cloudscale.net',
    phone: '+1 (415) 882-9910',
    company: 'CloudScale Inc.',
    website: 'https://cloudscale.net',
    industry: 'Cloud Infrastructure',
    jobTitle: 'Chief Technology Officer',
    revenue: '$10M - $50M',
    companySize: '100-250 employees',
    budget: '$75,000 - $150,000',
    country: 'United States',
    city: 'San Francisco',
    productInterest: 'Salesforce REST API Connector & Flow Engine',
    message: 'Need high throughput bi-directional sync between MongoDB clusters and Salesforce Account records.',
    preferredContactTime: 'Afternoon (1PM - 4PM PST)',
    status: 'CONTACTED',
    aiScore: 94,
    aiRating: 'HOT',
    confidencePercentage: 93,
    scoreBreakdown: {
      websiteEngagement: 23,
      emailDomainReputation: 20,
      companySizeFit: 18,
      revenueBudgetFit: 19,
      chatInteractionScore: 14
    },
    aiSummary: 'CTO requesting technical demo of REST API architecture. Verified corporate domain with active budget approval.',
    salesforceLeadId: '00Q8a00000XYZ89EAH',
    assignedRepId: 'usr_sf_admin_01',
    assignedRepName: 'Sarah Jenkins',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date().toISOString(),
    pagesViewed: 9,
    timeSpentMinutes: 19,
    isDuplicate: false
  },
  {
    id: 'ld_8201c',
    firstName: 'Elena',
    lastName: 'Rodriguez',
    email: 'erodriguez@fintechsolutions.co',
    phone: '+44 20 7946 0912',
    company: 'Fintech Solutions',
    website: 'https://fintechsolutions.co',
    industry: 'Financial Services',
    jobTitle: 'Director of Growth',
    revenue: '$5M - $10M',
    companySize: '50-100 employees',
    budget: '$25,000 - $75,000',
    country: 'United Kingdom',
    city: 'London',
    productInterest: 'Intelligent Lead Scoring & Analytics',
    message: 'Evaluating AI lead qualification to replace manual BDR outreach scoring.',
    preferredContactTime: 'Anytime',
    status: 'NEW',
    aiScore: 82,
    aiRating: 'WARM',
    confidencePercentage: 86,
    scoreBreakdown: {
      websiteEngagement: 18,
      emailDomainReputation: 20,
      companySizeFit: 15,
      revenueBudgetFit: 17,
      chatInteractionScore: 12
    },
    aiSummary: 'Solid mid-market financial client in EMEA. Warm interest in AI scoring modules.',
    salesforceLeadId: '00Q8a00000XYZ44EAH',
    assignedRepId: 'usr_rep_02',
    assignedRepName: 'Marcus Thorne',
    createdAt: new Date(Date.now() - 3600000 * 42).toISOString(),
    updatedAt: new Date().toISOString(),
    pagesViewed: 6,
    timeSpentMinutes: 11,
    isDuplicate: false
  },
  {
    id: 'ld_7914d',
    firstName: 'David',
    lastName: 'Kim',
    email: 'dkim@starlightlogistics.com',
    phone: '+1 (312) 555-0148',
    company: 'Starlight Logistics',
    website: 'https://starlightlogistics.com',
    industry: 'Logistics & Supply Chain',
    jobTitle: 'Operations Manager',
    revenue: '$1M - $5M',
    companySize: '20-50 employees',
    budget: '$10,000 - $25,000',
    country: 'United States',
    city: 'Chicago',
    productInterest: 'Flow Builder Automation',
    message: 'Interested in automated SMS & email task notifications.',
    preferredContactTime: 'Morning',
    status: 'NEW',
    aiScore: 79,
    aiRating: 'WARM',
    confidencePercentage: 81,
    scoreBreakdown: {
      websiteEngagement: 19,
      emailDomainReputation: 18,
      companySizeFit: 14,
      revenueBudgetFit: 16,
      chatInteractionScore: 12
    },
    aiSummary: 'Active operations manager looking for workflow triggers. Good entry level enterprise pipeline candidate.',
    salesforceLeadId: '00Q8a00000XYZ11EAH',
    assignedRepId: 'usr_rep_02',
    assignedRepName: 'Marcus Thorne',
    createdAt: new Date(Date.now() - 3600000 * 70).toISOString(),
    updatedAt: new Date().toISOString(),
    pagesViewed: 5,
    timeSpentMinutes: 8,
    isDuplicate: false
  }
];

let dbAuditLogs: any[] = [
  {
    id: 'log_01',
    action: 'Salesforce REST Sync Completed',
    category: 'SALESFORCE_SYNC',
    details: 'Bi-directional sync completed for 4 records. Owner assignments updated via Agentforce rules.',
    userName: 'System AI Engine',
    timestamp: new Date(Date.now() - 120000).toISOString()
  },
  {
    id: 'log_02',
    action: 'Anji Somisetti AI Lead Scored',
    category: 'AI_SCORING',
    details: 'Lead Sarah Jenkins (Acme Robotics) scored 98/100 based on domain reputation and pricing page velocity.',
    userName: 'Anji Somisetti Copilot',
    timestamp: new Date(Date.now() - 600000).toISOString()
  }
];

// Auth Helper
const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing JWT Bearer token' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'NexusAI Lead Gen & Salesforce CRM Gateway',
    version: '4.2.0-Enterprise',
    database: 'MongoDB Atlas Connected',
    salesforceSync: 'Active (Connected to Org 00D8a00000XYZ)',
    timestamp: new Date().toISOString()
  });
});

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
  const { fullName, email, password, company, industry, jobTitle, phone, country } = req.body;
  if (!email || !password || !fullName) {
    return res.status(400).json({ error: 'Full name, email, and password are required.' });
  }
  if (dbUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }
  const newUser: ServerUser = {
    id: `usr_${Math.random().toString(36).substr(2, 9)}`,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    fullName,
    phone: phone || '+1 (555) 000-0000',
    company: company || 'Enterprise Account',
    industry: industry || 'Technology',
    jobTitle: jobTitle || 'Director',
    country: country || 'United States',
    accountId: `ACC-${Math.floor(1000 + Math.random() * 9000)}`,
    role: email.includes('admin') ? 'ADMIN' : 'SALES_REP',
    registrationDate: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    status: 'ACTIVE',
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=2563eb`
  };
  dbUsers.push(newUser);
  dbAuditLogs.unshift({
    id: `log_${Date.now()}`,
    action: 'New User Registered',
    category: 'AUTH',
    details: `Account created for ${fullName} (${email}) under Org Account ${newUser.accountId}`,
    userName: fullName,
    timestamp: new Date().toISOString()
  });

  const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role, fullName: newUser.fullName }, JWT_SECRET, { expiresIn: '24h' });
  const { passwordHash, ...safeUser } = newUser;
  res.status(201).json({ token, user: safeUser });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = dbUsers.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  if (!user || !bcrypt.compareSync(password || '', user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid email or password credentials.' });
  }
  user.lastLogin = new Date().toISOString();
  dbAuditLogs.unshift({
    id: `log_${Date.now()}`,
    action: 'User Login Success',
    category: 'AUTH',
    details: `Session authenticated for ${user.fullName} via JWT Bearer handshake.`,
    userName: user.fullName,
    timestamp: new Date().toISOString()
  });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role, fullName: user.fullName }, JWT_SECRET, { expiresIn: '24h' });
  const { passwordHash, ...safeUser } = user;
  res.json({ token, user: safeUser });
});

app.get('/api/auth/me', authMiddleware, (req: any, res) => {
  const user = dbUsers.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User record not found' });
  const { passwordHash, ...safeUser } = user;
  res.json({ user: safeUser });
});

app.put('/api/auth/profile', authMiddleware, (req: any, res) => {
  const user = dbUsers.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User record not found' });
  Object.assign(user, req.body);
  const { passwordHash, ...safeUser } = user;
  res.json({ user: safeUser, message: 'Profile updated successfully' });
});

// Leads Endpoints
app.get('/api/leads', (req, res) => {
  const { search, status, rating, industry } = req.query;
  let filtered = [...dbLeads];
  if (search) {
    const s = String(search).toLowerCase();
    filtered = filtered.filter(l => 
      l.firstName.toLowerCase().includes(s) ||
      l.lastName.toLowerCase().includes(s) ||
      l.company.toLowerCase().includes(s) ||
      l.email.toLowerCase().includes(s) ||
      (l.aiSummary && l.aiSummary.toLowerCase().includes(s))
    );
  }
  if (status && status !== 'ALL') filtered = filtered.filter(l => l.status === status);
  if (rating && rating !== 'ALL') filtered = filtered.filter(l => l.aiRating === rating);
  if (industry && industry !== 'ALL') filtered = filtered.filter(l => l.industry === industry);

  res.json({
    total: filtered.length,
    leads: filtered
  });
});

app.post('/api/leads', (req, res) => {
  const data = req.body;
  if (!data.firstName || !data.lastName || !data.email || !data.company) {
    return res.status(400).json({ error: 'First name, last name, email, and company are required.' });
  }

  // Duplicate Detection
  const duplicate = dbLeads.find(l => l.email.toLowerCase() === data.email.toLowerCase());
  if (duplicate) {
    return res.status(409).json({
      error: 'Duplicate lead detected matching corporate email domain.',
      duplicateId: duplicate.id,
      existingCompany: duplicate.company
    });
  }

  // Automatic AI Scoring Simulation
  let aiScore = 65;
  if (data.budget && data.budget.includes('150,000')) aiScore += 18;
  if (data.revenue && data.revenue.includes('50M')) aiScore += 12;
  if (data.email && !data.email.includes('gmail') && !data.email.includes('yahoo')) aiScore += 5;
  aiScore = Math.min(99, aiScore);
  const aiRating = aiScore >= 85 ? 'HOT' : aiScore >= 70 ? 'WARM' : 'COLD';

  const newLead = {
    id: `ld_${Math.random().toString(36).substr(2, 7)}`,
    ...data,
    status: 'NEW',
    aiScore,
    aiRating,
    confidencePercentage: Math.floor(88 + Math.random() * 10),
    scoreBreakdown: {
      websiteEngagement: Math.floor(15 + Math.random() * 10),
      emailDomainReputation: 20,
      companySizeFit: Math.floor(14 + Math.random() * 6),
      revenueBudgetFit: Math.floor(15 + Math.random() * 5),
      chatInteractionScore: 12
    },
    aiSummary: `New inbound lead from ${data.company}. Classified as ${aiRating} lead (${aiScore}/100) based on industry and revenue metrics.`,
    salesforceLeadId: `00Q8a00000${Math.random().toString(36).toUpperCase().substr(2, 6)}EAH`,
    assignedRepId: 'usr_rep_02',
    assignedRepName: 'Marcus Thorne',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pagesViewed: Math.floor(3 + Math.random() * 8),
    timeSpentMinutes: Math.floor(5 + Math.random() * 15),
    isDuplicate: false
  };

  dbLeads.unshift(newLead);
  dbAuditLogs.unshift({
    id: `log_${Date.now()}`,
    action: 'Lead Captured & Scored',
    category: 'LEAD_CAPTURE',
    details: `Inbound form captured lead ${newLead.firstName} ${newLead.lastName} (${newLead.company}). Auto-created Salesforce Lead ${newLead.salesforceLeadId}`,
    userName: 'Inbound Web Form',
    timestamp: new Date().toISOString()
  });

  res.status(201).json({ lead: newLead, message: 'Lead submitted, AI scored, and synced to Salesforce successfully!' });
});

app.get('/api/leads/:id', (req, res) => {
  const lead = dbLeads.find(l => l.id === req.params.id);
  if (!lead) return res.status(404).json({ error: 'Lead not found' });
  res.json({ lead });
});

app.put('/api/leads/:id', authMiddleware, (req, res) => {
  const lead = dbLeads.find(l => l.id === req.params.id);
  if (!lead) return res.status(404).json({ error: 'Lead not found' });
  Object.assign(lead, req.body, { updatedAt: new Date().toISOString() });
  res.json({ lead, message: 'Lead updated successfully' });
});

app.delete('/api/leads/:id', authMiddleware, (req, res) => {
  dbLeads = dbLeads.filter(l => l.id !== req.params.id);
  res.json({ message: 'Lead deleted permanently' });
});

// AI Scoring & Outreach Route
app.post('/api/leads/:id/ai-score', async (req, res) => {
  const lead = dbLeads.find(l => l.id === req.params.id);
  if (!lead) return res.status(404).json({ error: 'Lead not found' });

  // Simulate AI Re-score
  const bump = Math.floor(Math.random() * 5);
  lead.aiScore = Math.min(99, lead.aiScore + bump);
  lead.aiRating = lead.aiScore >= 85 ? 'HOT' : lead.aiScore >= 70 ? 'WARM' : 'COLD';
  lead.updatedAt = new Date().toISOString();

  const outreachDraft = `Subject: Accelerating ${lead.company}'s CRM automation with Anji Somisetti AI\n\nHi ${lead.firstName},\n\nI noticed your team at ${lead.company} has been reviewing enterprise CRM architecture and Flow Builder integrations. Given your interest in ${lead.productInterest || 'Agentforce'}, I'd love to share how companies in ${lead.industry} are reducing lead response times by 84%.\n\nDo you have 15 minutes this Thursday morning for a personalized walk-through?\n\nBest regards,\n${lead.assignedRepName || 'Sarah Jenkins'}\nSalesforce AI Solutions Group`;

  dbAuditLogs.unshift({
    id: `log_${Date.now()}`,
    action: 'Anji Somisetti AI Insight Generated',
    category: 'AI_SCORING',
    details: `Re-calculated lead score for ${lead.company}. Generated customized outreach draft.`,
    userName: 'Agentforce AI',
    timestamp: new Date().toISOString()
  });

  res.json({
    lead,
    outreachDraft,
    message: 'AI re-scored lead and drafted customized email campaign!'
  });
});

// Salesforce Mock Endpoints
app.post('/api/salesforce/sync', (req, res) => {
  dbAuditLogs.unshift({
    id: `log_${Date.now()}`,
    action: 'Manual Salesforce CRM Bi-Directional Sync',
    category: 'SALESFORCE_SYNC',
    details: 'Triggered Bulk REST API sync across Lead, Account, and Opportunity objects. 4 records updated.',
    userName: 'Admin Console',
    timestamp: new Date().toISOString()
  });
  res.json({
    success: true,
    syncedCount: dbLeads.length,
    timestamp: new Date().toISOString(),
    message: 'Salesforce Org synchronization completed (0 errors).'
  });
});

// Chatbot Endpoint
app.post('/api/chat', (req, res) => {
  const { message, history } = req.body;
  const lower = (message || '').toLowerCase();

  let reply = "Thank you for reaching out to NexusAI! I'm an Agentforce AI Assistant. How can I help you automate your lead qualification today?";
  if (lower.includes('pricing') || lower.includes('cost') || lower.includes('budget')) {
    reply = "Our Enterprise AI Lead Generation suite starts at $499/month for up to 5,000 AI qualified leads with bi-directional Salesforce Org synchronization. Would you like me to capture your email for a custom quote?";
  } else if (lower.includes('salesforce') || lower.includes('crm') || lower.includes('flow')) {
    reply = "NexusAI integrates natively with Salesforce Lightning! We automatically generate Lead objects, trigger Flow Builder automation, and run Apex trigger handlers. Can I connect you with our solutions architect?";
  } else if (lower.includes('demo') || lower.includes('contact') || lower.includes('sales')) {
    reply = "I'd be delighted to schedule an executive walkthrough! Please share your Full Name, Corporate Email, and Company Name, and I will instantly create a high-priority Salesforce Lead record.";
  }

  res.json({
    reply,
    sender: 'bot',
    timestamp: new Date().toISOString()
  });
});

// Stats Endpoint
app.get('/api/stats', (req, res) => {
  const totalLeads = dbLeads.length;
  const hotLeads = dbLeads.filter(l => l.aiRating === 'HOT').length;
  const qualifiedLeads = dbLeads.filter(l => l.status === 'QUALIFIED' || l.status === 'CONTACTED').length;
  const conversionRate = 24.8;
  const pipelineRevenue = 1250000;

  res.json({
    totalLeads,
    qualifiedLeads,
    hotLeads,
    warmLeads: dbLeads.filter(l => l.aiRating === 'WARM').length,
    coldLeads: dbLeads.filter(l => l.aiRating === 'COLD').length,
    pipelineRevenue,
    conversionRate,
    lastSync: '2m ago'
  });
});

app.get('/api/logs', (req, res) => {
  res.json({ logs: dbAuditLogs });
});

// AI Market Insights & Trending Sales Endpoints
app.get('/api/market-insights', (req, res) => {
  const { filter = 'Last 30 Days', industry = 'ALL', country = 'ALL' } = req.query;

  // Filter leads based on query
  let leadsPool = [...dbLeads];
  if (industry && industry !== 'ALL') {
    leadsPool = leadsPool.filter(l => l.industry?.toLowerCase() === (industry as string).toLowerCase());
  }
  if (country && country !== 'ALL') {
    leadsPool = leadsPool.filter(l => l.country?.toLowerCase() === (country as string).toLowerCase());
  }

  const trendingProducts = [
    { id: 'p1', name: 'Agentforce Autonomous CRM Suite', totalLeads: 1420, convRate: 34.2, growth: 48.5, trend: 'UP' },
    { id: 'p2', name: 'Anji Somisetti Copilot Enterprise AI', totalLeads: 980, convRate: 29.8, growth: 38.1, trend: 'UP' },
    { id: 'p3', name: 'Salesforce Data Cloud Vector Gateway', totalLeads: 740, convRate: 26.5, growth: 22.4, trend: 'UP' },
    { id: 'p4', name: 'MuleSoft Flow Builder Integration Hub', totalLeads: 510, convRate: 21.4, growth: -4.2, trend: 'DOWN' },
    { id: 'p5', name: 'Tableau Pulse AI Predictive Studio', totalLeads: 420, convRate: 28.1, growth: 18.9, trend: 'UP' },
    { id: 'p6', name: 'Slack Copilot Executive Bot', totalLeads: 310, convRate: 19.5, growth: 12.0, trend: 'UP' }
  ];

  const trendingIndustries = [
    { name: 'Healthcare & Life Sciences', leads: 840, qualified: 340, growth: 42.8, insight: 'High demand for HIPAA-compliant AI Flow automation.' },
    { name: 'Financial Services & Banking', leads: 790, qualified: 310, growth: 38.5, insight: 'Hot leads converting 45% faster when demoing Anji Somisetti Fraud Shield.' },
    { name: 'Information Technology', leads: 920, qualified: 390, growth: 31.2, insight: 'Enterprise SaaS buyers prioritizing vector data integration.' },
    { name: 'Manufacturing & Logistics', leads: 540, qualified: 180, growth: 18.4, insight: 'Supply chain predictive telemetry driving Account expansion.' },
    { name: 'Retail & E-Commerce', leads: 610, qualified: 210, growth: 24.1, insight: 'Bi-directional Lightning Sync reducing cart abandonment.' },
    { name: 'Education & EdTech', leads: 380, qualified: 110, growth: 14.5, insight: 'Admissions copilot workflows trending upwards.' }
  ];

  const trendingGeo = {
    countries: [
      { name: 'United States', code: 'US', leads: 2140, share: 44.5, growth: '+34%' },
      { name: 'United Kingdom', code: 'GB', leads: 680, share: 14.2, growth: '+28%' },
      { name: 'Germany', code: 'DE', leads: 520, share: 10.8, growth: '+22%' },
      { name: 'Singapore', code: 'SG', leads: 410, share: 8.5, growth: '+46%' },
      { name: 'Canada', code: 'CA', leads: 380, share: 7.9, growth: '+18%' },
      { name: 'Japan', code: 'JP', leads: 310, share: 6.4, growth: '+31%' },
      { name: 'Australia', code: 'AU', leads: 240, share: 5.0, growth: '+15%' },
      { name: 'UAE', code: 'AE', leads: 140, share: 2.7, growth: '+52%' }
    ],
    cities: [
      { city: 'San Francisco, CA', country: 'United States', leads: 740, lat: 37.7749, lng: -122.4194 },
      { city: 'New York, NY', country: 'United States', leads: 620, lat: 40.7128, lng: -74.0060 },
      { city: 'London', country: 'United Kingdom', leads: 510, lat: 51.5074, lng: -0.1278 },
      { city: 'Singapore', country: 'Singapore', leads: 410, lat: 1.3521, lng: 103.8198 },
      { city: 'Frankfurt', country: 'Germany', leads: 320, lat: 50.1109, lng: 8.6821 },
      { city: 'Tokyo', country: 'Japan', leads: 290, lat: 35.6762, lng: 139.6503 }
    ]
  };

  const topCompanies = leadsPool
    .sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0))
    .slice(0, 6)
    .map(l => ({
      id: l.id,
      companyName: l.company || 'Enterprise Prospect',
      industry: l.industry || 'Technology',
      leadScore: l.aiScore || 85,
      estRevenue: l.revenue || '$50M - $100M',
      conversionProb: `${Math.min(99, Math.round((l.aiScore || 80) * 1.05))}%`,
      rating: l.aiRating || 'HOT'
    }));

  const leadSources = [
    { source: 'LinkedIn Ads & Outreach', leads: 820, qualified: 360, convRate: 43.9, roi: '+310%' },
    { source: 'Google Organic Search', leads: 1140, qualified: 380, convRate: 33.3, roi: '+480%' },
    { source: 'AI Autonomous Chatbot', leads: 640, qualified: 310, convRate: 48.4, roi: '+620%' },
    { source: 'Direct Website Visitors', leads: 710, qualified: 210, convRate: 29.5, roi: '+240%' },
    { source: 'Executive Email Campaigns', leads: 490, qualified: 180, convRate: 36.7, roi: '+390%' },
    { source: 'Partner Referrals', leads: 310, qualified: 160, convRate: 51.6, roi: '+540%' },
    { source: 'Facebook & IG Ads', leads: 420, qualified: 110, convRate: 26.1, roi: '+180%' }
  ];

  const salesPerformance = {
    today: { revenue: 48500, leads: 24, qualified: 11, closed: 4, growth: '+18.4%' },
    thisWeek: { revenue: 215000, leads: 142, qualified: 68, closed: 19, growth: '+24.1%' },
    thisMonth: { revenue: 890000, leads: 580, qualified: 274, closed: 82, growth: '+34.8%' },
    thisYear: { revenue: 10450000, leads: 6840, qualified: 3120, closed: 940, growth: '+48.2%' }
  };

  const aiForecast = {
    tomorrowLeads: 32,
    weeklyLeads: 184,
    monthlyRevenue: '$1,150,000',
    quarterlyGrowth: '+32.8%',
    annualSales: '$14.2M',
    confidencePercentage: 94.8
  };

  const opportunities = [
    { id: 'op1', type: 'ENTERPRISE_CLIENT', title: 'Acme Global BioTech Expansion', customer: 'Dr. Aris Thorne', val: '$240,000', prob: '96%', badge: 'High-Value Enterprise' },
    { id: 'op2', type: 'LIKELY_CONVERT', title: 'Apex Vector Hub Upgrade', customer: 'Elena Rostova', val: '$115,000', prob: '92%', badge: 'Hot Velocity' },
    { id: 'op3', type: 'REPEAT_BUYER', title: 'Agentforce Seat Expansion x50', customer: 'Marcus Vance', val: '$85,000', prob: '89%', badge: 'Returning Buyer' },
    { id: 'op4', type: 'CHURN_RISK', title: 'Legacy Flow Builder Migration', customer: 'Global Logistics Inc', val: '$60,000', prob: '14%', badge: 'Intervention Needed' }
  ];

  const leaderboards = {
    reps: [
      { rank: 1, name: 'Marcus Thorne', deals: 34, revenue: '$1,240,000', winRate: '68%' },
      { rank: 2, name: 'Sarah Jenkins', deals: 29, revenue: '$1,080,000', winRate: '64%' },
      { rank: 3, name: 'Elena Rostova', deals: 26, revenue: '$920,000', winRate: '61%' },
      { rank: 4, name: 'David Kim', deals: 22, revenue: '$810,000', winRate: '59%' },
      { rank: 5, name: 'Rajesh Patel', deals: 19, revenue: '$740,000', winRate: '56%' }
    ],
    campaigns: [
      { name: 'Agentforce Autonomous CRM Launch', leads: 840, conv: '41.2%', rev: '$2.4M' },
      { name: 'Anji Somisetti AI Vector Search Blitz', leads: 620, conv: '38.5%', rev: '$1.8M' },
      { name: 'Flow Builder Executive Webinar', leads: 490, conv: '35.0%', rev: '$1.2M' }
    ]
  };

  const chartsData = {
    revenueTrend: [
      { month: 'Jan', revenue: 420000, leads: 320, qualified: 140 },
      { month: 'Feb', revenue: 480000, leads: 380, qualified: 170 },
      { month: 'Mar', revenue: 540000, leads: 420, qualified: 195 },
      { month: 'Apr', revenue: 610000, leads: 490, qualified: 230 },
      { month: 'May', revenue: 720000, leads: 540, qualified: 260 },
      { month: 'Jun', revenue: 890000, leads: 610, qualified: 310 }
    ],
    sourceShare: [
      { name: 'LinkedIn Ads', value: 32 },
      { name: 'Google Organic', value: 28 },
      { name: 'AI Chatbot', value: 18 },
      { name: 'Website', value: 12 },
      { name: 'Email & Other', value: 10 }
    ],
    funnel: [
      { stage: 'Unique Visitors', count: 18400, fill: '#3b82f6' },
      { stage: 'Captured Leads', count: 4820, fill: '#6366f1' },
      { stage: 'AI Qualified', count: 2140, fill: '#8b5cf6' },
      { stage: 'Demo Scheduled', count: 1120, fill: '#ec4899' },
      { stage: 'Closed Won Deals', count: 640, fill: '#10b981' }
    ],
    radar: [
      { subject: 'Lead Velocity', org: 92, benchmark: 74 },
      { subject: 'AI Scoring Fit', org: 96, benchmark: 68 },
      { subject: 'SLA Response', org: 88, benchmark: 65 },
      { subject: 'Deal Size', org: 94, benchmark: 80 },
      { subject: 'Retention Prob', org: 91, benchmark: 72 },
      { subject: 'Data Integrity', org: 99, benchmark: 85 }
    ]
  };

  const aiRecommendations = [
    { id: 'r1', text: 'Healthcare companies have shown the highest conversion rate today (+42.8%).', type: 'INSIGHT', priority: 'HIGH' },
    { id: 'r2', text: 'LinkedIn campaigns generated the most qualified enterprise leads ($310% ROI).', type: 'STRATEGY', priority: 'HIGH' },
    { id: 'r3', text: 'Leads requesting live demos convert 45% faster than standard ebook downloads.', type: 'VELOCITY', priority: 'MEDIUM' },
    { id: 'r4', text: 'Technology companies are expected to generate 14 more opportunities this week.', type: 'FORECAST', priority: 'MEDIUM' },
    { id: 'r5', text: 'Increase marketing allocation for Google Ads by 15% to capture APAC vector traffic.', type: 'ACTION', priority: 'HIGH' },
    { id: 'r6', text: 'Focus follow-up efforts on Hot Leads from the Financial Services sector.', type: 'PRIORITY', priority: 'HIGH' }
  ];

  res.json({
    filter,
    trendingProducts,
    trendingIndustries,
    trendingGeo,
    topCompanies,
    leadSources,
    salesPerformance,
    aiForecast,
    opportunities,
    leaderboards,
    chartsData,
    aiRecommendations,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/market-insights/analyze', async (req, res) => {
  const { customPrompt, filter } = req.body;
  let recommendations = [
    { text: 'Agentforce model detected a 28% surge in Asian-Pacific FinTech inquiries over the last 12 hours.', tag: 'ANOMALY DETECTED', score: '+18% Win Rate' },
    { text: 'Flow Builder automated reminders are boosting afternoon meeting attendance by 34%.', tag: 'AUTOMATION WIN', score: 'SLA Optimized' },
    { text: 'Recommend merging 4 duplicate Account hierarchies in Salesforce Org 00D8a00000XYZ.', tag: 'DATA SHIELD', score: '100% Clean' }
  ];

  if (process.env.GEMINI_API_KEY) {
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze enterprise CRM sales trends for filter "${filter || 'Last 30 Days'}". ${customPrompt ? 'User query: ' + customPrompt : ''} Give 3 sharp executive business recommendations in bullet points.`
      });
      if (response.text) {
        const bullets = response.text.split('\n').filter(b => b.trim().length > 5).slice(0, 3);
        if (bullets.length > 0) {
          recommendations = bullets.map((b, i) => ({
            text: b.replace(/^[-*•0-9.]+\s*/, ''),
            tag: i === 0 ? 'GEMINI LIVE INSIGHT' : i === 1 ? 'PREDICTIVE REASONING' : 'STRATEGIC ACTION',
            score: i === 0 ? '98% Confidence' : 'High ROI'
          }));
        }
      }
    } catch (e) {
      console.error('Gemini insights error:', e);
    }
  }

  res.json({
    recommendations,
    status: 'ANALYSIS_COMPLETE',
    timestamp: new Date().toISOString()
  });
});

// Vite Development & Production Static File Fallback
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Lead Fusion Enterprise] Server running securely on http://localhost:${PORT}`);
  });
}

startServer();
