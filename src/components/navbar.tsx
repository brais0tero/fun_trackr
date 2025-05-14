'use client';
import '../../i18n';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setMounted(true);
    }
  }, [i18n.isInitialized]);

  if (!mounted) return null;

  return (
    <nav className="bg-brand-light backdrop-blur-md shadow-sm border-b shadow-gray-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-xl font-semibold text-brand-dark">
            <Link href="/">{t('title')}</Link>
          </div>
          <div className="flex space-x-6 items-center">
            <Link
              href="/"
              className="text-brand-dark hover:text-brand hover:scale-110 transition-all ease-in duration-100"
            >
              {t('park_list')}
            </Link>
            <Link
              href="/info"
              className="text-brand-dark hover:text-brand hover:scale-110 transition-all ease-in duration-100"
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