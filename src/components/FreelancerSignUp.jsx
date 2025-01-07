// src/components/FreelancerSignUp.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const FreelancerSignUp = ({ onSignUp }) => { // Destructure onSignUp from props
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // To reset form after submission
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    if (onSignUp) { // Check if onSignUp is provided
      onSignUp(data); // Pass the submitted data to the parent
      reset(); // Optional: Reset the form fields after submission
    } else {
      console.error('onSignUp prop is not provided.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {t('freelancerSignUp.title') || 'Freelancer Sign-Up'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t('freelancerSignUp.nameLabel') || 'Name'}
          </label>
          <input
            id="name"
            {...register('name', { required: true })}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('freelancerSignUp.nameLabel') || 'Enter your name'}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {t('freelancerSignUp.errors.required') || 'This field is required'}
            </p>
          )}
        </div>

        {/* Handle */}
        <div>
          <label
            htmlFor="handle"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Handle
          </label>
          <input
            id="handle"
            {...register('handle')}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="@your_handle"
          />
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Profile Image URL
          </label>
          <input
            id="imageUrl"
            type="url"
            {...register('imageUrl')}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t('freelancerSignUp.emailLabel') || 'Email'}
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^\S+@\S+$/i,
                message: t('freelancerSignUp.errors.invalidEmail') || 'Invalid email address',
              },
            })}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('freelancerSignUp.emailLabel') || 'Enter your email'}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message || t('freelancerSignUp.errors.required') || 'This field is required'}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t('freelancerSignUp.locationLabel') || 'Location'}
          </label>
          <input
            id="location"
            {...register('location')}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('freelancerSignUp.locationLabel') || 'Enter your location'}
          />
        </div>

        {/* Skills */}
        <div>
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t('freelancerSignUp.skillsLabel') || 'Skills'}
          </label>
          <input
            id="skills"
            {...register('skills')}
            placeholder="e.g. React, Node.js, Design..."
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Bio */}
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t('freelancerSignUp.bioLabel') || 'Bio'}
          </label>
          <textarea
            id="bio"
            {...register('bio')}
            placeholder="Tell us a bit about yourself."
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Portfolio Link */}
        <div>
          <label
            htmlFor="portfolio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t('freelancerSignUp.portfolioLabel') || 'Portfolio Link'}
          </label>
          <input
            id="portfolio"
            type="url"
            {...register('portfolio')}
            placeholder="https://..."
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
        >
          {t('freelancerSignUp.submitBtn') || 'Submit'}
        </button>
      </form>
    </div>
  );
};

// Add PropTypes for prop validation
FreelancerSignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired, // onSignUp is required and must be a function
};

export default FreelancerSignUp;
