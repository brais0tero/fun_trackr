'use client';
import { Ride } from '@/types/queue_times_types';

interface RideCardProps {
  ride: Ride;
  wait: number;
  widthPercent: number;
  color: string;
  globalMin: number;
  globalMax: number;
  rideWaitConfig: Record<number, { min: number; max: number }>;
  updateWaitConfig: (rideId: number, field: 'min' | 'max', value: number) => void;
  t: (key: string) => string;
}

export default function RideCard({
  ride,
  wait,
  widthPercent,
  color,
  t,
}: RideCardProps) {
  return (
    <div key={ride.id} className="rounded-md border border-brand-light bg-white/80 p-4 shadow-sm">
      <div className="text-brand-dark text-base font-semibold text-center mb-2">{ride.name}</div>
      {ride.is_open ? (<div className="h-3 w-full rounded bg-brand-light relative overflow-hidden">
        <div className={`absolute top-0 left-0 h-full ${color}`} style={{ width: `${widthPercent}%` }} />
      </div>):<></>}
      <p className={"text-xs text-center mt-1" + (ride.is_open ? 'text-gray-600' : ' text-red-500')}>
        {ride.is_open ? `⏱ ${wait} ${t('common.min')}` : t('common.closed')}
      </p>
    </div>
  );
}
