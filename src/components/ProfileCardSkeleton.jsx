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
            <div className="border-l-4 border-gray-200 pl-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="h-6 bg-gray-200 rounded-full w-24" />
                <div className="h-6 bg-gray-200 rounded-full w-32" />
              </div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>

            {/* Second preference block */}
            <div className="border-l-4 border-gray-200 pl-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="h-6 bg-gray-200 rounded-full w-28" />
                <div className="h-6 bg-gray-200 rounded-full w-36" />
              </div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardSkeleton; 