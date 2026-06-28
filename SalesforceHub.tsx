import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { mockApexCode } from '../data/mockDatabase';
import { Cpu, Code2, Database, Layers, CheckCircle2, Copy } from 'lucide-react';

export const SalesforceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState(mockApexCode[0].title);
  const snippet = mockApexCode.find(s => s.title === activeTab) || mockApexCode[0];

  const soqlExample = `SELECT Id, FirstName, LastName, Company, Email, Anji_Somisetti_AI_Score__c, Status\nFROM Lead\nWHERE Anji_Somisetti_AI_Score__c >= 80 AND IsConverted = false\nORDER BY CreatedDate DESC\nLIMIT 100`;

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-300">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4" /> BULKIFIED GOVERNOR COMPLIANT CORE
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Salesforce Developer Hub</h1>
          </div>
          <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">
            API VERSION: v61.0 (Summer '26)
          </span>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          {mockApexCode.map(sn => (
            <button
              key={sn.title}
              onClick={() => setActiveTab(sn.title)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeTab === sn.title ? 'bg-slate-900 text-white shadow-md' : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4 text-blue-400" />
              <span>{sn.title}</span>
            </button>
          ))}
          <button
            onClick={() => setActiveTab('soql')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'soql' ? 'bg-slate-900 text-white shadow-md' : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            <Database className="w-4 h-4 text-amber-400" />
            <span>SOQL Query Console</span>
          </button>
        </div>

        {/* Code Viewer Box */}
        <div className="bg-[#0F172A] rounded-3xl p-8 text-slate-200 shadow-2xl border border-slate-800 font-mono text-xs relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 text-slate-400">
            <span>// {activeTab === 'soql' ? 'ENTERPRISE SOQL QUERY EXECUTION' : snippet.description}</span>
            <button 
              onClick={() => { navigator.clipboard.writeText(activeTab === 'soql' ? soqlExample : snippet.code); alert('Snippet copied to clipboard!'); }}
              className="px-3 py-1 bg-slate-800 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Code
            </button>
          </div>

          <pre className="text-blue-300 overflow-x-auto leading-relaxed max-h-[550px] overflow-y-auto">
            {activeTab === 'soql' ? soqlExample : snippet.code}
          </pre>
        </div>

      </div>
    </DashboardLayout>
  );
};
