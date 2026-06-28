import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLeads } from '../../context/LeadContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Bot, Sparkles, Bell, User as UserIcon, Menu, X, 
  ShieldAlert, Layers, BarChart3, ChevronDown, LogOut, Sun, Moon 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications } = useLeads();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.isRead).length;

  const isPublicPage = ['/', '/about', '/features', '/pricing', '/contact', '/faq', '/blog'].includes(location.pathname);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Lead Fusion
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400 -mt-1">
                Salesforce Sync
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-slate-800/50 p-1.5 rounded-full border border-slate-700/50 text-sm">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-full transition-all ${location.pathname === '/' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}
            >
              Overview
            </Link>
            <Link 
              to="/features" 
              className={`px-4 py-2 rounded-full transition-all ${location.pathname === '/features' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}
            >
              Features & CRM
            </Link>
            <Link 
              to="/pricing" 
              className={`px-4 py-2 rounded-full transition-all ${location.pathname === '/pricing' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}
            >
              Pricing
            </Link>
            <Link 
              to="/contact" 
              className={`px-4 py-2 rounded-full transition-all ${location.pathname === '/contact' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}
            >
              Lead Capture Demo
            </Link>
            <Link 
              to="/faq" 
              className={`px-4 py-2 rounded-full transition-all ${location.pathname === '/faq' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}
            >
              FAQ
            </Link>
            <Link 
              to="/blog" 
              className={`px-4 py-2 rounded-full transition-all ${location.pathname === '/blog' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}
            >
              Insights
            </Link>
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 text-xs font-mono"
              title={theme === 'dark' ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/dashboard" 
                  className="px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 transition-all text-sm font-semibold flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </Link>

                {/* Notifications Bell */}
                <Link to="/notifications" className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                  <Bell className="w-5 h-5" />
                  {unreadNotifs > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center animate-bounce">
                      {unreadNotifs}
                    </span>
                  )}
                </Link>

                {/* Profile Dropdown Trigger */}
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
                  >
                    <img 
                      src={user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`} 
                      alt={user.fullName}
                      className="w-8 h-8 rounded-full object-cover border border-blue-500" 
                    />
                    <span className="text-xs font-medium text-slate-200 max-w-[100px] truncate">{user.fullName.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-slate-700/80">
                        <p className="text-xs font-semibold text-white">{user.fullName}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                        <span className="mt-1.5 inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          {user.role}
                        </span>
                      </div>
                      
                      <div className="py-1">
                        <Link 
                          to="/account-details" 
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-700/60 hover:text-white"
                        >
                          <UserIcon className="w-4 h-4 text-blue-400" />
                          Account Details
                        </Link>
                        <Link 
                          to="/user-profile" 
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-700/60 hover:text-white"
                        >
                          <Layers className="w-4 h-4 text-indigo-400" />
                          User Profile Settings
                        </Link>
                        <Link 
                          to="/help-center" 
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-700/60 hover:text-white"
                        >
                          <ShieldAlert className="w-4 h-4 text-emerald-400" />
                          Help Center & Architecture
                        </Link>
                      </div>

                      <div className="border-t border-slate-700/80 pt-1 mt-1">
                        <button 
                          onClick={() => { logout(); setIsProfileDropdownOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-800 text-amber-400"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-300" />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-sm font-medium">Overview</Link>
            <Link to="/features" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-sm font-medium">Features</Link>
            <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-sm font-medium">Pricing</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-sm font-medium">Demo Form</Link>
            <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-sm font-medium">FAQ</Link>
            <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-sm font-medium">Blog</Link>
          </div>
          
          {isAuthenticated && user ? (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 p-2 bg-slate-800/60 rounded-xl">
                <img src={user.avatarUrl} className="w-10 h-10 rounded-full border border-blue-500" alt={user.fullName} />
                <div>
                  <p className="text-sm font-bold text-white">{user.fullName}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
              </div>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-3 bg-blue-600 text-white rounded-xl font-bold text-sm">Open CRM Dashboard</Link>
              <Link to="/account-details" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 text-sm text-slate-300">Account Details</Link>
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 text-sm text-red-400 font-medium">Sign Out</button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl bg-slate-800 font-medium text-sm">Sign In</Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/30">Get Started Free</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
