import useSWR from 'swr';
import { fetchParks, fetchParkQueueTimes } from '@/fetchers/queque_times_fetcher';
import { ParkGroup, ParkQueueTimesResponse } from '@/types/queue_times_types';

export function useParks() {
  const { data, error, isLoading } = useSWR<ParkGroup[]>('queue_times/parks', fetchParks);
  return {
    parks: data,
    isLoading,
    isError: error,
  };
}

export function useParkQueueTimes(parkId: number | null) {
  const { data, error, isLoading } = useSWR<ParkQueueTimesResponse>(
    parkId ? `queue_times/parks/${parkId}/queue_times` : null,
    () => fetchParkQueueTimes(parkId!)
  );
  return {
    queueData: data,
    isLoading,
    isError: error,
  };
}