import React from 'react';

const ProfileCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-6">
        {/* Header with avatar and name */}
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 mr-4" />
          <div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-24" />
          </div>
        </div>

        {/* Work Preferences Section */}
        <div className="mt-6">
          <div className="h-4 bg-gray-200 rounded w-40 mb-3" />
          <div className="space-y-4">
            {/* First preference block */}
            <div className="mb-3">
              <div className="flex items-baseline gap-2 mb-1">
                <div className="h-5 bg-gray-200 rounded w-40" />
                <div className="h-4 bg-gray-200 rounded w-64" />
              </div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mt-2" />
            </div>

            {/* Second preference block */}
            <div className="mb-3">
              <div className="flex items-baseline gap-2 mb-1">
                <div className="h-5 bg-gray-200 rounded w-36" />
                <div className="h-4 bg-gray-200 rounded w-56" />
              </div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardSkeleton; 