export interface ParkGroup {
  id: number;
  name: string;
  parks: Park[];
}

export interface Park {
  id: number;
  name: string;
  country: string;
  continent: string;
  latitude: string;
  longitude: string;
  timezone: string;
}

export interface Ride {
  id: number;
  name: string;
  is_open: boolean;
  wait_time: number;
  last_updated: string; // ISO timestamp
}

export interface Land {
  id: number;
  name: string;
  rides: Ride[];
}

export interface ParkQueueTimesResponse {
  lands: Land[];
  rides: Ride[]; // sometimes flat list, empty in example
}