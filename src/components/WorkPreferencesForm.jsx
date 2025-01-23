import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WorkPreferencesForm = ({ workPreferences, setWorkPreferences }) => {
  const { t, i18n } = useTranslation();
  const [postalCode, setPostalCode] = useState('');
  const [radius, setRadius] = useState(5); // Default 5km
  const [center, setCenter] = useState([52.3676, 4.9041]); // Default Amsterdam

  // Debug logs
  console.log('Current language:', i18n.language);
  console.log('Available industries:', Object.keys(t('freelancerSignUp.industries', { returnObjects: true })));
  console.log('Full translations:', t('freelancerSignUp', { returnObjects: true }));

  // Update work preferences when postal code or radius changes
  const updateWorkPreference = (index, updates) => {
    const updatedPreferences = [...workPreferences];
    updatedPreferences[index] = {
      ...updatedPreferences[index],
      ...updates
    };
    setWorkPreferences(updatedPreferences);
  };

  // When postal code or radius changes, update the first work preference
  useEffect(() => {
    if (workPreferences.length > 0) {
      updateWorkPreference(0, {
        postalCode,
        radius
      });
    }
  }, [postalCode, radius]);

  // Log changes for debugging
  useEffect(() => {
    console.log('Current work preferences:', workPreferences);
  }, [workPreferences]);

  const handleAddWorkPreference = () => {
    setWorkPreferences([
      ...workPreferences, 
      { 
        industry: '', 
        workType: '',
        postalCode: '',
        radius: 5,
        specialtyNote: '',
        experienceNote: ''
      }
    ]);
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
  
  const getCoordinatesFromPostalCode = async (postalCode) => {
    // You'll need to implement this using a geocoding service
    // For example, using the OpenStreetMap Nominatim API
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=NL&format=json`
      );
      const data = await response.json();
      if (data && data[0]) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (error) {
      console.error('Error getting coordinates:', error);
      return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Work Area Section */}
      <div className="bg-white shadow sm:rounded-lg p-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          {t('workPreferences.workArea')}
        </h3>
        
        {/* Postal Code and Radius Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('workPreferences.postalCode')}
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                setPostalCode(value);
                console.log('Postal code updated:', value);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="1234 AB"
              maxLength="7"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('workPreferences.radius')} (km)
            </label>
            <input
              type="number"
              value={radius}
              onChange={(e) => {
                const value = Math.max(1, Math.min(50, Number(e.target.value)));
                setRadius(value);
                console.log('Radius updated:', value);
              }}
              min="1"
              max="50"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Map Section */}
        <div className="h-64 rounded-lg overflow-hidden">
          <MapContainer 
            center={center} 
            zoom={11} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Circle
              center={center}
              radius={radius * 1000} // Convert km to meters
              pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
            />
          </MapContainer>
        </div>
      </div>

      <h3 className="text-lg font-medium">
        {t('freelancerSignUp.workPreferencesForm.title')}
      </h3>
      <p className="text-sm text-gray-500">
        {t('freelancerSignUp.workPreferencesForm.description')}
      </p>

      {workPreferences.map((preference, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          {/* Postal Code and Radius Row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('workPreferences.postalCode')}
              </label>
              <input
                type="text"
                value={preference.postalCode || ''}
                onChange={(e) => handleWorkPreferenceChange(index, 'postalCode', e.target.value.toUpperCase())}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="1234 AB"
                maxLength="7"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('workPreferences.radius')} (km)
              </label>
              <input
                type="number"
                value={preference.radius || 5}
                onChange={(e) => handleWorkPreferenceChange(index, 'radius', Math.max(1, Math.min(50, Number(e.target.value))))}
                min="1"
                max="50"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Map Section */}
          <div className="h-64 rounded-lg overflow-hidden">
            <MapContainer 
              center={[52.3676, 4.9041]} 
              zoom={11} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Circle
                center={[52.3676, 4.9041]}
                radius={(preference.radius || 5) * 1000}
                pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
              />
            </MapContainer>
          </div>

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