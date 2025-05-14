
'use client';
import '../../i18n';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-xl font-semibold text-blue-600">
            <Link href="/">{t('title')}</Link>
          </div>
          <div className="flex space-x-6 items-center">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-500 transition-colors"
            >
              {t('park_list')}
            </Link>
            <Link
              href="/info"
              className="text-gray-700 hover:text-blue-500 transition-colors"
            >
              {t('info')}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}