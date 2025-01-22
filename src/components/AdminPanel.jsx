import React, { useState } from 'react';
import TranslationManager from './TranslationManager';
import { useTranslation } from 'react-i18next';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const { t } = useTranslation();
  const [editingItem, setEditingItem] = useState(null);

  // Get all industries and their work types
  const industries = t('freelancerSignUp.industries', { returnObjects: true });
  const workTypes = t('freelancerSignUp.workTypes', { returnObjects: true });

  const handleDelete = async (type, key, industry = null) => {
    console.log('Delete called with:', { type, key, industry });
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const response = await fetch('/api/translations/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          key,
          industry
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Delete response:', data);
      
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            <svg
              className="mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
          Admin Panel
        </h1>

        {/* Current Industries and Work Types */}
        <div className="bg-white shadow rounded-lg mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Current Industries and Work Types</h2>
          
          <div className="space-y-6">
            {Object.entries(industries).map(([industryKey, industryName]) => (
              <div key={industryKey} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">
                    {industryName} ({industryKey})
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        console.log('Editing industry:', { type: 'industry', key: industryKey });
                        setEditingItem({ type: 'industry', key: industryKey });
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete('industry', industryKey)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Work Types for this industry */}
                <div className="ml-4 space-y-2">
                  {workTypes[industryKey] && Object.entries(workTypes[industryKey]).map(([workTypeKey, workTypeName]) => (
                    <div key={workTypeKey} className="flex items-center justify-between py-1">
                      <span>{workTypeName} ({workTypeKey})</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            console.log('Editing work type:', { 
                              type: 'workType', 
                              key: workTypeKey, 
                              industry: industryKey 
                            });
                            setEditingItem({ 
                              type: 'workType', 
                              key: workTypeKey, 
                              industry: industryKey 
                            });
                          }}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete('workType', workTypeKey, industryKey)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Translation Manager */}
        <TranslationManager 
          editingItem={editingItem} 
          onEditComplete={() => setEditingItem(null)} 
        />
      </div>
    </div>
  );
};

export default AdminPanel; 