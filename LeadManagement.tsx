import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useLeads } from '../context/LeadContext';
import { Lead } from '../types';
import { 
  Users, Search, Filter, ArrowUpDown, Download, Plus, 
  Trash2, Edit, ExternalLink, Sparkles, CheckSquare, 
  X, AlertTriangle, Building2, Flame 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LeadManagement: React.FC = () => {
  const { leads, deleteLead, createLead } = useLeads();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [ratingFilter, setRatingFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filtering Logic
  const filteredLeads = leads.filter(ld => {
    const q = searchQuery.toLowerCase();
    const matchQ = !q || ld.firstName.toLowerCase().includes(q) || ld.lastName.toLowerCase().includes(q) || ld.company.toLowerCase().includes(q) || ld.email.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'ALL' || ld.status === statusFilter;
    const matchRating = ratingFilter === 'ALL' || ld.rating === ratingFilter;
    return matchQ && matchStatus && matchRating;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredLeads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredLeads.map(l => l.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Purge ${selectedIds.length} leads from Salesforce Gateway?`)) return;
    for (const id of selectedIds) {
      await deleteLead(id);
    }
    setSelectedIds([]);
  };

  const handleCreateNew = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await createLead({
      firstName: fd.get('firstName') as string,
      lastName: fd.get('lastName') as string,
      email: fd.get('email') as string,
      company: fd.get('company') as string,
      industry: fd.get('industry') as string,
      jobTitle: fd.get('jobTitle') as string,
      revenue: '$10M+',
      budget: '$75,000+',
      country: 'United States',
      preferredContactTime: 'ASAP',
      productInterest: 'Agentforce Suite'
    });
    setIsAddModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        
        {/* Page Title & Bulk Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">CRITICAL CRM OBJECTS</span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Lead Management Hub</h1>
          </div>

          <div className="flex items-center gap-3">
            {selectedIds.length > 0 && (
              <button 
                onClick={handleBulkDelete}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 animate-in zoom-in"
              >
                <Trash2 className="w-4 h-4" /> Purge ({selectedIds.length})
              </button>
            )}
            <button 
              onClick={() => alert('Simulating CSV Export of filtered CRM records.')}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-2 shadow-xs"
            >
              <Download className="w-4 h-4 text-blue-600" /> Export CSV
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" /> Add Salesforce Lead
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search executive, firm, domain..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select 
                value={statusFilter} 
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-slate-50 border rounded-xl px-3 py-2 text-xs font-medium text-slate-700"
              >
                <option value="ALL">Status: All</option>
                <option value="New">Status: New</option>
                <option value="Contacted">Status: Contacted</option>
                <option value="Qualified">Status: Qualified</option>
              </select>
            </div>

            <select 
              value={ratingFilter} 
              onChange={e => setRatingFilter(e.target.value)}
              className="bg-slate-50 border rounded-xl px-3 py-2 text-xs font-medium text-slate-700"
            >
              <option value="ALL">Rating: All</option>
              <option value="Hot">Rating: Hot Tier 1</option>
              <option value="Warm">Rating: Warm Tier 2</option>
              <option value="Cold">Rating: Cold Tier 3</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase tracking-wider">
                  <th className="py-4 pl-6 pr-3 w-10">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.length > 0 && selectedIds.length === filteredLeads.length}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer" 
                    />
                  </th>
                  <th className="py-4 px-4 font-semibold">Prospect Details</th>
                  <th className="py-4 px-4 font-semibold">Company / Firm</th>
                  <th className="py-4 px-4 font-semibold">Anji Somisetti AI Score</th>
                  <th className="py-4 px-4 font-semibold">Salesforce ID</th>
                  <th className="py-4 px-4 font-semibold">Status</th>
                  <th className="py-4 pr-6 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredLeads.map(ld => {
                  const isSelected = selectedIds.includes(ld.id);
                  return (
                    <tr key={ld.id} className={`hover:bg-blue-50/40 transition-colors ${isSelected ? 'bg-blue-50/70' : ''}`}>
                      <td className="py-4 pl-6 pr-3">
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => toggleSelectOne(ld.id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer" 
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900 text-sm">{ld.firstName} {ld.lastName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{ld.email}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-slate-800 font-semibold">{ld.company}</div>
                        <div className="text-[11px] text-slate-400">{ld.industry}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-md font-mono font-bold text-xs ${
                            ld.aiScore >= 80 ? 'bg-emerald-100 text-emerald-800' :
                            ld.aiScore >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {ld.aiScore}%
                          </span>
                          {ld.rating === 'Hot' && <Flame className="w-4 h-4 text-red-500 fill-red-500 shrink-0" title="Hot Tier 1 Lead" />}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono text-[11px] text-blue-600">{ld.salesforceId || '00Q8aXYZ'}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                          ld.status === 'Qualified' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {ld.status}
                        </span>
                      </td>
                      <td className="py-4 pr-6 text-right space-x-3">
                        <button 
                          onClick={() => navigate(`/lead-details/${ld.id}`)}
                          className="text-blue-600 font-bold hover:underline"
                        >
                          Inspect
                        </button>
                        <button 
                          onClick={async () => { if(confirm('Purge lead?')) await deleteLead(ld.id); }}
                          className="text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b">
              <h3 className="font-bold text-lg text-slate-900">Manual Salesforce Lead Ingestion</h3>
              <button onClick={() => setIsAddModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleCreateNew} className="space-y-4 mt-6 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <input required name="firstName" placeholder="First Name *" className="border rounded-xl p-2.5 text-xs" />
                <input required name="lastName" placeholder="Last Name *" className="border rounded-xl p-2.5 text-xs" />
              </div>
              <input required type="email" name="email" placeholder="Corporate Email *" className="w-full border rounded-xl p-2.5 text-xs font-mono" />
              <input required name="company" placeholder="Company Name *" className="w-full border rounded-xl p-2.5 text-xs" />
              <div className="grid grid-cols-2 gap-3">
                <input name="jobTitle" placeholder="Job Title" className="border rounded-xl p-2.5 text-xs" />
                <select name="industry" className="border rounded-xl p-2.5 text-xs">
                  <option value="Cloud SaaS">Cloud SaaS</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Robotics">Robotics</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl bg-slate-100 font-bold text-xs">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md">Dispatch Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
