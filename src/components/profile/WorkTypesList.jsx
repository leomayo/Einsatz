import React from 'react';
import { useTranslation } from 'react-i18next';
import { StarIcon } from '@heroicons/react/20/solid';

const WorkTypesList = ({ workPreferences }) => {
  const { t } = useTranslation();

  const renderRatingStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <StarIcon
            key={index}
            className={`h-5 w-5 ${
              index < Math.floor(rating)
                ? 'text-yellow-400'
                : 'text-gray-200'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {workPreferences.map((pref, index) => (
        <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
          {/* Work Type Header with Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {t(`freelancerSignUp.workTypes.${pref.industry}.${pref.workType}`)}
              </h3>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Rating */}
              <div className="flex items-center">
                {renderRatingStars(pref.rating || 0)}
              </div>

              {/* Jobs Count */}
              <div className="text-sm text-gray-600">
                {t('profilePage.ratings.jobs', { count: pref.jobsCompleted || 0 })}
              </div>

              {/* Hourly Rate */}
              <div className="text-sm font-medium text-gray-900">
                {t('profilePage.ratings.hourlyRate', { rate: pref.hourlyRate || 0 })}
              </div>

              {/* Match Button */}
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
                {t('profilePage.ratings.match')}
              </button>
            </div>
          </div>

          {/* Work Type Details */}
          <div className="ml-4 space-y-4">
            {/* Specific */}
            {pref.specialtyNote && (
              <div className="flex items-start gap-4">
                <h4 className="text-sm font-medium text-gray-700 w-24">
                  {t('profilePage.sections.specific')}
                </h4>
                <p className="text-sm text-gray-600 flex-1">
                  {pref.specialtyNote}
                </p>
              </div>
            )}

            {/* Certifications */}
            {pref.certifications && (
              <div className="flex items-start gap-4">
                <h4 className="text-sm font-medium text-gray-700 w-24">
                  {t('profilePage.sections.certifications')}
                </h4>
                <p className="text-sm text-gray-600 flex-1">
                  {pref.certifications}
                </p>
              </div>
            )}

            {/* Experience */}
            {pref.experienceNote && (
              <div className="flex items-start gap-4">
                <h4 className="text-sm font-medium text-gray-700 w-24">
                  {t('profilePage.sections.experience')}
                </h4>
                <p className="text-sm text-gray-600 flex-1">
                  {pref.experienceNote}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkTypesList; 