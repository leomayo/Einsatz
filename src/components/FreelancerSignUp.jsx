// src/components/FreelancerSignUp.jsx
import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@heroicons/react/16/solid'

const nlTranslations = {
  freelancerSignUp: {
    title: "Aanmelden als Freelancer",
    name: "Naam",
    email: "E-mail",
    submit: "Aanmelden",
    cancel: "Annuleren",
    workPreferencesForm: {
      title: "Werkvoorkeuren",
      description: "Voeg je werkvoorkeuren toe om de beste matches te vinden",
      addNew: "Nieuwe Werkvoorkeur",
      addAnother: "Nog een Werkvoorkeur Toevoegen",
      remove: "Verwijderen",
      selectIndustry: "Selecteer Branche",
      selectWorkType: "Selecteer Type Werk",
      chooseIndustry: "Kies een branche...",
      chooseWorkType: "Kies een type werk...",
      specialtyNote: "Specialisatie",
      experienceNote: "Ervaring"
    }
  }
};

export default function FreelancerSignUp({ isOpen, onClose, onSignUp }) {
  const { t, i18n } = useTranslation('translation', { useSuspense: false });
  const initialFormData = {
    name: '',
    email: '',
    aboutMe: '',
    workPreferences: []
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(true);
  
  useEffect(() => {
    // Force add the translations and switch to Dutch
    i18n.addResourceBundle('nl', 'translation', nlTranslations, true, true);
    i18n.changeLanguage('nl');
  }, []);

  console.log('Current translations:', i18n.store.data);
  console.log('Current language:', i18n.language);
  console.log('Title should be:', i18n.store.data?.nl?.translation?.freelancerSignUp?.title);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await onSignUp({
        name: formData.name,
        email: formData.email,
        aboutMe: formData.aboutMe,
        workPreferences: formData.workPreferences
      });
      
      setFormData(initialFormData);
      setSelectedIndustry('');
      setIsAddingNew(true);
      onClose();
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  // Reset form when dialog is opened
  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData);
      setSelectedIndustry('');
      setIsAddingNew(true);
    }
  }, [isOpen]);

  const handleWorkPreferenceChange = (industry, workType, specialtyNote = '', experienceNote = '') => {
    setFormData(prev => {
      const existingIndex = prev.workPreferences.findIndex(
        wp => wp.industry === industry && wp.workType === workType
      );

      if (existingIndex >= 0) {
        return {
          ...prev,
          workPreferences: prev.workPreferences.filter((_, index) => index !== existingIndex)
        };
      }

      return {
        ...prev,
        workPreferences: [
          ...prev.workPreferences,
          { industry, workType, specialtyNote, experienceNote }
        ]
      };
    });
    setSelectedIndustry('');
    setIsAddingNew(false);
  };

  const startAddingNew = () => {
    setIsAddingNew(true);
    setSelectedIndustry('');
  };

  // Get work types for selected industry
  const getWorkTypesForIndustry = (industry) => {
    switch(industry) {
      case 'tech':
        return ['software_dev', 'data_science', 'cloud_engineering'];
      case 'finance':
        return ['financial_analysis', 'investment_banking', 'risk_management'];
      case 'healthcare':
        return ['medical_research', 'healthcare_it', 'clinical_practice'];
      case 'education':
        return ['teaching', 'curriculum_development', 'educational_technology', 'student_counseling'];
      case 'retail':
        return ['sales', 'inventory_management', 'visual_merchandising', 'ecommerce'];
      default:
        return [];
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <Dialog.Title as="h2" className="text-base/7 font-semibold text-gray-900">
                        {t('freelancerSignUp.title')}
                      </Dialog.Title>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                            {t('freelancerSignUp.name')}
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            {t('freelancerSignUp.email')}
                          </label>
                          <div className="mt-2">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={formData.email}
                              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base/7 font-semibold text-gray-900">
                        {t('freelancerSignUp.workPreferencesForm.title')}
                      </h2>
                      <p className="mt-1 text-sm/6 text-gray-600">
                        {t('freelancerSignUp.workPreferencesForm.description')}
                      </p>

                      <div className="mt-10 space-y-8">
                        {formData.workPreferences.map((pref, index) => (
                          <div key={index} className="rounded-md bg-gray-50/50 p-4 outline outline-1 outline-gray-900/10">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                              <div>
                                <label className="block text-sm/6 font-medium text-gray-900">
                                  {t('freelancerSignUp.workPreferencesForm.selectIndustry')}
                                </label>
                                <p className="mt-1 text-sm/6 text-gray-700">
                                  {t(`freelancerSignUp.industries.${pref.industry}`)}
                                </p>
                              </div>
                              <div>
                                <label className="block text-sm/6 font-medium text-gray-900">
                                  {t('freelancerSignUp.workPreferencesForm.selectWorkType')}
                                </label>
                                <p className="mt-1 text-sm/6 text-gray-700">
                                  {t(`freelancerSignUp.workTypes.${pref.industry}.${pref.workType}`)}
                                </p>
                              </div>
                              <div className="sm:col-span-2">
                                <label className="block text-sm/6 font-medium text-gray-900">
                                  {t('freelancerSignUp.workPreferencesForm.specialtyNote')}
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    value={pref.specialtyNote}
                                    onChange={(e) => {
                                      const newPrefs = [...formData.workPreferences];
                                      newPrefs[index].specialtyNote = e.target.value;
                                      setFormData(prev => ({ ...prev, workPreferences: newPrefs }));
                                    }}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                  />
                                </div>
                              </div>
                              <div className="sm:col-span-2">
                                <label className="block text-sm/6 font-medium text-gray-900">
                                  {t('freelancerSignUp.workPreferencesForm.experienceNote')}
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    value={pref.experienceNote}
                                    onChange={(e) => {
                                      const newPrefs = [...formData.workPreferences];
                                      newPrefs[index].experienceNote = e.target.value;
                                      setFormData(prev => ({ ...prev, workPreferences: newPrefs }));
                                    }}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({
                                    ...prev,
                                    workPreferences: prev.workPreferences.filter((_, i) => i !== index)
                                  }));
                                }}
                                className="text-sm/6 font-semibold text-red-600 hover:text-red-500"
                              >
                                {t('freelancerSignUp.workPreferencesForm.remove')}
                              </button>
                            </div>
                          </div>
                        ))}

                        {isAddingNew ? (
                          <div className="rounded-md bg-gray-50/50 p-4 outline outline-1 outline-gray-900/10">
                            <h3 className="text-sm/6 font-semibold text-gray-900">
                              {t('freelancerSignUp.workPreferencesForm.addNew')}
                            </h3>
                            
                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                              <div className="sm:col-span-2">
                                <label className="block text-sm/6 font-medium text-gray-900">
                                  {t('freelancerSignUp.workPreferencesForm.selectIndustry')}
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                  <select
                                    value={selectedIndustry}
                                    onChange={(e) => setSelectedIndustry(e.target.value)}
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                  >
                                    <option value="">{t('freelancerSignUp.workPreferencesForm.chooseIndustry')}</option>
                                    {['tech', 'finance', 'healthcare', 'education', 'retail'].map(industry => (
                                      <option key={industry} value={industry}>
                                        {t(`freelancerSignUp.industries.${industry}`)}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDownIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                  />
                                </div>
                              </div>

                              {selectedIndustry && (
                                <div className="sm:col-span-2">
                                  <label className="block text-sm/6 font-medium text-gray-900">
                                    {t('freelancerSignUp.workPreferencesForm.selectWorkType')}
                                  </label>
                                  <div className="mt-2 grid grid-cols-1">
                                    <select
                                      onChange={(e) => {
                                        if (e.target.value) {
                                          handleWorkPreferenceChange(selectedIndustry, e.target.value);
                                        }
                                        e.target.value = '';
                                      }}
                                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                      defaultValue=""
                                    >
                                      <option value="">{t('freelancerSignUp.workPreferencesForm.chooseWorkType')}</option>
                                      {getWorkTypesForIndustry(selectedIndustry).map(workType => (
                                        <option key={workType} value={workType}>
                                          {t(`freelancerSignUp.workTypes.${selectedIndustry}.${workType}`)}
                                        </option>
                                      ))}
                                    </select>
                                    <ChevronDownIcon
                                      aria-hidden="true"
                                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={startAddingNew}
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            {t('freelancerSignUp.workPreferencesForm.addAnother')}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        {t('freelancerSignUp.aboutMeLabel')}
                      </label>
                      
                      <div className="mt-2">
                        <textarea
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={formData.aboutMe}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            aboutMe: e.target.value
                          }))}
                          placeholder={t('freelancerSignUp.aboutMePlaceholder')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-sm/6 font-semibold text-gray-900"
                    >
                      {t('freelancerSignUp.cancel')}
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {t('freelancerSignUp.submit')}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
