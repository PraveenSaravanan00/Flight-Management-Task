import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Flight, FilterState, KpiStats } from '../models/flight.model';
import { MOCK_FLIGHTS } from '../../data/mock-data';

const DEFAULT_FILTER: FilterState = { search: '', status: '', origin: '', destination: '' };

@Injectable({ providedIn: 'root' })
export class FlightService {
  private readonly allFlights = MOCK_FLIGHTS;

  private flightsSubject = new BehaviorSubject<Flight[]>(this.allFlights);
  private selectedFlightSubject = new BehaviorSubject<Flight | null>(null);
  private filterSubject = new BehaviorSubject<FilterState>(DEFAULT_FILTER);

  flights$: Observable<Flight[]> = this.flightsSubject.asObservable();
  selectedFlight$: Observable<Flight | null> = this.selectedFlightSubject.asObservable();
  filters$: Observable<FilterState> = this.filterSubject.asObservable();

  filteredFlights$: Observable<Flight[]> = combineLatest([
    this.flightsSubject,
    this.filterSubject,
  ]).pipe(
    map(([flights, filter]) => {
      return flights.filter((f) => {
        const matchSearch =
          !filter.search ||
          f.callsign.toLowerCase().includes(filter.search.toLowerCase()) ||
          f.flightNumber.toLowerCase().includes(filter.search.toLowerCase());
        const matchStatus = !filter.status || f.status === filter.status;
        const matchOrigin = !filter.origin || f.origin.code === filter.origin;
        const matchDest = !filter.destination || f.destination.code === filter.destination;
        return matchSearch && matchStatus && matchOrigin && matchDest;
      });
    })
  );

  kpiStats$: Observable<KpiStats> = this.flightsSubject.pipe(
    map((flights) => ({
      total: flights.length,
      active: flights.filter((f) => f.status === 'Active').length,
      delayed: flights.filter((f) => f.status === 'Delayed').length,
      arrived: flights.filter((f) => f.status === 'Arrived').length,
      cancelled: flights.filter((f) => f.status === 'Cancelled').length,
      boarding: flights.filter((f) => f.status === 'Boarding').length,
    }))
  );

  get uniqueOrigins(): string[] {
    return [...new Set(this.allFlights.map((f) => f.origin.code))].sort();
  }

  get uniqueDestinations(): string[] {
    return [...new Set(this.allFlights.map((f) => f.destination.code))].sort();
  }

  selectFlight(flight: Flight | null): void {
    this.selectedFlightSubject.next(flight);
  }

  updateFilter(partial: Partial<FilterState>): void {
    this.filterSubject.next({ ...this.filterSubject.value, ...partial });
  }

  resetFilters(): void {
    this.filterSubject.next(DEFAULT_FILTER);
  }

  getFlightById(id: string): Flight | undefined {
    return this.allFlights.find((f) => f.id === id);
  }
}
