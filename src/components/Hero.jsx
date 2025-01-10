import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl whitespace-nowrap">
            {t('hero.title')}
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>
    </div>
  );
} 