import { ParkGroup, ParkQueueTimesResponse } from '@/types/queue_times_types';

const BASE_URL = 'https://queue-times.com';

export async function fetchParks(): Promise<ParkGroup[]> {
  const target = encodeURIComponent(`${BASE_URL}/parks.json`);
  const res = await fetch(`/api/parks?url=${target}`);
  if (!res.ok) {
    throw new Error('Failed to fetch park list');
  }
  return res.json();
}

export async function fetchParkQueueTimes(parkId: number): Promise<ParkQueueTimesResponse> {
  const target = encodeURIComponent(`${BASE_URL}/parks/${parkId}/queue_times.json`);
  const res = await fetch(`/api/parks?url=${target}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch queue times for park ${parkId}`);
  }
  return res.json();
}
