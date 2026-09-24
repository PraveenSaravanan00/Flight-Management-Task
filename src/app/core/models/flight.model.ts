export type FlightStatus = 'Active' | 'Delayed' | 'Arrived' | 'Cancelled' | 'Boarding';

export interface Airport {
  code: string;
  name: string;
  lat: number;
  lng: number;
  city: string;
  country: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  callsign: string;
  aircraftType: string;
  origin: Airport;
  destination: Airport;
  currentLat: number;
  currentLng: number;
  status: FlightStatus;
  estimatedDeparture: string;
  estimatedArrival: string;
  altitude: number;
  speed: number;
  heading: number;
}

export interface KpiCard {
  title: string;
  value: number;
  icon: string;
  bgGradient: string;
  textColor: string;
  borderColor: string;
  trend: number;
}

export interface FilterState {
  search: string;
  status: string;
  origin: string;
  destination: string;
}

export interface KpiStats {
  total: number;
  active: number;
  delayed: number;
  arrived: number;
  cancelled: number;
  boarding: number;
}
