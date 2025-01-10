// App.jsx
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ProfileCardList from './components/ProfileCardList';
import FreelancerSignUp from './components/FreelancerSignUp';
import useStore from './store/useStore';

function App() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const profiles = useStore((state) => state.profiles);
  const addProfile = useStore((state) => state.addProfile);
  const [selectedFilters, setSelectedFilters] = useState({
    industry: [],
    workType: []
  });

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter profiles based on selected filters
  const filteredProfiles = useMemo(() => {
    if (selectedFilters.industry.length === 0 && selectedFilters.workType.length === 0) {
      return profiles;
    }

    return profiles.filter(profile => {
      return profile.workPreferences.some(pref => {
        const industryMatch = selectedFilters.industry.length === 0 || 
          selectedFilters.industry.includes(pref.industry);
        const workTypeMatch = selectedFilters.workType.length === 0 || 
          selectedFilters.workType.includes(pref.workType);
        return industryMatch && workTypeMatch;
      });
    });
  }, [profiles, selectedFilters]);

  const handleFilterChange = (filterType, value, isChecked) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: isChecked 
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value)
    }));
  };

  // Format the signup data to match the profile structure
  const handleSignUp = (formData) => {
    // Map the workPreferences array properly
    const newProfile = {
      name: formData.name || 'Anonymous',
      email: formData.email || '',
      avatar: null,
      workPreferences: formData.workPreferences.map(pref => ({
        industry: pref.industry,
        workType: pref.workType,
        specialtyNote: pref.specialtyNote || '',
        experienceNote: pref.experienceNote || ''
      }))
    };
    
    console.log('New profile:', newProfile); // For debugging
    addProfile(newProfile);
    setIsSignUpOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSignUpClick={() => setIsSignUpOpen(true)} />
      <FilterBar 
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileCardList 
          data={filteredProfiles} 
          isLoading={isLoading}
        />
      </main>
      <FreelancerSignUp
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSignUp={handleSignUp}
      />
    </div>
  );
}

export default App;
