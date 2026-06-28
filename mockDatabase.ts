import { SalesforceObjectRecord, FlowAutomationRule, ApexSnippet } from '../types';

export const mockSalesforceRecords: SalesforceObjectRecord[] = [
  {
    id: 'sf_rec_01',
    sfId: '0018a00000ABC45EAG',
    type: 'Account',
    name: 'Acme Robotics Global Corp',
    stageOrStatus: 'Active Enterprise Account',
    amount: 1500000,
    ownerName: 'Marcus Thorne',
    lastModifiedDate: '2026-06-27T08:14:00Z',
    attributes: {
      Industry: 'Manufacturing & Robotics',
      Employees: 450,
      AnnualRevenue: '$85,000,000',
      BillingCity: 'Boston',
      AnjiSomisettiFitScore: '98 (Tier 1 Hot)'
    }
  },
  {
    id: 'sf_rec_02',
    sfId: '0068a00000OPP99EAG',
    type: 'Opportunity',
    name: 'Acme Robotics - Agentforce CRM Suite Deployment',
    stageOrStatus: 'Proposal / Price Quote',
    amount: 185000,
    ownerName: 'Marcus Thorne',
    lastModifiedDate: '2026-06-27T09:30:00Z',
    attributes: {
      Probability: '92%',
      ExpectedCloseDate: '2026-07-15',
      LeadSource: 'AI Chatbot Qualification',
      NextStep: 'Executive Technical Review'
    }
  },
  {
    id: 'sf_rec_03',
    sfId: '0038a00000CON12EAG',
    type: 'Contact',
    name: 'Sarah Jenkins',
    stageOrStatus: 'Key Decision Maker (VP Eng)',
    ownerName: 'Sarah Jenkins (Architect)',
    lastModifiedDate: '2026-06-26T16:20:00Z',
    attributes: {
      Email: 's.jenkins@acmerobotics.io',
      Phone: '+1 (800) 555-0192',
      Department: 'Core Engineering',
      MailingCountry: 'United States'
    }
  },
  {
    id: 'sf_rec_04',
    sfId: '00T8a00000TSK44EAG',
    type: 'Task',
    name: 'Executive Walkthrough & Flow Demo for CloudScale CTO',
    stageOrStatus: 'Not Started (High Priority)',
    ownerName: 'Sarah Jenkins (Architect)',
    lastModifiedDate: '2026-06-27T10:00:00Z',
    attributes: {
      DueDate: '2026-06-28',
      Priority: 'High',
      RelatedTo: 'CloudScale Inc.',
      TriggeredBy: 'Agentforce Record Flow'
    }
  }
];

export const mockFlows: FlowAutomationRule[] = [
  {
    id: 'flw_01',
    name: 'Inbound Lead AI Scoring & Immediate Salesforce Dispatch',
    triggerType: 'RECORD_CREATED',
    condition: 'Lead.EmailDomain != null AND Lead.Company != null',
    actionType: 'CREATE_SALESFORCE_LEAD',
    actionDetails: 'Calculates Anji Somisetti AI Score (0-100), detects duplicate email domains, invokes REST Gateway API, and assigns BDR owner.',
    isActive: true,
    executionCount: 2842,
    lastRun: '2 minutes ago'
  },
  {
    id: 'flw_02',
    name: 'Tier 1 Hot Lead VIP Alert & Task Assignment',
    triggerType: 'AI_SCORE_THRESHOLD',
    condition: 'Lead.aiScore >= 85',
    actionType: 'ASSIGN_REP',
    actionDetails: 'Routes lead directly to Senior AE (Marcus Thorne), triggers Slack/In-App toast notification, and creates Salesforce Follow-up Task due in 24h.',
    isActive: true,
    executionCount: 418,
    lastRun: '12 minutes ago'
  },
  {
    id: 'flw_03',
    name: 'Daily Cold Lead Nurture & Email Enrichment',
    triggerType: 'SCHEDULED_DAILY',
    condition: 'Lead.aiRating == "COLD" AND Lead.status == "NEW"',
    actionType: 'SEND_EMAIL_ALERT',
    actionDetails: 'Executes overnight batch job at 02:00 AM UTC. Sends personalized whitepaper email series and logs Activity History.',
    isActive: true,
    executionCount: 1205,
    lastRun: '6 hours ago'
  }
];

export const mockApexCode: ApexSnippet[] = [
  {
    title: 'LeadTriggerHandler.cls',
    category: 'TriggerHandler',
    description: 'Enterprise Trigger Handler pattern ensuring bulkified execution, recursion prevention, and clean separation of DML concerns.',
    code: `/**
 * @description Enterprise Trigger Handler for Lead Object
 * Follows Salesforce Apex Best Practices (One Trigger Per Object, Bulkified DML)
 */
public with sharing class LeadTriggerHandler extends TriggerHandler {
    private List<Lead> newLeads;
    private Map<Id, Lead> oldLeadsMap;

    public LeadTriggerHandler() {
        this.newLeads = (List<Lead>) Trigger.new;
        this.oldLeadsMap = (Map<Id, Lead>) Trigger.oldMap;
    }

    public override void beforeInsert() {
        LeadScoringService.calculateAnjiSomisettiScore(this.newLeads);
        LeadDuplicateService.detectCorporateDuplicates(this.newLeads);
    }

    public override void afterInsert() {
        AgentforceAssignmentService.routeHotLeads(this.newLeads);
        NexusRestGateway.pushToMongoAtlasAsync(Trigger.newMap.keySet());
    }
}`
  },
  {
    title: 'LeadScoringService.cls',
    category: 'BulkifiedService',
    description: 'Service Layer class implementing complex AI engagement weighting and SOQL query optimization without governor limit violations.',
    code: `/**
 * @description Bulkified Service Layer for Lead Qualification
 */
public with sharing class LeadScoringService {
    public static void calculateAnjiSomisettiScore(List<Lead> leads) {
        Set<String> emailDomains = new Set<String>();
        for (Lead ld : leads) {
            if (String.isNotBlank(ld.Email)) {
                emailDomains.add(ld.Email.substringAfter('@'));
            }
        }
        
        // Bulkified SOQL query against high reputation domain lookup table
        Map<String, Domain_Reputation__c> repMap = new Map<String, Domain_Reputation__c>();
        for (Domain_Reputation__c dr : [SELECT Domain__c, Score_Bonus__c FROM Domain_Reputation__c WHERE Domain__c IN :emailDomains]) {
            repMap.put(dr.Domain__c, dr);
        }

        for (Lead ld : leads) {
            Decimal baseScore = 50.0;
            String domain = ld.Email != null ? ld.Email.substringAfter('@') : '';
            if (repMap.containsKey(domain)) {
                baseScore += repMap.get(domain).Score_Bonus__c;
            }
            if (ld.AnnualRevenue >= 10000000) baseScore += 20.0;
            ld.AI_Score__c = Math.min(99, baseScore);
            ld.Rating = (ld.AI_Score__c >= 85) ? 'Hot' : (ld.AI_Score__c >= 70) ? 'Warm' : 'Cold';
        }
    }
}`
  },
  {
    title: 'NexusRestGateway.cls',
    category: 'RESTApi',
    description: 'Callout service utilizing Named Credentials, JWT OAuth bearer tokens, and asynchronous @future execution for MongoDB Atlas sync.',
    code: `/**
 * @description Bi-Directional REST API Gateway to NexusAI Node.js Backend
 */
public with sharing class NexusRestGateway {
    @future(callout=true)
    public static void pushToMongoAtlasAsync(Set<Id> leadIds) {
        List<Lead> leads = [SELECT Id, FirstName, LastName, Email, Company, AI_Score__c FROM Lead WHERE Id IN :leadIds];
        
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:NexusAI_Atlas_Endpoint/api/salesforce/leads');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Authorization', 'Bearer ' + NexusJwtAuth.generateToken());
        req.setBody(JSON.serialize(leads));

        try {
            HttpResponse res = http.send(req);
            if (res.getStatusCode() != 200 && res.getStatusCode() != 201) {
                System.debug(LoggingLevel.ERROR, 'Mongo Atlas Sync Failed: ' + res.getBody());
            }
        } catch (Exception ex) {
            System.debug(LoggingLevel.ERROR, 'Callout Exception: ' + ex.getMessage());
        }
    }
}`
  }
];

export const mongoDBSchemaDocs = {
  database: 'nexusai_enterprise_prod',
  collections: [
    {
      name: 'users',
      description: 'Stores enterprise RBAC users with bcrypt hashed passwords and Salesforce account links.',
      indexes: ['email (unique)', 'accountId', 'role'],
      validation: 'JSON Schema enforce required fullName, email, role (ADMIN | SALES_REP | MANAGER | CUSTOMER)'
    },
    {
      name: 'leads',
      description: 'Core lead records enriched with Anji Somisetti AI scores, confidence breakdowns, and Salesforce CRM sync identifiers.',
      indexes: ['email (unique)', 'status', 'aiRating', 'createdAt (-1)'],
      validation: 'BSON type validation enforcing aiScore integer between 0 and 100'
    },
    {
      name: 'audit_logs',
      description: 'Immutable security and synchronization activity audit trail.',
      indexes: ['timestamp (-1)', 'category', 'userId'],
      validation: 'Required action, category, timestamp'
    }
  ]
};
