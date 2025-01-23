import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateWorkTypeMockData } from '../utils/mockData';

const useStore = create(
  persist(
    (set) => ({
      profiles: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: null,
          aboutMe: 'Full-stack developer with a passion for clean code and modern technologies. Always eager to learn new technologies and solve complex problems.',
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
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          avatar: null,
          aboutMe: 'Data scientist specializing in machine learning and AI. Experienced in both finance and healthcare sectors.',
          workPreferences: [
            {
              industry: 'tech',
              workType: 'data_science',
              specialtyNote: 'Machine Learning',
              ...generateWorkTypeMockData()
            }
          ]
        }
      ],
      addProfile: (profile) => {
        console.log('Adding profile to store:', profile);
        console.log('Profile work preferences:', profile.workPreferences);
        
        set((state) => ({
          profiles: [...state.profiles, { 
            ...profile, 
            id: profile.id.toString(),
            workPreferences: profile.workPreferences.map(pref => ({
              ...pref,
              rating: pref.rating || 4,
              jobsCompleted: pref.jobsCompleted || 2,
              hourlyRate: pref.hourlyRate || 50
            }))
          }]
        }));
      },
      clearNonDefaultProfiles: () => set((state) => ({
        profiles: state.profiles.filter(profile => profile.id === '1' || profile.id === '2')
      })),
    }),
    {
      name: 'freelancer-storage',
    }
  )
);

export default useStore; 