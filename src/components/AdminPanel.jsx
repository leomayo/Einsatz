import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import TranslationManager from './TranslationManager';
import { useTranslation } from 'react-i18next';
import { PencilIcon, TrashIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const { t } = useTranslation();
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedIndustry, setExpandedIndustry] = useState(null);

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
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Admin Panel
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Industry
          </button>
        </div>

        {/* Current Industries and Work Types */}
        <div className="bg-white shadow rounded-lg">
          <div className="divide-y divide-gray-200">
            {Object.entries(industries).map(([industryKey, industryName]) => (
              <div key={industryKey} className="p-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setExpandedIndustry(expandedIndustry === industryKey ? null : industryKey)}
                    className="flex items-center space-x-2 text-lg font-medium text-gray-900 hover:text-gray-600"
                  >
                    <ChevronDownIcon
                      className={`h-5 w-5 transform transition-transform ${
                        expandedIndustry === industryKey ? 'rotate-180' : ''
                      }`}
                    />
                    <span>{industryName}</span>
                    <span className="text-sm text-gray-500">({industryKey})</span>
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingItem({ type: 'industry', key: industryKey });
                        setIsModalOpen(true);
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

                {/* Work Types (Expandable) */}
                <Transition
                  show={expandedIndustry === industryKey}
                  enter="transition-all duration-200 ease-out"
                  enterFrom="opacity-0 max-h-0"
                  enterTo="opacity-100 max-h-96"
                  leave="transition-all duration-150 ease-in"
                  leaveFrom="opacity-100 max-h-96"
                  leaveTo="opacity-0 max-h-0"
                  className="overflow-hidden"
                >
                  <div className="mt-4 ml-6 space-y-2">
                    {workTypes[industryKey] && Object.entries(workTypes[industryKey]).map(([workTypeKey, workTypeName]) => (
                      <div key={workTypeKey} className="flex items-center justify-between py-1">
                        <span className="text-gray-600">{workTypeName} ({workTypeKey})</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingItem({ 
                                type: 'workType', 
                                key: workTypeKey, 
                                industry: industryKey 
                              });
                              setIsModalOpen(true);
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
                </Transition>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <TranslationManager 
                      editingItem={editingItem} 
                      onEditComplete={() => {
                        setEditingItem(null);
                        setIsModalOpen(false);
                      }} 
                    />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default AdminPanel; 