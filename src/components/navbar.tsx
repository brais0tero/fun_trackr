'use client';
import '../../i18n';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-brand-dark hover:text-brand focus:outline-none"
            >
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 items-center">
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

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-4 py-4">
            <Link
              href="/"
              className="text-brand-dark px-2"
              onClick={() => setMenuOpen(false)}
            >
              {t('park_list')}
            </Link>
            <Link
              href="/info"
              className="text-brand-dark px-2"
              onClick={() => setMenuOpen(false)}
            >
              {t('info')}
            </Link>
            <div className="px-2">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}