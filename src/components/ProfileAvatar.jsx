import React from 'react';

const ProfileAvatar = ({ name, image }) => {
  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (image) {
    return (
      <img
        className="h-12 w-12 rounded-full object-cover"
        src={image}
        alt={name}
      />
    );
  }

  // Placeholder with initials
  return (
    <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center">
      <span className="text-white font-medium text-sm">
        {getInitials(name)}
      </span>
    </div>
  );
};

export default ProfileAvatar; 