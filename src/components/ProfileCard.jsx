// src/components/ProfileCard.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import ProfileAvatar from './ProfileAvatar';

const ProfileCard = ({ profile }) => {
  const { t, i18n } = useTranslation();
  const firstName = profile.name.split(' ')[0];
  
  const aboutMeText = profile.aboutMe || '';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="p-4 relative h-full flex flex-col">
        {/* About Me section */}
        <div className="h-20 mb-3 pr-20">
          <p className="text-xs text-gray-600 overflow-hidden display-webkit-box webkit-line-clamp-3">
            {aboutMeText} - <span className="font-semibold">{profile.name}</span>
          </p>
        </div>

        {/* Work Preferences Section */}
        <div className="mb-8 pr-20">
          <h4 className="text-sm font-medium text-gray-600 mb-3">
            {t('profileCard.availableFor')}:
          </h4>
          <div>
            {profile.workPreferences.map((pref, index) => {
              const workType = t(`freelancerSignUp.workTypes.${pref.industry}.${pref.workType}`);
              const specialtyText = pref.specialtyNote ? ` - ${pref.specialtyNote}` : '';
              return (
                <div key={index} className="text-sm mb-2 w-[368px] min-w-full">
                  <span className="font-semibold text-gray-900">{workType}</span>
                  {pref.specialtyNote && (
                    <span className="text-gray-600">{specialtyText}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side: Avatar */}
        <div className="absolute top-3 right-4 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-lg font-medium text-indigo-700">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>

        {/* Button at the bottom */}
        <div className="mt-auto">
          <div className="flex justify-end">
            <button
              onClick={() => {/* TODO: Add navigation to profile page */}}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              {t('profileCard.checkProfile', { name: firstName })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
