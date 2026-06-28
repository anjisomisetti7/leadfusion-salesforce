import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useTheme } from '../../context/ThemeContext';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col dashboard-layout ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-[#F8FAFC] text-slate-900'} font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200`}>
      <Navbar />
      <div className="flex-1 flex flex-row min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden p-6 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
