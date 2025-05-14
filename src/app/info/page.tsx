'use client';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

export default function InfoPage() {
  const { t, ready } = useTranslation();

  if (!ready) return <p className="p-8 text-center">Cargando traducciones...</p>;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
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
    </main>
  );
}