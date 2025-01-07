import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  return (
    <footer className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-4 text-center text-gray-600">
        &copy; {new Date().getFullYear()} My Website. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
