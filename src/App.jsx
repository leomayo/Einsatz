// App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ProfileCardList from './components/ProfileCardList';
import Footer from './components/Footer';
import FreelancerSignUp from './components/FreelancerSignUp';
// Removed unused import of ProfileCard

function App() {
  // Initialize state for freelancers
  const [freelancers, setFreelancers] = useState([
    {
      name: "Bram Hollander",
      handle: "@bram_hollander",
      email: "bramhollander@example.com",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image
      phone: "555-123-4567",
      location: "Amsterdam",
      skills: "React, Node.js, Design",
      bio: "Experienced full-stack developer with a passion for building scalable web applications.",
      portfolio: "https://bramhollander.dev",
      certifications: "Certified React Developer",
      interests: "Web Development, UI/UX Design",
      traits: "Detail-oriented, Creative, Team Player",
      aboutMe: "I love creating efficient and beautiful web solutions.",
    },
    {
      name: "Jane Doe",
      handle: "@jane_doe",
      email: "jane.doe@example.com",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image
      phone: "555-987-6543",
      location: "Rotterdam",
      skills: "JavaScript, Python, Django",
      bio: "Backend developer specializing in API design and database management.",
      portfolio: "https://janedoe.dev",
      certifications: "Certified Python Developer",
      interests: "API Development, Data Science",
      traits: "Analytical, Problem-Solver, Reliable",
      aboutMe: "Passionate about building robust backend systems.",
    }
    // ...existing freelancers
  ]);

  // Handle new sign-ups
  const handleSignUp = (formData) => {
    console.log('New freelancer data:', formData);

    // Assign default values and include all required fields
    const newFreelancer = {
      name: formData.name, // Required
      handle: formData.handle || `@${formData.name.toLowerCase().replace(/\s+/g, '_')}`,
      email: formData.email, // Required
      imageUrl: formData.imageUrl || "https://via.placeholder.com/150", // Default image
      phone: formData.phone || "",
      location: formData.location || "",
      skills: formData.skills || "N/A",
      bio: formData.bio || "N/A",
      portfolio: formData.portfolio || "N/A",
      certifications: formData.certifications || "N/A",
      interests: formData.interests || "N/A",
      traits: formData.traits || "N/A",
      aboutMe: formData.aboutMe || "",
    };  

    console.log('Adding new freelancer:', newFreelancer);

    // Optional: Prevent adding freelancers with duplicate emails
    if (freelancers.some(f => f.email === newFreelancer.email)) {
      console.error('A freelancer with this email already exists.');
      alert('A freelancer with this email already exists.');
      return;
    }

    // Add the new freelancer to the state
    setFreelancers((prev) => [...prev, newFreelancer]);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4 space-y-8">
        <FreelancerSignUp onSignUp={handleSignUp} />
        <FilterBar />

        {/* Profile Cards */}
        <ProfileCardList data={freelancers} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
