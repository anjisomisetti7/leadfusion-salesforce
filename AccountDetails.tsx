import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { 
  User, Mail, Phone, Building2, Briefcase, Globe, ShieldCheck, 
  Calendar, Key, Download, Trash2, Edit3, Camera, CheckCircle2, 
  AlertTriangle, Lock, X 
} from 'lucide-react';

export const AccountDetails: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  if (!user) return null;

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    updateUser({
      fullName: fd.get('fullName') as string,
      company: fd.get('company') as string,
      jobTitle: fd.get('jobTitle') as string,
      industry: fd.get('industry') as string,
      phone: fd.get('phone') as string,
      country: fd.get('country') as string
    });
    setIsEditModalOpen(false);
    showNotice('Profile firmographics updated successfully.');
  };

  const handlePhotoUpload = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    updateUser({
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`
    });
    showNotice('Simulated avatar photo uploaded & synced.');
  };

  const showNotice = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const simulateDownloadPDF = () => {
    showNotice('Executive Profile Summary PDF exported (Simulated Blob).');
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 w-full animate-in fade-in duration-300">
        
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-[#1E293B] p-6 sm:p-8 rounded-3xl text-white shadow-xl border border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>EXECUTIVE IDENTITY &amp; RBAC PERMISSIONS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Account Details</h1>
            <p className="text-xs text-slate-400 mt-1">Manage your corporate credentials, Salesforce Org linkages, and SOC2 profile certificates.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
            <button 
              onClick={simulateDownloadPDF}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-emerald-400" /> Export PDF
            </button>
          </div>
        </div>

        {actionSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-900/80 border border-emerald-500/50 text-emerald-100 text-xs font-semibold flex items-center gap-3 shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Profile Grid Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Avatar Card & Status */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center flex flex-col items-center space-y-6">
            <div className="relative group">
              <img 
                src={user.avatarUrl} 
                alt={user.fullName} 
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-600 shadow-xl"
              />
              <button 
                onClick={handlePhotoUpload}
                className="absolute bottom-1 right-1 p-2.5 rounded-full bg-slate-900 text-white hover:bg-blue-600 shadow-lg transition-transform group-hover:scale-110"
                title="Simulate Uploading Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">{user.fullName}</h2>
              <p className="text-xs text-blue-600 font-mono font-bold mt-0.5">{user.jobTitle || 'Executive AE'}</p>
              <p className="text-xs text-slate-500 mt-1">{user.company}</p>
            </div>

            <div className="w-full pt-6 border-t border-slate-100 space-y-3 text-left">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-mono">ACCOUNT_ID:</span>
                <span className="font-mono font-bold text-slate-700 truncate max-w-[140px]">{user.id}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-mono">SYSTEM_ROLE:</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 font-mono">{user.role}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-mono">AUTH_STATUS:</span>
                <span className="text-emerald-600 font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> ACTIVE
                </span>
              </div>
            </div>

            <div className="w-full pt-4 space-y-2">
              <button 
                onClick={() => setIsPasswordModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Key className="w-4 h-4 text-indigo-600" /> Change Password
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete Workspace Account
              </button>
            </div>
          </div>

          {/* Right Column: Firmographics & Metadata */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 font-mono uppercase tracking-wider text-blue-600">
                // Corporate Firmographics &amp; Contact Attributes
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 font-mono block mb-1 flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-blue-500" /> Email Address</span>
                <span className="font-bold text-slate-800 font-mono text-xs">{user.email}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 font-mono block mb-1 flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-emerald-500" /> Phone Number</span>
                <span className="font-bold text-slate-800 font-mono text-xs">{user.phone || '+1 (415) 882-9910'}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 font-mono block mb-1 flex items-center gap-2"><Building2 className="w-3.5 h-3.5 text-indigo-500" /> Company</span>
                <span className="font-bold text-slate-800">{user.company}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 font-mono block mb-1 flex items-center gap-2"><Briefcase className="w-3.5 h-3.5 text-amber-500" /> Industry Vertical</span>
                <span className="font-bold text-slate-800">{user.industry || 'Enterprise SaaS'}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 font-mono block mb-1 flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-cyan-500" /> Country / Jurisdiction</span>
                <span className="font-bold text-slate-800">{user.country || 'United States'}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 font-mono block mb-1 flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-purple-500" /> Registration Timestamp</span>
                <span className="font-bold text-slate-800 font-mono text-xs">{user.createdAt || '2026-01-10'}</span>
              </div>
            </div>

            {/* Salesforce Connected Org Badge */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/10 to-indigo-900/10 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold font-mono text-blue-900 uppercase">⚡ Salesforce Lightning Connected Org</h4>
                <p className="text-xs text-slate-600 mt-1">Bi-directional token mapping synchronized via JWT OAuth client.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-mono font-bold shadow-md">
                SYNCED: Org 00D8aXYZ
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b">
              <h3 className="font-bold text-lg text-slate-900">Edit Executive Profile</h3>
              <button onClick={() => setIsEditModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4 mt-6 text-sm">
              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Full Name</label>
                <input name="fullName" defaultValue={user.fullName} className="w-full border rounded-xl p-2.5" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Company</label>
                  <input name="company" defaultValue={user.company} className="w-full border rounded-xl p-2.5" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Job Title</label>
                  <input name="jobTitle" defaultValue={user.jobTitle} className="w-full border rounded-xl p-2.5" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Industry</label>
                  <input name="industry" defaultValue={user.industry} className="w-full border rounded-xl p-2.5" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Phone</label>
                  <input name="phone" defaultValue={user.phone} className="w-full border rounded-xl p-2.5" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Country</label>
                <input name="country" defaultValue={user.country} className="w-full border rounded-xl p-2.5" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 rounded-xl bg-slate-100 font-bold text-xs">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 text-center">
            <Lock className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-slate-900">Change Executive Password</h3>
            <p className="text-xs text-slate-400 mt-1">Simulating bcrypt password rotation.</p>
            <div className="mt-6 space-y-3 text-left text-xs">
              <input type="password" placeholder="Current Password" className="w-full border rounded-xl p-2.5" />
              <input type="password" placeholder="New Password" className="w-full border rounded-xl p-2.5" />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsPasswordModalOpen(false)} className="px-5 py-2 rounded-xl bg-slate-100 font-bold text-xs">Close</button>
              <button onClick={() => { setIsPasswordModalOpen(false); showNotice('Password updated successfully.'); }} className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs">Rotate Key</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-red-200 animate-in zoom-in-95 text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-slate-900">Revoke Workspace Identity?</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">This simulated deletion emits a revocation request to Salesforce Gateway and purges MongoDB records.</p>
            <div className="mt-8 flex justify-center gap-4">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-6 py-2.5 rounded-xl bg-slate-100 font-bold text-xs">Cancel</button>
              <button onClick={() => { setIsDeleteModalOpen(false); showNotice('Simulated account purge triggered.'); }} className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow-lg">Confirm Purge</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
