

'use client';
import { Land } from '@/types/queue_times_types';

interface LandSelectorProps {
  lands: Land[];
  selectedLandId: number | null;
  setSelectedLandId: (id: number | null) => void;
  t: (key: string) => string;
}

export default function LandSelector({
  lands,
  selectedLandId,
  setSelectedLandId,
  t,
}: LandSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-brand-dark mb-2">
        {t('park_detail.show_zones')}
      </h3>
      <button
        onClick={() => setSelectedLandId(null)}
        className={`w-full text-left px-4 py-2 rounded ${
          selectedLandId === null
            ? 'bg-brand-light text-brand'
            : 'bg-white text-brand-dark'
        } border border-brand-light hover:bg-brand-light hover:text-brand-medium hover:scale-110 transition duration-200 ease-in`}
      >
        {t('common.all')}
      </button>
      {lands.map((land) => (
        <button
          key={land.id}
          onClick={() => setSelectedLandId(land.id)}
          className={`w-full text-left px-4 py-2 rounded ${
            selectedLandId === land.id
              ? 'bg-brand-light text-brand'
              : 'bg-white text-brand-dark'
          } border border-brand-light hover:bg-brand-light hover:text-brand-medium hover:scale-110 transition duration-200 ease-in`}
        >
          {land.name}
        </button>
      ))}
    </div>
  );
}