import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const WorkTypeManager = () => {
  const { t, i18n } = useTranslation();
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [newWorkType, setNewWorkType] = useState('');

  const industries = Object.keys(t('freelancerSignUp.industries', { returnObjects: true }));
  const workTypes = selectedIndustry 
    ? Object.keys(t(`freelancerSignUp.workTypes.${selectedIndustry}`, { returnObjects: true }) || {})
    : [];
  const currentLanguage = i18n.language;

  const handleAddWorkType = async () => {
    if (!selectedIndustry || !newWorkType) return;

    try {
      // Generate a key from the work type name
      const key = newWorkType.toLowerCase().replace(/\s+/g, '_');
      
      const response = await fetch('/api/translations/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'workType',
          industry: selectedIndustry,
          key,
          language: currentLanguage,
          name: newWorkType
        })
      });

      if (response.ok) {
        await i18n.reloadResources();
        setNewWorkType('');
      }
    } catch (error) {
      console.error('Failed to add work type:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Work Types</h2>
      
      {/* Industry Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Industry
        </label>
        <select
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
          className="border rounded-md px-3 py-2 w-full max-w-xs"
        >
          <option value="">Choose an industry...</option>
          {industries.map(industry => (
            <option key={industry} value={industry}>
              {t(`freelancerSignUp.industries.${industry}`)}
            </option>
          ))}
        </select>
      </div>

      {/* Add New Work Type Form */}
      {selectedIndustry && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">
            Add New Work Type for {t(`freelancerSignUp.industries.${selectedIndustry}`)}
          </h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Work Type Name"
              value={newWorkType}
              onChange={(e) => setNewWorkType(e.target.value)}
              className="border rounded-md px-3 py-2 flex-1"
            />
            <button
              onClick={handleAddWorkType}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Work Type
            </button>
          </div>
        </div>
      )}

      {/* Existing Work Types List */}
      {selectedIndustry && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4">
            Existing Work Types for {t(`freelancerSignUp.industries.${selectedIndustry}`)}
          </h3>
          <div className="grid gap-2">
            {workTypes.map(workType => (
              <div key={workType} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                <span>{t(`freelancerSignUp.workTypes.${selectedIndustry}.${workType}`)}</span>
                {/* Optional: Add edit/delete buttons here */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkTypeManager; 