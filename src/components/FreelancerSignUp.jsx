// src/components/FreelancerSignUp.jsx
import React, { Fragment, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { industries, workTypes } from '../data/categories';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const FreelancerSignUp = ({ onSignUp, isOpen, onClose }) => {
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      workPreferences: [{ 
        industry: '', 
        workType: '', 
        specialtyNote: '',
        experienceNote: '' 
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workPreferences"
  });

  // Watch the industry selections to update work type options
  const watchedIndustries = watch("workPreferences");

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    onSignUp(data);
    reset();
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-lg shadow-md transform transition-all">
                <div className="p-6 max-h-[90vh] overflow-y-auto">
                  <Dialog.Title className="text-2xl font-bold mb-4 text-gray-800">
                    {t('freelancerSignUp.title')}
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Info Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">{t('freelancerSignUp.basicInfo')}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            {t('freelancerSignUp.nameLabel')}
                          </label>
                          <input
                            {...register("name", { required: "Name is required" })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input
                            type="email"
                            {...register("email", { 
                              required: "Email is required",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                              }
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Work Preferences Section */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">{t('freelancerSignUp.workPreferences')}</h3>
                        <button
                          type="button"
                          onClick={() => append({ 
                            industry: '', 
                            workType: '', 
                            specialtyNote: '',
                            experienceNote: '' 
                          })}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                        >
                          <PlusIcon className="h-4 w-4 mr-1" />
                          {t('freelancerSignUp.addAnother')}
                        </button>
                      </div>

                      {fields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-md font-medium">{t('freelancerSignUp.preference')} {index + 1}</h4>
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                {t('freelancerSignUp.industryLabel')}
                              </label>
                              <select
                                {...register(`workPreferences.${index}.industry`, { 
                                  required: "Industry is required" 
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              >
                                <option value="">{t('freelancerSignUp.selectIndustry')}</option>
                                {industries.map(industry => (
                                  <option key={industry.id} value={industry.id}>
                                    {t(`freelancerSignUp.industries.${industry.id}`)}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                {t('freelancerSignUp.workTypeLabel')}
                              </label>
                              <select
                                {...register(`workPreferences.${index}.workType`, { 
                                  required: "Work type is required" 
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              >
                                <option value="">{t('freelancerSignUp.selectWorkType')}</option>
                                {watchedIndustries[index]?.industry && 
                                  workTypes[watchedIndustries[index].industry]?.map(type => (
                                    <option key={type.id} value={type.id}>
                                      {t(`freelancerSignUp.workTypes.${watchedIndustries[index].industry}.${type.id}`)}
                                    </option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                {t('freelancerSignUp.specialtyLabel')}
                              </label>
                              <textarea
                                {...register(`workPreferences.${index}.specialtyNote`)}
                                rows={2}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder={t('freelancerSignUp.specialtyPlaceholder')}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                {t('freelancerSignUp.experienceLabel')}
                              </label>
                              <textarea
                                {...register(`workPreferences.${index}.experienceNote`)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder={t('freelancerSignUp.experiencePlaceholder')}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        {t('freelancerSignUp.cancel')}
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                      >
                        {t('freelancerSignUp.submit')}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

FreelancerSignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FreelancerSignUp;
