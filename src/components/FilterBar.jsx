// src/components/FilterBar.jsx

import React, { Fragment, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Dialog, 
  Disclosure, 
  Popover, 
  Transition,
  PopoverButton,
  PopoverPanel,
  PopoverGroup,
  Menu
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import AvailabilityFilter from './filters/AvailabilityFilter';

const filters = [
  {
    id: 'industry',
    name: 'filterBar.filters.industries',
    options: [
      {
        value: 'tech',
        label: 'freelancerSignUp.industries.tech',
        workTypes: [
          { value: 'software_dev', label: 'freelancerSignUp.workTypes.tech.software_dev' },
          { value: 'data_science', label: 'freelancerSignUp.workTypes.tech.data_science' },
          { value: 'cloud_engineering', label: 'freelancerSignUp.workTypes.tech.cloud_engineering' }
        ]
      },
      {
        value: 'finance',
        label: 'freelancerSignUp.industries.finance',
        workTypes: [
          { value: 'financial_analysis', label: 'freelancerSignUp.workTypes.finance.financial_analysis' },
          { value: 'investment_banking', label: 'freelancerSignUp.workTypes.finance.investment_banking' },
          { value: 'risk_management', label: 'freelancerSignUp.workTypes.finance.risk_management' }
        ]
      }
    ]
  }
];

export default function FilterBar({ profiles, onFilterChange }) {
  const { t } = useTranslation();

  // Get unique industries and workTypes from all profiles
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

  const handleIndustryChange = (industry) => {
    onFilterChange('industry', industry);
  };

  const handleWorkTypeChange = (workType) => {
    onFilterChange('workType', workType);
  };

  const handleAvailabilityChange = (availability) => {
    onFilterChange('availability', availability);
  };

  return (
    <div className="flex gap-4 items-center">
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-white border border-gray-300 hover:bg-gray-50">
          <span>Industry</span>
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        </Menu.Button>

        <Menu.Items className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg">
          <div className="py-1">
            {industries?.map((industry) => (
              <Menu.Item key={industry}>
                {({ active }) => (
                  <button
                    onClick={() => handleIndustryChange(industry)}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    {t(`freelancerSignUp.industries.${industry}`)}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Menu>

      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-white border border-gray-300 hover:bg-gray-50">
          <span>Work Type</span>
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        </Menu.Button>

        <Menu.Items className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg">
          <div className="py-1">
            {Object.entries(workTypes || {}).map(([industry, types]) => (
              <div key={industry}>
                <div className="px-4 py-1 text-xs font-medium text-gray-500 bg-gray-50">
                  {t(`freelancerSignUp.industries.${industry}`)}
                </div>
                {types.map((type) => (
                  <Menu.Item key={`${industry}-${type}`}>
                    {({ active }) => (
                      <button
                        onClick={() => handleWorkTypeChange(type)}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                      >
                        {t(`freelancerSignUp.workTypes.${industry}.${type}`)}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            ))}
          </div>
        </Menu.Items>
      </Menu>

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
