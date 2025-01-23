// App.jsx
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ProfileCardList from './components/ProfileCardList';
import FreelancerSignUp from './components/FreelancerSignUp';
import useStore from './store/useStore';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './components/pages/ProfilePage';
import AdminDashboard from './components/pages/AdminDashboard';
import AdminPanel from './components/AdminPanel';
import { generateWorkTypeMockData } from './utils/mockData';

// Update initial profiles to use string IDs
const initialProfiles = [
  {
    id: '1', // Changed from 1 to '1'
    name: 'John Doe',
    aboutMe: 'Experienced professional with a passion for technology and innovation.',
    workPreferences: [
      {
        industry: 'tech',
        workType: 'software_dev',
        specialtyNote: 'Full-stack development',
        ...generateWorkTypeMockData()
      },
      {
        industry: 'tech',
        workType: 'cloud_engineering',
        specialtyNote: 'AWS Certified',
        ...generateWorkTypeMockData()
      }
    ]
  },
  {
    id: '2', // Changed from 2 to '2'
    name: 'Jane Smith',
    aboutMe: 'Financial expert with a focus on risk management and analysis.',
    workPreferences: [
      {
        industry: 'finance',
        workType: 'risk_management',
        specialtyNote: 'Basel III expertise',
        ...generateWorkTypeMockData()
      },
      {
        industry: 'finance',
        workType: 'financial_analysis',
        specialtyNote: 'Corporate finance',
        ...generateWorkTypeMockData()
      },
      {
        industry: 'finance',
        workType: 'investment_banking',
        specialtyNote: 'M&A specialist',
        ...generateWorkTypeMockData()
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

  // Add this helper function
  const addTestProfile = () => {
    const industries = ['tech', 'finance', 'healthcare', 'education'];
    const workTypes = {
      tech: ['software_dev', 'data_science', 'cloud_engineering'],
      finance: ['financial_analysis', 'investment_banking', 'risk_management'],
      healthcare: ['medical_research', 'healthcare_it', 'clinical_practice'],
      education: ['teaching', 'curriculum_development', 'educational_technology']
    };

    // Generate 1-3 random work preferences
    const numPreferences = Math.floor(Math.random() * 3) + 1;
    const workPreferences = [];

    for (let i = 0; i < numPreferences; i++) {
      const randomIndustry = industries[Math.floor(Math.random() * industries.length)];
      const industryWorkTypes = workTypes[randomIndustry];
      const randomWorkType = industryWorkTypes[Math.floor(Math.random() * industryWorkTypes.length)];
      
      workPreferences.push({
        industry: randomIndustry,
        workType: randomWorkType,
        specialtyNote: `Specialty note ${i + 1}`,
        ...generateWorkTypeMockData() // Add mock data for each work preference
      });
    }

    const randomProfile = {
      id: Date.now().toString(),
      name: `Test Profile ${profiles.length + 1}`,
      aboutMe: "This is a test profile with automatically generated work preferences.",
      workPreferences: workPreferences
    };

    addProfile(randomProfile);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
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
            <button
              onClick={addTestProfile}
              className="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              Add Test Profile
            </button>
          </div>
        } />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
