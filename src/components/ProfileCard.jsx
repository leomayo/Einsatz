// src/components/ProfileCard.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import ProfileAvatar from './ProfileAvatar';

const ProfileCard = ({ profile }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <ProfileAvatar 
            name={profile.name} 
            image={profile.avatar} 
          />
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>
        </div>

        {/* Work Preferences Section */}
        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">
            {t('profileCard.workPreferences')}
          </h4>
          <div className="space-y-4">
            {profile.workPreferences.map((pref, index) => (
              <div key={index} className="border-l-4 border-indigo-500 pl-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {t(`freelancerSignUp.industries.${pref.industry}`)}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    {t(`freelancerSignUp.workTypes.${pref.industry}.${pref.workType}`)}
                  </span>
                </div>
                {pref.specialtyNote && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">{t('freelancerSignUp.specialtyLabel')}: </span>
                    {pref.specialtyNote}
                  </p>
                )}
                {pref.experienceNote && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{t('freelancerSignUp.experienceLabel')}: </span>
                    {pref.experienceNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
