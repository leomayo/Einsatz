import React from 'react';
import { useTranslation } from 'react-i18next';

const WorkPreferencesForm = ({ workPreferences, setWorkPreferences }) => {
  const { t, i18n } = useTranslation();
  
  // Debug logs
  console.log('Current language:', i18n.language);
  console.log('Available industries:', Object.keys(t('freelancerSignUp.industries', { returnObjects: true })));
  console.log('Full translations:', t('freelancerSignUp', { returnObjects: true }));

  const handleAddWorkPreference = () => {
    setWorkPreferences([...workPreferences, { industry: '', workType: '' }]);
  };

  const handleRemoveWorkPreference = (index) => {
    setWorkPreferences(workPreferences.filter((_, i) => i !== index));
  };

  const handleWorkPreferenceChange = (index, field, value) => {
    const updatedPreferences = [...workPreferences];
    updatedPreferences[index] = {
      ...updatedPreferences[index],
      [field]: value
    };
    setWorkPreferences(updatedPreferences);
  };

  const industries = Object.entries(t('freelancerSignUp.industries', { returnObjects: true }));
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        {t('freelancerSignUp.workPreferencesForm.title')}
      </h3>
      <p className="text-sm text-gray-500">
        {t('freelancerSignUp.workPreferencesForm.description')}
      </p>

      {workPreferences.map((preference, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-between">
            <div className="space-y-2 flex-grow">
              <label className="block text-sm font-medium">
                {t('freelancerSignUp.workPreferencesForm.selectIndustry')}
              </label>
              <select
                value={preference.industry}
                onChange={(e) => handleWorkPreferenceChange(index, 'industry', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">
                  {t('freelancerSignUp.workPreferencesForm.chooseIndustry')}
                </option>
                {industries.map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="button"
              onClick={() => handleRemoveWorkPreference(index)}
              className="ml-4 text-red-600 hover:text-red-800"
            >
              {t('freelancerSignUp.workPreferencesForm.remove')}
            </button>
          </div>

          {preference.industry && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                {t('freelancerSignUp.workPreferencesForm.selectWorkType')}
              </label>
              <select
                value={preference.workType}
                onChange={(e) => handleWorkPreferenceChange(index, 'workType', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">
                  {t('freelancerSignUp.workPreferencesForm.chooseWorkType')}
                </option>
                {Object.entries(
                  t(`freelancerSignUp.workTypes.${preference.industry}`, { returnObjects: true })
                ).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddWorkPreference}
        className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {workPreferences.length === 0
          ? t('freelancerSignUp.workPreferencesForm.addNew')
          : t('freelancerSignUp.workPreferencesForm.addAnother')}
      </button>
    </div>
  );
};

export default WorkPreferencesForm; 