// src/components/ProfileCardList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import ProfileCard from './ProfileCard';

const ProfileCardList = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((freelancer, index) => (
        <ProfileCard
          key={freelancer.email} // Ideally, use a unique identifier like email or a generated ID
          name={freelancer.name}
          handle={freelancer.handle}
          email={freelancer.email}
          imageUrl={freelancer.imageUrl}
          phone={freelancer.phone}
          location={freelancer.location}
          skills={freelancer.skills}
          bio={freelancer.bio}
          portfolio={freelancer.portfolio}
          certifications={freelancer.certifications}
          interests={freelancer.interests}
          traits={freelancer.traits}
          aboutMe={freelancer.aboutMe}
        />
      ))}
    </div>
  );
};

ProfileCardList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      handle: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      phone: PropTypes.string,
      location: PropTypes.string,
      skills: PropTypes.string,
      bio: PropTypes.string,
      portfolio: PropTypes.string,
      certifications: PropTypes.string,
      interests: PropTypes.string,
      traits: PropTypes.string,
      aboutMe: PropTypes.string,
    })
  ).isRequired,
};

export default ProfileCardList;
