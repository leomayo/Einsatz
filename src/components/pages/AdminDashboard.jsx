import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../Header';
import IndustryManager from '../admin/IndustryManager';
import WorkTypeManager from '../admin/WorkTypeManager';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('industries'); // or 'workTypes'

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('industries')}
              className={`${
                activeTab === 'industries'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Industries
            </button>
            <button
              onClick={() => setActiveTab('workTypes')}
              className={`${
                activeTab === 'workTypes'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Work Types
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'industries' ? (
            <IndustryManager />
          ) : (
            <WorkTypeManager />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 