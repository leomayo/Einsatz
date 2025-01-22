import { create } from 'zustand';

const mockProfiles = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
    aboutMe: "Full-stack developer with a passion for clean code and user-friendly interfaces. Always eager to learn new technologies and solve complex problems.",
    workPreferences: [
      {
        industry: "tech",
        workType: "software_dev",
        specialtyNote: "Full-stack development with React and Node.js"
      },
      {
        industry: "tech",
        workType: "cloud_engineering",
        specialtyNote: "AWS and Azure cloud solutions"
      }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: null,
    aboutMe: "Data scientist specializing in machine learning and AI solutions. Experienced in both finance and healthcare sectors.",
    workPreferences: [
      {
        industry: "finance",
        workType: "financial_analysis",
        specialtyNote: "Risk assessment and predictive modeling"
      },
      {
        industry: "tech",
        workType: "data_science",
        specialtyNote: "Machine learning and AI applications"
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