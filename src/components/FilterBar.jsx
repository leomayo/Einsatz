// src/components/FilterBar.jsx

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import AvailabilityFilter from './filters/AvailabilityFilter';

// Custom hook to handle clicks outside
function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [ref, callback]);
}

export default function FilterBar({ profiles, onFilterChange }) {
  const { t } = useTranslation();
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isWorkTypeOpen, setIsWorkTypeOpen] = useState(false);

  const industryRef = useRef(null);
  const workTypeRef = useRef(null);

  useOutsideClick(industryRef, () => setIsIndustryOpen(false));
  useOutsideClick(workTypeRef, () => setIsWorkTypeOpen(false));

  // Get unique industries and workTypes from profiles
  const { industries, workTypes } = useMemo(() => {
    const uniqueIndustries = new Set();
    const workTypesByIndustry = {};

    profiles?.forEach(profile => {
      profile.workPreferences.forEach(pref => {
        uniqueIndustries.add(pref.industry);
        if (!workTypesByIndustry[pref.industry]) {
          workTypesByIndustry[pref.industry] = new Set();
        }
        workTypesByIndustry[pref.industry].add(pref.workType);
      });
    });

    return {
      industries: Array.from(uniqueIndustries),
      workTypes: Object.fromEntries(
        Object.entries(workTypesByIndustry).map(([industry, types]) => [
          industry,
          Array.from(types)
        ])
      )
    };
  }, [profiles]);

  const handleAvailabilityChange = (availability) => {
    onFilterChange('availability', availability);
  };

  return (
    <div className="flex gap-4 items-center">
      {/* Industry Filter */}
      <div className="relative" ref={industryRef}>
        <button
          onClick={() => setIsIndustryOpen(!isIndustryOpen)}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-white border border-gray-300 hover:bg-gray-50"
        >
          <span>
            {selectedIndustries.length === 0 
              ? t('filterBar.industry')
              : `${t('filterBar.industry')} (${selectedIndustries.length})`}
          </span>
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        </button>

        {isIndustryOpen && (
          <div className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg">
            <div className="py-1">
              {industries.map(industry => (
                <label 
                  key={industry}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={selectedIndustries.includes(industry)}
                    onChange={() => {
                      const newSelection = selectedIndustries.includes(industry)
                        ? selectedIndustries.filter(i => i !== industry)
                        : [...selectedIndustries, industry];
                      setSelectedIndustries(newSelection);
                      onFilterChange('industry', industry, !selectedIndustries.includes(industry));
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                  />
                  {t(`freelancerSignUp.industries.${industry}`)}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Work Type Filter - only show if industries are selected */}
      {selectedIndustries.length > 0 && (
        <div className="relative" ref={workTypeRef}>
          <button
            onClick={() => setIsWorkTypeOpen(!isWorkTypeOpen)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-white border border-gray-300 hover:bg-gray-50"
          >
            <span>
              {selectedWorkTypes.length === 0 
                ? t('filterBar.workType')
                : `${t('filterBar.workType')} (${selectedWorkTypes.length})`}
            </span>
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </button>

          {isWorkTypeOpen && (
            <div className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg">
              <div className="py-1">
                {selectedIndustries.map(industry => (
                  <div key={industry}>
                    <div className="px-4 py-1 text-xs font-medium text-gray-500 bg-gray-50">
                      {t(`freelancerSignUp.industries.${industry}`)}
                    </div>
                    {workTypes[industry]?.map(type => (
                      <label
                        key={type}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          checked={selectedWorkTypes.includes(type)}
                          onChange={() => {
                            const newSelection = selectedWorkTypes.includes(type)
                              ? selectedWorkTypes.filter(t => t !== type)
                              : [...selectedWorkTypes, type];
                            setSelectedWorkTypes(newSelection);
                            onFilterChange('workType', type, !selectedWorkTypes.includes(type));
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                        />
                        {t(`freelancerSignUp.workTypes.${industry}.${type}`)}
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <AvailabilityFilter onChange={handleAvailabilityChange} />
    </div>
  );
}

export function Hero() {
  const { t } = useTranslation();

  const steps = [
    {
      name: 'hero.steps.ready',
      description: 'hero.steps.readyDesc',
    },
    {
      name: 'hero.steps.set',
      description: 'hero.steps.setDesc',
    },
    {
      name: 'hero.steps.go',
      description: 'hero.steps.goDesc',
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('hero.subtitle')}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step) => (
              <div key={step.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <CheckCircleIcon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {t(step.name)}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{t(step.description)}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
