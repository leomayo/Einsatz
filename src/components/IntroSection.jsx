import React from 'react';
import logo from '../assets/images/atpost_emoji.png';
import { useTranslation } from 'react-i18next';

function IntroSection() {
  return (
    <section className="bg-white p-6 rounded shadow flex items-center">
      <div className="flex-1">
      <h1 className="text-3xl font-semibold mb-4">At Post</h1>
      <p className="text-gray-700 mb-4">
        Deze zzp'ers staan klaar om je bedrijf te helpen. Wie heb je nodig?
      </p>
      </div>
      <img 
        src={logo} alt="MyLogo"
        alt="Introduction banner"
        className="max-w-64"
      />
      
    </section>
  );
}

export default IntroSection;
