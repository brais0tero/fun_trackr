import useSWR from 'swr';
import { fetchParks, fetchParkQueueTimes, fetchParkAttendance } from '@/fetchers/queque_times_fetcher';
import { ParkGroup, ParkQueueTimesResponse, AttendanceByYear } from '@/types/queue_times_types';

export function useParks(shouldFetch: boolean = true) {
  const { data, error, isLoading } = useSWR<ParkGroup[]>(
    shouldFetch ? 'queue_times/parks' : null,
    fetchParks
  );
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
export function useParkAttendance(parkId: number | null) {
  const { data, error, isLoading } = useSWR<AttendanceByYear>(
    parkId ? `queue_times/parks/${parkId}/attendance` : null,
    () => fetchParkAttendance(parkId!)
  );

  return {
    attendanceData: data,
    isLoading,
    isError: error,
  };
}