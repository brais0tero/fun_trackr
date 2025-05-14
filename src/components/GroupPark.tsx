'use client';

import { useState } from 'react';
import { ParkGroup } from '@/types/queue_times_types';
import { useParkStore } from '@/stores/useParkStore';
import { useRouter } from 'next/navigation';

interface Props {
  group: ParkGroup;
}

export default function GroupPark({ group }: Props) {
  const [open, setOpen] = useState(false);
  const setSelectedPark = useParkStore((state) => state.setSelectedPark);
  const router = useRouter();
  return (
    <div
      className={`mb-6 border border-gray-200 bg-white rounded-lg shadow-sm transition-transform ${open ? 'scale-105' : 'scale-100'
        }`}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full text-left p-4 flex justify-between items-center rounded-t-lg hover:bg-gray-50 transition-all ease-in duration-100"
      >
        <h2 className="text-xl font-semibold text-brand-dark">{group.name}</h2>
        <span className="text-sm text-brand-medium">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <ul className="space-y-1 px-4 pb-4">
          {group.parks.map((park) => (
            <li key={park.id}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPark(park);
                  router.push(`/park/${park.id}`);
                }}
                className="w-full text-brand-medium hover:underline hover:scale-110 transition-all ease-in duration-100 hover:text-brand hover:cursor-pointer"
              >
                {park.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}