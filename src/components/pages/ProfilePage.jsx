import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import Header from '../Header';
import WorkTypesList from '../profile/WorkTypesList';
import useStore from '../../store/useStore';

const ProfilePage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const profiles = useStore(state => state.profiles);
  
  // Debug logging
  console.log('Debug:', {
    profileId: id,
    profiles: profiles,
  });

  // Simplified profile lookup - don't try to convert ID types
  const profile = profiles.find(p => p.id === (typeof profiles[0]?.id === 'number' ? Number(id) : id));

  // Wait for translations to be loaded
  if (!i18n.isInitialized) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state or error if profile not found
  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            {t('profilePage.backToOverview')}
          </button>
          <div className="text-center mt-8">
            <p className="text-gray-600">{t('profilePage.notFound')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          {t('profilePage.backToOverview')}
        </button>
      </div>

      {/* Top Section Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Profile Picture */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="aspect-square rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-4xl text-gray-500">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>

          {/* Work Area Map */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">{t('profilePage.workArea')}</h3>
            {/* TODO: Add map component */}
          </div>

          {/* Availability Calendar */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">{t('profilePage.availability')}</h3>
            {/* TODO: Add calendar component */}
          </div>

          {/* Portfolio Slider */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">{t('profilePage.portfolio')}</h3>
            {/* TODO: Add image slider component */}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Work Types Section */}
          <div className="col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-medium mb-6">{t('profilePage.workTypes')}</h2>
            <WorkTypesList key={profile.id} workPreferences={profile.workPreferences} />
          </div>

          {/* About Me Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-medium mb-6">{t('profilePage.aboutMe')}</h2>
            <p className="text-gray-600">{profile.aboutMe}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 