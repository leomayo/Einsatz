// src/components/ProfileCardList.jsx
import React from 'react';
import ProfileCard from './ProfileCard';
import ProfileCardSkeleton from './ProfileCardSkeleton';

const ProfileCardList = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <ProfileCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {data.map((profile) => (
        <div key={profile.id} className="h-full grid-cell-auto">
          <ProfileCard profile={profile} />
        </div>
      ))}
    </div>
  );
};

export default ProfileCardList;
