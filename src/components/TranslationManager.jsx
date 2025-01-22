import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TranslationManager = ({ editingItem, onEditComplete }) => {
  const { t } = useTranslation();
  const [newIndustry, setNewIndustry] = useState({
    key: '',
    nl: '',
    en: ''
  });
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [newWorkType, setNewWorkType] = useState({
    key: '',
    nl: '',
    en: ''
  });

  // Reset form when editing item changes
  useEffect(() => {
    if (editingItem) {
      if (editingItem.type === 'industry') {
        setNewIndustry({
          key: editingItem.key,
          nl: t(`freelancerSignUp.industries.${editingItem.key}`, { lng: 'nl' }),
          en: t(`freelancerSignUp.industries.${editingItem.key}`, { lng: 'en' })
        });
      } else if (editingItem.type === 'workType') {
        setSelectedIndustry(editingItem.industry);
        setNewWorkType({
          key: editingItem.key,
          nl: t(`freelancerSignUp.workTypes.${editingItem.industry}.${editingItem.key}`, { lng: 'nl' }),
          en: t(`freelancerSignUp.workTypes.${editingItem.industry}.${editingItem.key}`, { lng: 'en' })
        });
      }
    }
  }, [editingItem, t]);

  const handleAddIndustry = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/translations/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'industry',
          key: newIndustry.key.toLowerCase().replace(/\s+/g, '_'),
          name: newIndustry.nl,
          translations: {
            nl: newIndustry.nl,
            en: newIndustry.en
          },
          isEdit: !!editingItem
        })
      });
      
      if (response.ok) {
        setNewIndustry({ key: '', nl: '', en: '' });
        if (editingItem) onEditComplete();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding/updating industry:', error);
      alert('Failed to save industry. Please try again.');
    }
  };

  const handleAddWorkType = async (e) => {
    e.preventDefault();
    if (!selectedIndustry) return;

    try {
      const response = await fetch('/api/translations/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'workType',
          industry: selectedIndustry,
          key: newWorkType.key.toLowerCase().replace(/\s+/g, '_'),
          name: newWorkType.nl,
          translations: {
            nl: newWorkType.nl,
            en: newWorkType.en
          },
          isEdit: !!editingItem
        })
      });
      
      if (response.ok) {
        setNewWorkType({ key: '', nl: '', en: '' });
        if (editingItem) onEditComplete();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding/updating work type:', error);
      alert('Failed to save work type. Please try again.');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        {editingItem ? 'Edit Translation' : 'Add New Translation'}
      </h2>
      
      {/* Add/Edit Industry Form */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editingItem?.type === 'industry' ? 'Edit Industry' : 'Add New Industry'}
        </h3>
        <form onSubmit={handleAddIndustry} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Key (system name)</label>
            <input
              type="text"
              value={newIndustry.key}
              onChange={(e) => setNewIndustry(prev => ({ ...prev, key: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., construction"
              required
              disabled={editingItem?.type === 'industry'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dutch Name</label>
            <input
              type="text"
              value={newIndustry.nl}
              onChange={(e) => setNewIndustry(prev => ({ ...prev, nl: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Bouw"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">English Name</label>
            <input
              type="text"
              value={newIndustry.en}
              onChange={(e) => setNewIndustry(prev => ({ ...prev, en: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Construction"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editingItem?.type === 'industry' ? 'Update Industry' : 'Add Industry'}
            </button>
            {editingItem && (
              <button
                type="button"
                onClick={onEditComplete}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Add/Edit Work Type Form */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          {editingItem?.type === 'workType' ? 'Edit Work Type' : 'Add New Work Type'}
        </h3>
        <form onSubmit={handleAddWorkType} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Industry</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              disabled={editingItem?.type === 'workType'}
            >
              <option value="">Select an industry...</option>
              {Object.entries(t('freelancerSignUp.industries', { returnObjects: true })).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Key (system name)</label>
            <input
              type="text"
              value={newWorkType.key}
              onChange={(e) => setNewWorkType(prev => ({ ...prev, key: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., project_management"
              required
              disabled={editingItem?.type === 'workType'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dutch Name</label>
            <input
              type="text"
              value={newWorkType.nl}
              onChange={(e) => setNewWorkType(prev => ({ ...prev, nl: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Projectmanagement"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">English Name</label>
            <input
              type="text"
              value={newWorkType.en}
              onChange={(e) => setNewWorkType(prev => ({ ...prev, en: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Project Management"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editingItem?.type === 'workType' ? 'Update Work Type' : 'Add Work Type'}
            </button>
            {editingItem && (
              <button
                type="button"
                onClick={onEditComplete}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TranslationManager; 