'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ParkGroup } from '@/types/queue_times_types';

interface Props {
  group: ParkGroup;
}

export default function GroupPark({ group }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`mb-6 border border-gray-200 bg-white rounded-lg shadow-sm transition-transform ${
      open ? 'scale-105' : 'scale-100'
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
          <Link
          href={`/parks/${park.id}`}
          className="text-brand-medium hover:underline hover:scale-110 transition-all ease-in duration-100 hover:text-brand"
          >
          {park.name}
          </Link>
        </li>
        ))}
      </ul>
      )}
    </div>
  );
}