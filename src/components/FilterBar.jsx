// src/components/FilterBar.jsx

'use client'

import { useState } from 'react'
import {
  Dialog,
  Disclosure,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'react-i18next';
import { industries, workTypes } from '../data/categories';

const sortOptions = [
  { name: 'filterBar.sort.most_popular', href: '#' },
  { name: 'filterBar.sort.best_rating', href: '#' },
  { name: 'filterBar.sort.newest', href: '#' },
];

// Convert our categories data into the filter format
const filters = [
  {
    id: 'industry',
    name: 'filterBar.filters.industry',
    options: industries.map(industry => ({
      value: industry.id,
      label: `freelancerSignUp.industries.${industry.id}`
    })),
  },
  {
    id: 'workType',
    name: 'filterBar.filters.workType',
    options: workTypes.tech.map(type => ({
      value: type.id,
      label: `freelancerSignUp.workTypes.tech.${type.id}`
    })),
  },
]

export default function FilterBar({ selectedFilters, onFilterChange }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { t } = useTranslation();

  const handleFilterChange = (section, value, checked) => {
    onFilterChange(section.id, value, checked);
  };

  // Update the filter checkboxes in both mobile and desktop views
  const renderFilterCheckboxes = (section, optionIdx, option) => (
    <div key={option.value} className="flex items-center">
      <input
        id={`filter-${section.id}-${optionIdx}`}
        name={`${section.id}[]`}
        value={option.value}
        type="checkbox"
        checked={selectedFilters[section.id].includes(option.value)}
        onChange={(e) => handleFilterChange(section, option.value, e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label
        htmlFor={`filter-${section.id}-${optionIdx}`}
        className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
      >
        {t(option.label)}
      </label>
    </div>
  );

  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <Dialog as="div" className="relative z-40 lg:hidden" open={mobileFiltersOpen} onClose={setMobileFiltersOpen}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">{t('filterBar.title')}</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">{t('filterBar.filters.close')}</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4">
              {filters.map((section) => (
                <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                          <span className="font-medium text-gray-900">{t(section.name)}</span>
                          <span className="ml-6 flex items-center">
                            <ChevronDownIcon
                              className={`h-5 w-5 ${open ? 'rotate-180' : ''} transform`}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => 
                            renderFilterCheckboxes(section, optionIdx, option)
                          )}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      <div className="relative bg-gray-900">
        <div className="mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-center">
            {t('marketplace.title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 sm:text-center">
            {t('marketplace.subtitle')}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
          <h2 className="text-lg font-medium text-gray-900">{t('filterBar.title')}</h2>

          <div className="flex items-center">
            {/* Add mobile filter button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">{t('filterBar.filters.open')}</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.628 1.601C5.028 1.401 7.5 1.3 10 1.3s4.973.101 7.372.301c1.99.166 3.628 1.69 3.628 3.7v1.2c0 .817-.321 1.6-.894 2.173l-4.372 4.372A3.75 3.75 0 0 0 14.5 15.446v.554a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3v-.554c0-.863-.343-1.69-.953-2.3L.175 8.773A2.75 2.75 0 0 1-.72 6.6V5.4c0-2.01 1.639-3.534 3.628-3.7zM4 6a1 1 0 0 0 0 2h12a1 1 0 1 0 0-2H4z" clipRule="evenodd" />
              </svg>
            </button>

            <PopoverGroup className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-6">
              {filters.map((section) => (
                <Popover key={section.id} className="relative inline-block px-4">
                  <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    <span>{t(section.name)}</span>
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </PopoverButton>

                  <PopoverPanel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <form className="space-y-4">
                      {section.options.map((option, optionIdx) => 
                        renderFilterCheckboxes(section, optionIdx, option)
                      )}
                    </form>
                  </PopoverPanel>
                </Popover>
              ))}

              <Popover className="relative inline-block text-left">
                <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  <span>{t('filterBar.sort.label')}</span>
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </PopoverButton>

                <PopoverPanel className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <a
                        key={option.name}
                        href={option.href}
                        className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                      >
                        {t(option.name)}
                      </a>
                    ))}
                  </div>
                </PopoverPanel>
              </Popover>
            </PopoverGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
