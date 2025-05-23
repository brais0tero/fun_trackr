'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

export default function InfoPage() {
  const { t, ready } = useTranslation();

  if (!ready)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <span className="animate-pulse text-lg text-brand-dark">
            ⏳
        </span>
      </main>
    );

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{t('info')}</h1>
      <p className="mb-2">{t('technologies_intro')}</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>{t('technologies_list.next')}</li>
        <li>{t('technologies_list.react')}</li>
        <li>{t('technologies_list.typescript')}</li>
        <li>{t('technologies_list.tailwind')}</li>
        <li>{t('technologies_list.i18next')}</li>
        <li>{t('technologies_list.swr')}</li>
        <li>{t('technologies_list.recharts')}</li>
        <li>{t('technologies_list.queue_times')}</li>
      </ul>
      <p className="mt-6 text-sm">
        <Trans
          i18nKey="powered_by"
          components={{
            1: (
              <a
                href="https://queue-times.com/"
                className="underline text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
          }}
        />
      </p>
      <p className="mt-2 text-sm text-left">
        © <a
          href="https://github.com/brais0tero"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600"
        >
          Brais Otero Simón
        </a>
      </p>
    </main>
  );
}