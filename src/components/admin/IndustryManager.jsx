import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const IndustryManager = () => {
  const { t, i18n } = useTranslation();
  const [newIndustry, setNewIndustry] = useState('');

  // Get current industries from translations
  const industries = Object.keys(t('freelancerSignUp.industries', { returnObjects: true }));
  const currentLanguage = i18n.language;

  const handleAddIndustry = async () => {
    if (!newIndustry) return;

    try {
      // Generate a key from the industry name (lowercase, replace spaces with underscores)
      const key = newIndustry.toLowerCase().replace(/\s+/g, '_');
      
      console.log('Sending request with:', {
        type: 'industry',
        key,
        language: currentLanguage,
        name: newIndustry
      });

      const response = await fetch('/api/translations/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'industry',
          key,
          language: currentLanguage,
          name: newIndustry
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        await i18n.reloadResources();
        setNewIndustry('');
      } else {
        console.error('Failed to add industry:', data.error);
      }
    } catch (error) {
      console.error('Error adding industry:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Industries</h2>
      
      {/* Add New Industry Form */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Add New Industry</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Industry Name"
            value={newIndustry}
            onChange={(e) => setNewIndustry(e.target.value)}
            className="border rounded-md px-3 py-2 flex-1"
          />
          <button
            onClick={handleAddIndustry}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Industry
          </button>
        </div>
      </div>

      {/* Existing Industries List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-4">Existing Industries</h3>
        <div className="grid gap-2">
          {industries.map(industry => (
            <div key={industry} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
              <span>{t(`freelancerSignUp.industries.${industry}`)}</span>
              {/* Optional: Add edit/delete buttons here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryManager; 