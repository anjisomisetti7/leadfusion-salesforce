import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LeadProvider } from './context/LeadContext';
import { ThemeProvider } from './context/ThemeContext';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { About } from './pages/About';
import { Features } from './pages/Features';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { FAQPage } from './pages/FAQPage';
import { Blog } from './pages/Blog';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { EmailVerification } from './pages/auth/EmailVerification';

// Workspace Pages
import { AccountDetails } from './pages/AccountDetails';
import { Dashboard } from './pages/Dashboard';
import { LeadManagement } from './pages/LeadManagement';
import { LeadDetails } from './pages/LeadDetails';
import { LeadAnalytics } from './pages/LeadAnalytics';
import { AIInsights } from './pages/AIInsights';
import { FlowBuilder } from './pages/FlowBuilder';
import { SalesforceHub } from './pages/SalesforceHub';
import { NotificationsPage } from './pages/NotificationsPage';
import { Settings } from './pages/Settings';
import { UserProfile } from './pages/UserProfile';
import { HelpCenter } from './pages/HelpCenter';
import { AdminDashboard } from './pages/AdminDashboard';

// Shared Widgets
import { FloatingChatbot } from './components/chatbot/FloatingChatbot';
import { ToastContainer } from './components/common/ToastContainer';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono text-sm">Loading Workspace Gateway...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative">
      <Routes>
        {/* Public Marketing Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/blog" element={<Blog />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<EmailVerification />} />

        {/* Protected Executive Routes */}
        <Route path="/account-details" element={<ProtectedRoute><AccountDetails /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/lead-management" element={<ProtectedRoute><LeadManagement /></ProtectedRoute>} />
        <Route path="/lead-details/:id" element={<ProtectedRoute><LeadDetails /></ProtectedRoute>} />
        <Route path="/lead-analytics" element={<ProtectedRoute><LeadAnalytics /></ProtectedRoute>} />
        <Route path="/ai-insights" element={<ProtectedRoute><AIInsights /></ProtectedRoute>} />
        <Route path="/flow-builder" element={<ProtectedRoute><FlowBuilder /></ProtectedRoute>} />
        <Route path="/salesforce" element={<ProtectedRoute><SalesforceHub /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/user-profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/help-center" element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global AI Floating Widget & Toasts */}
      <FloatingChatbot />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <LeadProvider>
            <AppContent />
          </LeadProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
