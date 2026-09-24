import { Flight } from '../core/models/flight.model';

export const MOCK_FLIGHTS: Flight[] = [
  {
    id: 'f001',
    flightNumber: 'AI-202',
    callsign: 'AIC202',
    aircraftType: 'Boeing 787-8 Dreamliner',
    origin: { code: 'DEL', name: 'Indira Gandhi International', lat: 28.5562, lng: 77.1000, city: 'New Delhi', country: 'India' },
    destination: { code: 'LHR', name: 'London Heathrow', lat: 51.4700, lng: -0.4543, city: 'London', country: 'UK' },
    currentLat: 40.5, currentLng: 38.2,
    status: 'Active', estimatedDeparture: '2026-09-21T08:30:00Z', estimatedArrival: '2026-09-21T16:45:00Z',
    altitude: 37000, speed: 520, heading: 315
  },
  {
    id: 'f002',
    flightNumber: '6E-401',
    callsign: 'IGO401',
    aircraftType: 'Airbus A320neo',
    origin: { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', lat: 19.0896, lng: 72.8656, city: 'Mumbai', country: 'India' },
    destination: { code: 'DEL', name: 'Indira Gandhi International', lat: 28.5562, lng: 77.1000, city: 'New Delhi', country: 'India' },
    currentLat: 23.5, currentLng: 74.8,
    status: 'Active', estimatedDeparture: '2026-09-21T10:00:00Z', estimatedArrival: '2026-09-21T12:15:00Z',
    altitude: 35000, speed: 465, heading: 22
  },
  {
    id: 'f003',
    flightNumber: 'UK-731',
    callsign: 'UKX731',
    aircraftType: 'Boeing 737-800',
    origin: { code: 'BLR', name: 'Kempegowda International', lat: 13.1989, lng: 77.7068, city: 'Bangalore', country: 'India' },
    destination: { code: 'DXB', name: 'Dubai International', lat: 25.2532, lng: 55.3657, city: 'Dubai', country: 'UAE' },
    currentLat: 18.5, currentLng: 63.0,
    status: 'Delayed', estimatedDeparture: '2026-09-21T11:30:00Z', estimatedArrival: '2026-09-21T14:00:00Z',
    altitude: 33000, speed: 450, heading: 290
  },
  {
    id: 'f004',
    flightNumber: 'SQ-521',
    callsign: 'SIA521',
    aircraftType: 'Airbus A380-800',
    origin: { code: 'SIN', name: 'Singapore Changi', lat: 1.3644, lng: 103.9915, city: 'Singapore', country: 'Singapore' },
    destination: { code: 'LHR', name: 'London Heathrow', lat: 51.4700, lng: -0.4543, city: 'London', country: 'UK' },
    currentLat: 28.0, currentLng: 68.5,
    status: 'Active', estimatedDeparture: '2026-09-21T07:00:00Z', estimatedArrival: '2026-09-21T19:30:00Z',
    altitude: 40000, speed: 560, heading: 305
  },
  {
    id: 'f005',
    flightNumber: 'EK-505',
    callsign: 'UAE505',
    aircraftType: 'Boeing 777-300ER',
    origin: { code: 'DXB', name: 'Dubai International', lat: 25.2532, lng: 55.3657, city: 'Dubai', country: 'UAE' },
    destination: { code: 'JFK', name: 'John F. Kennedy International', lat: 40.6413, lng: -73.7781, city: 'New York', country: 'USA' },
    currentLat: 43.0, currentLng: 15.5,
    status: 'Active', estimatedDeparture: '2026-09-21T09:15:00Z', estimatedArrival: '2026-09-21T22:00:00Z',
    altitude: 39000, speed: 545, heading: 305
  },
  {
    id: 'f006',
    flightNumber: 'AI-665',
    callsign: 'AIC665',
    aircraftType: 'Airbus A321',
    origin: { code: 'MAA', name: 'Chennai International', lat: 12.9900, lng: 80.1693, city: 'Chennai', country: 'India' },
    destination: { code: 'SIN', name: 'Singapore Changi', lat: 1.3644, lng: 103.9915, city: 'Singapore', country: 'Singapore' },
    currentLat: 6.5, currentLng: 93.0,
    status: 'Active', estimatedDeparture: '2026-09-21T13:45:00Z', estimatedArrival: '2026-09-21T20:15:00Z',
    altitude: 36000, speed: 480, heading: 135
  },
  {
    id: 'f007',
    flightNumber: '6E-721',
    callsign: 'IGO721',
    aircraftType: 'Airbus A320',
    origin: { code: 'CCU', name: 'Netaji Subhas Chandra Bose International', lat: 22.6520, lng: 88.4463, city: 'Kolkata', country: 'India' },
    destination: { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', lat: 19.0896, lng: 72.8656, city: 'Mumbai', country: 'India' },
    currentLat: 21.0, currentLng: 80.5,
    status: 'Delayed', estimatedDeparture: '2026-09-21T09:00:00Z', estimatedArrival: '2026-09-21T11:30:00Z',
    altitude: 34000, speed: 455, heading: 248
  },
  {
    id: 'f008',
    flightNumber: 'AF-218',
    callsign: 'AFR218',
    aircraftType: 'Boeing 777-200ER',
    origin: { code: 'CDG', name: 'Charles de Gaulle', lat: 49.0097, lng: 2.5479, city: 'Paris', country: 'France' },
    destination: { code: 'DEL', name: 'Indira Gandhi International', lat: 28.5562, lng: 77.1000, city: 'New Delhi', country: 'India' },
    currentLat: 38.5, currentLng: 45.0,
    status: 'Active', estimatedDeparture: '2026-09-21T06:00:00Z', estimatedArrival: '2026-09-21T18:30:00Z',
    altitude: 38000, speed: 535, heading: 110
  },
  {
    id: 'f009',
    flightNumber: 'NH-828',
    callsign: 'ANA828',
    aircraftType: 'Boeing 787-9',
    origin: { code: 'NRT', name: 'Narita International', lat: 35.7720, lng: 140.3929, city: 'Tokyo', country: 'Japan' },
    destination: { code: 'DEL', name: 'Indira Gandhi International', lat: 28.5562, lng: 77.1000, city: 'New Delhi', country: 'India' },
    currentLat: 32.0, currentLng: 110.5,
    status: 'Active', estimatedDeparture: '2026-09-21T10:30:00Z', estimatedArrival: '2026-09-21T17:45:00Z',
    altitude: 37000, speed: 510, heading: 260
  },
  {
    id: 'f010',
    flightNumber: 'QR-552',
    callsign: 'QTR552',
    aircraftType: 'Airbus A350-900',
    origin: { code: 'DOH', name: 'Hamad International', lat: 25.2732, lng: 51.6089, city: 'Doha', country: 'Qatar' },
    destination: { code: 'BLR', name: 'Kempegowda International', lat: 13.1989, lng: 77.7068, city: 'Bangalore', country: 'India' },
    currentLat: 19.0, currentLng: 64.5,
    status: 'Arrived', estimatedDeparture: '2026-09-21T03:30:00Z', estimatedArrival: '2026-09-21T10:45:00Z',
    altitude: 0, speed: 0, heading: 0
  },
  {
    id: 'f011',
    flightNumber: 'AI-142',
    callsign: 'AIC142',
    aircraftType: 'Boeing 777-300ER',
    origin: { code: 'DEL', name: 'Indira Gandhi International', lat: 28.5562, lng: 77.1000, city: 'New Delhi', country: 'India' },
    destination: { code: 'JFK', name: 'John F. Kennedy International', lat: 40.6413, lng: -73.7781, city: 'New York', country: 'USA' },
    currentLat: 47.5, currentLng: 30.0,
    status: 'Active', estimatedDeparture: '2026-09-21T04:00:00Z', estimatedArrival: '2026-09-21T20:30:00Z',
    altitude: 38000, speed: 550, heading: 320
  },
  {
    id: 'f012',
    flightNumber: '5X-1',
    callsign: 'FDX001',
    aircraftType: 'Boeing 747-400F',
    origin: { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', lat: 19.0896, lng: 72.8656, city: 'Mumbai', country: 'India' },
    destination: { code: 'CDG', name: 'Charles de Gaulle', lat: 49.0097, lng: 2.5479, city: 'Paris', country: 'France' },
    currentLat: 30.0, currentLng: 52.0,
    status: 'Cancelled', estimatedDeparture: '2026-09-21T12:00:00Z', estimatedArrival: '2026-09-21T21:30:00Z',
    altitude: 0, speed: 0, heading: 0
  },
  {
    id: 'f013',
    flightNumber: 'EY-211',
    callsign: 'ETD211',
    aircraftType: 'Boeing 787-10',
    origin: { code: 'AUH', name: 'Abu Dhabi International', lat: 24.4330, lng: 54.6511, city: 'Abu Dhabi', country: 'UAE' },
    destination: { code: 'HYD', name: 'Rajiv Gandhi International', lat: 17.2313, lng: 78.4298, city: 'Hyderabad', country: 'India' },
    currentLat: 20.5, currentLng: 66.0,
    status: 'Boarding', estimatedDeparture: '2026-09-21T20:00:00Z', estimatedArrival: '2026-09-21T23:45:00Z',
    altitude: 0, speed: 0, heading: 90
  },
  {
    id: 'f014',
    flightNumber: 'BA-118',
    callsign: 'BAW118',
    aircraftType: 'Boeing 777-200',
    origin: { code: 'LHR', name: 'London Heathrow', lat: 51.4700, lng: -0.4543, city: 'London', country: 'UK' },
    destination: { code: 'DEL', name: 'Indira Gandhi International', lat: 28.5562, lng: 77.1000, city: 'New Delhi', country: 'India' },
    currentLat: 43.0, currentLng: 30.5,
    status: 'Active', estimatedDeparture: '2026-09-21T08:45:00Z', estimatedArrival: '2026-09-21T21:30:00Z',
    altitude: 36000, speed: 530, heading: 105
  },
  {
    id: 'f015',
    flightNumber: 'IX-613',
    callsign: 'AXB613',
    aircraftType: 'Airbus A320',
    origin: { code: 'COK', name: 'Cochin International', lat: 10.1520, lng: 76.4019, city: 'Kochi', country: 'India' },
    destination: { code: 'DXB', name: 'Dubai International', lat: 25.2532, lng: 55.3657, city: 'Dubai', country: 'UAE' },
    currentLat: 17.5, currentLng: 65.5,
    status: 'Active', estimatedDeparture: '2026-09-21T14:30:00Z', estimatedArrival: '2026-09-21T17:00:00Z',
    altitude: 32000, speed: 440, heading: 295
  },
  {
    id: 'f016',
    flightNumber: 'LH-760',
    callsign: 'DLH760',
    aircraftType: 'Airbus A340-300',
    origin: { code: 'FRA', name: 'Frankfurt Airport', lat: 50.0379, lng: 8.5622, city: 'Frankfurt', country: 'Germany' },
    destination: { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', lat: 19.0896, lng: 72.8656, city: 'Mumbai', country: 'India' },
    currentLat: 33.5, currentLng: 40.0,
    status: 'Delayed', estimatedDeparture: '2026-09-21T07:30:00Z', estimatedArrival: '2026-09-21T20:00:00Z',
    altitude: 34000, speed: 480, heading: 118
  },
  {
    id: 'f017',
    flightNumber: 'AI-332',
    callsign: 'AIC332',
    aircraftType: 'Airbus A321',
    origin: { code: 'DEL', name: 'Indira Gandhi International', lat: 28.5562, lng: 77.1000, city: 'New Delhi', country: 'India' },
    destination: { code: 'MAA', name: 'Chennai International', lat: 12.9900, lng: 80.1693, city: 'Chennai', country: 'India' },
    currentLat: 20.5, currentLng: 78.5,
    status: 'Arrived', estimatedDeparture: '2026-09-21T06:15:00Z', estimatedArrival: '2026-09-21T08:45:00Z',
    altitude: 0, speed: 0, heading: 0
  },
  {
    id: 'f018',
    flightNumber: '6E-855',
    callsign: 'IGO855',
    aircraftType: 'Boeing 737 MAX 8',
    origin: { code: 'HYD', name: 'Rajiv Gandhi International', lat: 17.2313, lng: 78.4298, city: 'Hyderabad', country: 'India' },
    destination: { code: 'CCU', name: 'Netaji Subhas Chandra Bose International', lat: 22.6520, lng: 88.4463, city: 'Kolkata', country: 'India' },
    currentLat: 20.0, currentLng: 83.5,
    status: 'Boarding', estimatedDeparture: '2026-09-21T19:30:00Z', estimatedArrival: '2026-09-21T21:45:00Z',
    altitude: 0, speed: 0, heading: 55
  },
  {
    id: 'f019',
    flightNumber: 'G8-112',
    callsign: 'GOW112',
    aircraftType: 'Boeing 737-800',
    origin: { code: 'BLR', name: 'Kempegowda International', lat: 13.1989, lng: 77.7068, city: 'Bangalore', country: 'India' },
    destination: { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', lat: 19.0896, lng: 72.8656, city: 'Mumbai', country: 'India' },
    currentLat: 15.8, currentLng: 75.5,
    status: 'Delayed', estimatedDeparture: '2026-09-21T15:00:00Z', estimatedArrival: '2026-09-21T16:45:00Z',
    altitude: 28000, speed: 410, heading: 310
  },
  {
    id: 'f020',
    flightNumber: 'CX-750',
    callsign: 'CPA750',
    aircraftType: 'Airbus A350-1000',
    origin: { code: 'HKG', name: 'Hong Kong International', lat: 22.3080, lng: 113.9185, city: 'Hong Kong', country: 'China' },
    destination: { code: 'LHR', name: 'London Heathrow', lat: 51.4700, lng: -0.4543, city: 'London', country: 'UK' },
    currentLat: 37.0, currentLng: 75.0,
    status: 'Active', estimatedDeparture: '2026-09-21T07:45:00Z', estimatedArrival: '2026-09-21T20:15:00Z',
    altitude: 41000, speed: 565, heading: 300
  }
];
