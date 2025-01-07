// src/components/Header.jsx

'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next';

const navigation = [
  { name: 'product', href: '#' },
  { name: 'features', href: '#' },
  { name: 'marketplace', href: '#' },
  { name: 'company', href: '#' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { i18n, t } = useTranslation(); // Destructure i18n en t

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white shadow">
      {/* Top Bar met Taalwisselaar */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{t('company_name')}</h1>
        <div>
          <button
            onClick={() => changeLanguage('en')}
            className={`mx-2 px-3 py-1 rounded ${
              i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage('nl')}
            className={`mx-2 px-3 py-1 rounded ${
              i18n.language === 'nl' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            NL
          </button>
        </div>
      </div>

      {/* Navigatie Menu */}
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
      >
        {/* Bedrijfslogo */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="Your Company Logo"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
        </div>

        {/* Navigatie Links */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm leading-6 font-semibold text-gray-900"
            >
              {t(item.name)}
            </a>
          ))}
        </div>

        {/* Log in en Sign up */}
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <a
            href="#"
            className="hidden text-sm leading-6 font-semibold text-gray-900 lg:block"
          >
            {t('log_in')}
          </a>
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t('sign_up')}
          </a>
        </div>

        {/* Mobiele Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobiele Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10 bg-black bg-opacity-25" aria-hidden="true" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 shadow-xl">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="Your Company Logo"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6">
            <nav className="space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-base leading-7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {t(item.name)}
                </a>
              ))}
              <a
                href="#"
                className="block rounded-lg px-3 py-2.5 text-base leading-7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                {t('log_in')}
              </a>
            </nav>
            <div className="mt-6">
              <a
                href="#"
                className="block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-base leading-7 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t('sign_up')}
              </a>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
