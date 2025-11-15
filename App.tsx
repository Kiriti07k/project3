
import React, { useState } from 'react';
import { UserRole } from './types';
import InvestorView from './components/InvestorView';
import AdminView from './components/AdminView';
import AdvisorView from './components/AdvisorView';
import AnalystView from './components/AnalystView';
import { ChartBarIcon, UserGroupIcon, DocumentTextIcon, WrenchScrewdriverIcon } from './components/icons';

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.Investor);

  const renderView = () => {
    switch (currentRole) {
      case UserRole.Investor:
        return <InvestorView />;
      case UserRole.Admin:
        return <AdminView />;
      case UserRole.FinancialAdvisor:
        return <AdvisorView />;
      case UserRole.DataAnalyst:
        return <AnalystView />;
      default:
        return <InvestorView />;
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.Investor:
        return <UserGroupIcon className="w-5 h-5 mr-2" />;
      case UserRole.FinancialAdvisor:
        return <DocumentTextIcon className="w-5 h-5 mr-2" />;
      case UserRole.DataAnalyst:
        return <ChartBarIcon className="w-5 h-5 mr-2" />;
      case UserRole.Admin:
        return <WrenchScrewdriverIcon className="w-5 h-5 mr-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center text-brand-primary">
             <ChartBarIcon className="w-8 h-8 mr-2 text-brand-secondary"/>
            <h1 className="text-2xl font-bold">Mutual Fund Insights</h1>
          </div>
          <div className="mt-4 sm:mt-0">
            <span className="text-sm text-slate-500 mr-2">Viewing as:</span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as UserRole)}
              className="p-2 border border-slate-300 rounded-lg text-brand-primary font-semibold focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            >
              {Object.values(UserRole).map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>

      <footer className="bg-white mt-8 py-6 border-t">
        <div className="container mx-auto text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Mutual Fund Insight Platform. All rights reserved.</p>
          <p className="mt-1">This is a demo application. Not financial advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
