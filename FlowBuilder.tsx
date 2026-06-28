import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { mockFlows } from '../data/mockDatabase';
import { Workflow, Plus, Play, CheckCircle2, Zap, ArrowRight, Mail, Bell, Database } from 'lucide-react';

export const FlowBuilder: React.FC = () => {
  const [flows, setFlows] = useState(mockFlows);
  const [activeFlowId, setActiveFlowId] = useState(flows[0].id);

  const activeFlow = flows.find(f => f.id === activeFlowId) || flows[0];

  const triggerSimulation = () => {
    alert(`⚡ SIMULATION DISPATCHED: Platform Event emitted for flow "${activeFlow.name}". Check Toast / Notifications log.`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-300">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold flex items-center gap-2">
              <Workflow className="w-4 h-4" /> SALESFORCE DECLARATIVE AUTOMATION
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Visual Flow Builder Engine</h1>
          </div>
          <button 
            onClick={triggerSimulation}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl shadow-emerald-600/30 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" /> Simulate Record-Triggered Event
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Flow Selector */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-4">ACTIVE FLOW DEFINITIONS</h3>
            {flows.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFlowId(f.id)}
                className={`w-full p-4 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                  activeFlowId === f.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span className="font-bold text-sm">{f.name}</span>
                <span className={`text-[10px] font-mono mt-2 uppercase font-semibold ${activeFlowId === f.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                  Trigger: {f.triggerType}
                </span>
              </button>
            ))}
          </div>

          {/* Right Visual Canvas Diagram */}
          <div className="lg:col-span-3 bg-[#0F172A] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[500px] relative font-mono select-none">
            
            <div className="absolute top-6 left-6 text-xs text-slate-400">
              CANVAS_STATUS: <span className="text-emerald-400">RECORD_TRIGGERED_ACTIVE</span>
            </div>

            {/* Step 1: Trigger Block */}
            <div className="w-72 bg-gradient-to-r from-blue-600 to-indigo-600 p-5 rounded-2xl shadow-xl text-center border border-blue-400/50">
              <span className="text-[10px] text-blue-200 block mb-1">⚡ PLATFORM EVENT TRIGGER</span>
              <p className="font-bold text-sm">{activeFlow.triggerType}</p>
            </div>

            <div className="h-10 w-0.5 bg-blue-500 my-2 animate-pulse"></div>

            {/* Step 2: Condition Block */}
            <div className="w-72 bg-slate-900 p-5 rounded-2xl shadow-xl text-center border border-amber-500/60 text-amber-300">
              <span className="text-[10px] text-amber-400/80 block mb-1">🔍 BOOLEAN LOGIC CHECK</span>
              <p className="font-bold text-xs">{activeFlow.condition}</p>
            </div>

            <div className="h-10 w-0.5 bg-emerald-500 my-2 animate-pulse"></div>

            {/* Step 3: Action Block */}
            <div className="w-72 bg-emerald-950 p-5 rounded-2xl shadow-xl text-center border border-emerald-500 text-emerald-200">
              <span className="text-[10px] text-emerald-400 block mb-1">🎯 WORKFLOW ACTION DISPATCH</span>
              <p className="font-bold text-xs">{activeFlow.actionType}</p>
              <p className="text-[10px] opacity-80 mt-1">{activeFlow.actionDetails}</p>
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
