'use client';

import { useParams } from 'next/navigation';
import { useParkStore } from '@/stores/useParkStore';
import { useEffect, useState } from 'react';
import { useParkAttendance, useParkQueueTimes } from '@/hooks/queue_times_hooks';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Land, Ride } from '@/types/queue_times_types';

import RideCard from '@/components/park/RideCard';
import LandSelector from '@/components/park/LandSelector';
import { useTranslation } from 'react-i18next';

export default function ParkDetailPage() {
  const { t } = useTranslation();
  const { park_id } = useParams();

  const parkId = Number(park_id);
  const park = useParkStore((state) => state.selectedPark);
  const { attendanceData, isLoading: loadingAttendance } = useParkAttendance(isNaN(parkId) ? null : parkId);

  const [cachedQueueData, setCachedQueueData] = useState<{ lands: Land[]; rides: Ride[] } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`queueData-${parkId}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCachedQueueData(parsed);
      } catch (e) {
        console.error('Failed to parse cached queue data', e);
      }
    }
  }, [parkId]);

  const { queueData, isLoading: loading } = useParkQueueTimes(
    isNaN(parkId) || cachedQueueData ? null : parkId
  );

  const dataToUse = queueData ?? cachedQueueData;

  useEffect(() => {
    if (queueData && !cachedQueueData) {
      localStorage.setItem(`queueData-${parkId}`, JSON.stringify(queueData));
    }
  }, [queueData, cachedQueueData, parkId]);

  // Estado para land seleccionado y configuración de rango de espera por ride
  const [selectedLandId, setSelectedLandId] = useState<number | null>(null);
  const [rideWaitConfig, setRideWaitConfig] = useState<Record<number, { min: number; max: number }>>({});
  // Estado para configuración global de espera
  const [globalMin, setGlobalMin] = useState<number>(10);
  const [globalMax, setGlobalMax] = useState<number>(60);

  // Función para obtener el color de la barra según la configuración del usuario
  const getRideColor = (wait: number, rideId: number) => {
    const config = rideWaitConfig[rideId];
    if (!config) {
      if (wait >= globalMax) return 'bg-red-500';
      if (wait >= globalMin) return 'bg-yellow-400';
      return 'bg-green-500';
    }
    if (wait >= config.max) return 'bg-red-500';
    if (wait >= config.min) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  // Función para actualizar el rango de espera de cada ride
  const updateWaitConfig = (rideId: number, field: 'min' | 'max', value: number) => {
    setRideWaitConfig(prev => ({
      ...prev,
      [rideId]: {
        ...prev[rideId],
        [field]: value,
      },
    }));
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
        <h1 className="text-3xl font-bold mb-6 text-brand-dark">
          {park?.name ?? t('park_detail.title')}
        </h1>
        {attendanceData && (
          <div className="w-full h-64 mb-12">
            <h2 className="text-lg font-semibold text-brand-dark mb-2">
              {t('park_detail.attendance_title')}
            </h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.entries(attendanceData).map(([year, value]) => ({ year, attendance: value }))}>
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `${(value / 1_000_000).toFixed(1)}M`} />
                <Tooltip />
                <Bar dataKey="attendance" fill="#3969B8" />
                <Tooltip
                  formatter={(value: number) => [(value / 1_000_000).toFixed(1), t('park_detail.attendance')]}
                  labelFormatter={(label: string) => `${t('park_detail.attendance.attendance')} ${label}`}
                  contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #3969B8' }}
                  itemStyle={{ color: '#3969B8' }}
                  cursor={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {!loadingAttendance && !attendanceData && (
        <p className="text-sm text-center text-brand-dark mb-12">
          {t('park_detail.no_attendance')}
        </p>
      )}

      {loading && (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mb-10 animate-pulse space-y-4">
              <div className="h-6 w-1/3 bg-white/70 rounded" />
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-20 bg-white/50 rounded shadow" />
              ))}
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Lateral: selector de lands + configuración global */}
          <div className="md:col-span-1 space-y-6">
            <LandSelector
              lands={dataToUse?.lands ?? []}
              selectedLandId={selectedLandId}
              setSelectedLandId={setSelectedLandId}
              t={t}
            />

            <div>
              <h3 className="text-sm font-semibold text-brand-dark mb-2">{t('park_detail.global_wait_config')}</h3>
              <div className="flex flex-col gap-2 text-sm">
                <label className="flex items-center gap-2">
                  {t('common.min')}:
                  <input
                    type="number"
                    value={globalMin}
                    onChange={(e) => setGlobalMin(parseInt(e.target.value))}
                    className="w-full px-2 border rounded text-center"
                  />
                </label>
                <label className="flex items-center gap-2">
                  {t('common.max')}:
                  <input
                    type="number"
                    value={globalMax}
                    onChange={(e) => setGlobalMax(parseInt(e.target.value))}
                    className="w-full px-2 border rounded text-center"
                  />
                </label>
              </div>
            </div>
          </div>
          {dataToUse?.lands?.some((land) => land.rides?.length > 0) ? (
            <div className="md:col-span-3 space-y-6">
              {dataToUse?.lands
                .filter((land) => selectedLandId === null || land.id === selectedLandId)
                .map((land) => (
                  <div key={land.id}>
                    <h2 className="text-xl font-semibold mb-2">{land.name}</h2>
                    <div className="grid gap-4">
                      {land.rides.map((ride) => {
                        const wait = ride.wait_time;
                        const maxReference = rideWaitConfig[ride.id]?.max ?? globalMax;
                        const widthPercent = Math.min((wait / maxReference) * 100, 100);
                        const color = getRideColor(wait, ride.id);
                        return (
                          <RideCard
                            key={ride.id}
                            ride={ride}
                            wait={wait}
                            widthPercent={widthPercent}
                            color={color}
                            globalMin={globalMin}
                            globalMax={globalMax}
                            rideWaitConfig={rideWaitConfig}
                            updateWaitConfig={updateWaitConfig}
                            t={t}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>): <></>}

          {!loading && (!dataToUse?.lands?.length && dataToUse?.rides?.length) && (
            <div className="md:col-span-3 space-y-6">
              <h2 className="text-xl font-semibold mb-2">{t('park_detail.general_rides')}</h2>
              <div className="grid gap-4">
                {dataToUse?.rides?.map((ride) => {
                  const wait = ride.wait_time;
                  const maxReference = rideWaitConfig[ride.id]?.max ?? globalMax;
                  const widthPercent = Math.min((wait / maxReference) * 100, 100);
                  const color = getRideColor(wait, ride.id);
                  return (
                    <RideCard
                      key={ride.id}
                      ride={ride}
                      wait={wait}
                      widthPercent={widthPercent}
                      color={color}
                      globalMin={globalMin}
                      globalMax={globalMax}
                      rideWaitConfig={rideWaitConfig}
                      updateWaitConfig={updateWaitConfig}
                      t={t}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}