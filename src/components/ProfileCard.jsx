// src/components/ProfileCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';

const ProfileCard = ({
  name,
  handle,
  email,
  imageUrl,
  phone = '', // Default value
  location = '', // Default value
  skills = 'N/A', // Default value
  bio = 'N/A', // Default value
  portfolio = 'N/A', // Default value
  certifications = 'N/A', // Default value
  interests = 'N/A', // Default value
  traits = 'N/A', // Default value
  aboutMe = '', // Default value
}) => {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="md:col-span-2">
          <h4 className="font-medium text-gray-700">{skills}</h4>
          <p className="mt-1 text-sm text-gray-900">{traits}</p>
          <h4 className="font-medium text-gray-700">{certifications}</h4>
          <p className="mt-1 text-sm text-gray-900">{interests}</p>
        </div>

        {/* Right Section */}
        <div>
          <div className="shrink-0 flex justify-center">
            <img
              alt={`${name}'s profile`}
              src={imageUrl}
              className="h-32 w-32 rounded-full object-cover sm:h-24 sm:w-24 md:h-32 md:w-32"
              loading="lazy"
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-base font-semibold text-gray-900">{name}</h3>
            <p className="text-sm sm:text-xs text-gray-500 truncate max-w-full" title={handle}>
              <a href="#">{handle}</a>
            </p>

            {/* Rating */}
            <div className="flex items-center justify-center mt-2">
              <svg
                className="h-5 w-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.475a1 1 0 00-.364 1.118l1.287 3.958c.3.922-.755 1.688-1.54 1.118L10 14.347l-3.37 2.475c-.784.57-1.84-.196-1.54-1.118l1.287-3.958a1 1 0 00-.364-1.118L2.643 9.386c-.782-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.959z" />
              </svg>
              <span className="ml-1 text-sm text-gray-700">4.7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="flex space-x-3 mt-4">
        {phone && (
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PhoneIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
            <span>{email ? email : 'Call'}</span>
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <EnvelopeIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
            <span>Email</span>
          </a>
        )}
      </div>

      {/* Bio and Portfolio */}
      <div className="mt-4">
        {aboutMe && (
          <p className="text-sm italic">
            "{aboutMe}"
          </p>
        )}
        {bio && (
          <p className="mt-2 text-sm text-gray-700">{bio}</p>
        )}
        {portfolio && (
          <a
            href={portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-2 block text-sm"
          >
            {portfolio}
          </a>
        )}
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
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
};

export default ProfileCard;
