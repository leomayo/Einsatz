import { create } from 'zustand';

const mockProfiles = [
  {
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
    workPreferences: [
      {
        industry: "tech",
        workType: "software_dev",
        specialtyNote: "Full-stack development with React and Node.js",
        experienceNote: "5 years of experience in web development"
      }
    ]
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: null,
    workPreferences: [
      {
        industry: "finance",
        workType: "financial_analysis",
        specialtyNote: "Investment analysis and portfolio management",
        experienceNote: "7 years in financial services"
      }
    ]
  }
];

const useStore = create((set) => ({
  profiles: mockProfiles,
  addProfile: (profile) => set((state) => ({
    profiles: [...state.profiles, profile]
  })),
}));

export default useStore; 