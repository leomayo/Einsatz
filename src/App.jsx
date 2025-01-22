// App.jsx
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ProfileCardList from './components/ProfileCardList';
import FreelancerSignUp from './components/FreelancerSignUp';
import useStore from './store/useStore';
import { useTranslation } from 'react-i18next';

// Define defaultProfiles before using it in useState
const defaultProfiles = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/path/to/avatar1.jpg',
    aboutMe: {
      en: "Full-stack developer with a passion for clean code and user-friendly interfaces. Always eager to learn new technologies and solve complex problems.",
      nl: "Full-stack developer met een passie voor schone code en gebruiksvriendelijke interfaces. Altijd eager om nieuwe technologieën te leren en complexe problemen op te lossen."
    },
    workPreferences: [
      {
        industry: 'tech',
        workType: 'software_dev',
        specialtyNote: 'Full-stack development with React and Node.js'
      },
      {
        industry: 'tech',
        workType: 'cloud_engineering',
        specialtyNote: 'AWS and Azure cloud solutions'
      }
    ]
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: '/path/to/avatar2.jpg',
    aboutMe: {
      en: "Data scientist specializing in machine learning and AI solutions. Experienced in both finance and healthcare sectors.",
      nl: "Data scientist gespecialiseerd in machine learning en AI-oplossingen. Ervaren in zowel de financiële als zorgsector."
    },
    workPreferences: [
      {
        industry: 'finance',
        workType: 'financial_analysis',
        specialtyNote: 'Risk assessment and predictive modeling'
      },
      {
        industry: 'tech',
        workType: 'data_science',
        specialtyNote: 'Machine learning and AI applications'
      }
    ]
  }
];

function App() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const profiles = useStore((state) => state.profiles);
  const addProfile = useStore((state) => state.addProfile);
  const [selectedFilters, setSelectedFilters] = useState({
    industry: [],
    workType: []
  });
  const { t } = useTranslation();

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
    const newProfile = {
      id: Date.now(),
      name: formData.name || 'Anonymous',
      email: formData.email || '',
      avatar: null,
      aboutMe: formData.aboutMe || '',  // Single string instead of translations
      workPreferences: formData.workPreferences.map(pref => ({
        industry: pref.industry,
        workType: pref.workType,
        specialtyNote: pref.specialtyNote || '',
        experienceNote: pref.experienceNote || ''
      }))
    };
    
    console.log('New profile being added:', newProfile);
    addProfile(newProfile);
    setIsSignUpOpen(false);
  };

  // Add console.log here too
  console.log('All profiles:', profiles);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSignUpClick={() => setIsSignUpOpen(true)} />
      <Hero />
      <main className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <FilterBar 
            profiles={profiles} 
            onFilterChange={handleFilterChange} 
          />
        </div>
        
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
