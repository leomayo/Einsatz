// src/components/FilterBar.jsx

import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Dialog, 
  Disclosure, 
  Popover, 
  Transition,
  PopoverButton,
  PopoverPanel,
  PopoverGroup 
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

export default function FilterBar({ selectedFilters, onFilterChange }) {
  const { t } = useTranslation();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleAvailabilityChange = (availability) => {
    onFilterChange('availability', availability);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
          <h2 className="text-lg font-medium text-gray-900">{t('filterBar.title')}</h2>

          <div className="flex items-center">
            <Popover.Group className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-6">
              {/* Industry filter */}
              <Popover className="relative inline-block px-4">
                <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  <span>{t('filterBar.filters.industries')}</span>
                  <ChevronDownIcon
                    className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <form className="space-y-4">
                      {filters[0].options.map((option, optionIdx) => (
                        <div key={optionIdx} className="flex items-center">
                          <input
                            id={`filter-industry-${optionIdx}`}
                            name="industry[]"
                            value={option.value}
                            type="checkbox"
                            checked={selectedFilters.industry.includes(option.value)}
                            onChange={(e) => onFilterChange('industry', option.value, e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-industry-${optionIdx}`}
                            className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                          >
                            {t(option.label)}
                          </label>
                        </div>
                      ))}
                    </form>
                  </Popover.Panel>
                </Transition>
              </Popover>

              {/* Work Type filter - only show if industries are selected */}
              {selectedFilters.industry.length > 0 && (
                <Popover className="relative inline-block px-4">
                  <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    <span>{t('filterBar.filters.workTypes')}</span>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <form className="space-y-4">
                        {selectedFilters.industry.map((industryValue) => {
                          const industry = filters[0].options.find(opt => opt.value === industryValue);
                          return (
                            <div key={industryValue} className="mb-4">
                              {selectedFilters.industry.length > 1 && (
                                <h4 className="text-sm font-medium text-gray-900 mb-2">
                                  {t(industry.label)}
                                </h4>
                              )}
                              <div className="space-y-2">
                                {industry.workTypes.map((workType, idx) => (
                                  <div key={idx} className="flex items-center">
                                    <input
                                      id={`filter-workType-${industryValue}-${idx}`}
                                      name="workType[]"
                                      value={workType.value}
                                      type="checkbox"
                                      checked={selectedFilters.workType.includes(workType.value)}
                                      onChange={(e) => onFilterChange('workType', workType.value, e.target.checked)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-workType-${industryValue}-${idx}`}
                                      className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                    >
                                      {t(workType.label)}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </form>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              )}
              <AvailabilityFilter onChange={handleAvailabilityChange} />
            </Popover.Group>
          </div>
        </div>
      </div>
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
