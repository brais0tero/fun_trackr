'use client';
import { useTranslation } from 'react-i18next';
import { useParks } from '@/hooks/queue_times_hooks';
import GroupPark from '@/components/GroupPark';
import { ParkGroup } from '@/types/queue_times_types';
import { useEffect, useState } from 'react';

export default function Home() {
  const { t } = useTranslation();

  const [cachedParks, setCachedParks] = useState<ParkGroup[] | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cachedParks');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCachedParks(parsed);
      } catch (e) {
        console.error('Failed to parse cached parks', e);
      }
    }
  }, []);

  const { parks, isLoading, isError } = useParks(!!cachedParks === false);
  const parkGroups = cachedParks ?? parks;

  // Almacenar en localStorage si parks llega por primera vez
  useEffect(() => {
    if (parks && !cachedParks) {
      localStorage.setItem('cachedParks', JSON.stringify(parks));
    }
  }, [parks, cachedParks]);

  return (
    <main className="w-full mx-auto px-4 py-16 sm:px-6 lg:px-8 min-h-screen">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 tracking-tight leading-tight">
        {t('park_list')}
      </h1>

      {isLoading && (
        <p className="text-center text-gray-500 animate-pulse">
          {t('loading')}
        </p>
      )}

      {isError && (
        <p className="text-center text-red-600 font-medium">
          {t('error_loading_parks', 'Hubo un error al cargar los parques.')}
        </p>
      )}

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 transition-all duration-200 ease-linear">
        {(parkGroups ?? Array(4).fill(null)).map((group, index) => (
          <div
            key={group?.id ?? index}
            className="break-inside-avoid p-2 transition-transform duration-200 hover:scale-[1.02]"
          >
            {group ? (
              <GroupPark group={group as ParkGroup} />
            ) : (
              <div className="h-28 bg-white/60 rounded shadow animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
