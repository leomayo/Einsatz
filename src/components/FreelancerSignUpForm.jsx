import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useStore from '../store/useStore';
import { generateWorkTypeMockData } from '../utils/mockData';
import WorkPreferencesForm from './WorkPreferencesForm';

const FreelancerSignUpForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const addProfile = useStore((state) => state.addProfile);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [workPreferences, setWorkPreferences] = useState([]);

  // Add this console log to check if the component is mounting
  console.log('FreelancerSignUpForm rendered');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Current work preferences:', workPreferences);

    // Add fixed mock data directly
    const workPreferencesWithMockData = workPreferences.map(pref => {
      const withMockData = {
        ...pref,
        rating: 4,
        jobsCompleted: 2,
        hourlyRate: 50
      };
      console.log('Work preference with mock data:', withMockData);
      return withMockData;
    });

    const newProfile = {
      id: Date.now().toString(),
      name,
      email,
      avatar: null,
      aboutMe,
      workPreferences: workPreferencesWithMockData
    };

    console.log('About to add profile:', newProfile);
    console.log('Work preferences in profile:', newProfile.workPreferences);
    
    addProfile(newProfile);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ... other form fields ... */}
      <WorkPreferencesForm 
        workPreferences={workPreferences}
        setWorkPreferences={setWorkPreferences}
      />
      <button 
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {t('freelancerSignUp.submit')}
      </button>
    </form>
  );
};

export default FreelancerSignUpForm; 