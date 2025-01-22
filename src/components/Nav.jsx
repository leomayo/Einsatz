import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Nav() {
  const { t } = useTranslation();
  
  console.log("Nav component rendering"); // Debug log
  
  return (
    <nav className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              {t('company_name')}
            </Link>
            <div className="flex ml-6 space-x-8">
              <Link to="/" className="text-gray-500 hover:text-gray-700">
                {t('nav.marketplace')}
              </Link>
              <Link to="/admin" className="text-indigo-600 hover:text-indigo-700">
                Admin
              </Link>
              <Link to="/about" className="text-gray-500 hover:text-gray-700">
                {t('nav.about')}
              </Link>
              <Link to="/contact" className="text-gray-500 hover:text-gray-700">
                {t('nav.contact')}
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/signup"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              {t('nav.signup')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 