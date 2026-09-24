import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs';
import { FlightService } from './flight';
import { Flight } from '../models/flight.model';

describe('FlightService', () => {
  let service: FlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 20 total flights', () => new Promise<void>((resolve) => {
    service.flights$.subscribe((flights) => {
      expect(flights.length).toBe(20);
      resolve();
    });
  }));

  it('kpiStats$ should compute correct totals', () => new Promise<void>((resolve) => {
    service.kpiStats$.subscribe((stats) => {
      expect(stats.total).toBe(20);
      expect(stats.active + stats.delayed + stats.arrived + stats.cancelled + stats.boarding)
        .toBe(stats.total);
      resolve();
    });
  }));

  it('should filter flights by search callsign', () => new Promise<void>((resolve) => {
    service.updateFilter({ search: 'AIC' });
    service.filteredFlights$.subscribe((flights) => {
      flights.forEach((f) => {
        expect(f.callsign.toUpperCase()).toContain('AIC');
      });
      resolve();
    });
  }));

  it('should filter by status: Active', () => new Promise<void>((resolve) => {
    service.updateFilter({ status: 'Active' });
    service.filteredFlights$.subscribe((flights) => {
      flights.forEach((f) => expect(f.status).toBe('Active'));
      resolve();
    });
  }));

  it('should filter by origin airport code', () => new Promise<void>((resolve) => {
    service.updateFilter({ origin: 'DEL' });
    service.filteredFlights$.subscribe((flights) => {
      flights.forEach((f) => expect(f.origin.code).toBe('DEL'));
      resolve();
    });
  }));

  it('should reset filters and return all flights', () => new Promise<void>((resolve) => {
    service.updateFilter({ search: 'XYZ', status: 'Active' });
    service.resetFilters();
    service.filteredFlights$.subscribe((flights) => {
      expect(flights.length).toBe(20);
      resolve();
    });
  }));

  it('should select and deselect a flight', () => new Promise<void>((resolve) => {
    const flight = service.getFlightById('f001')!;

    service.selectedFlight$.pipe(take(3)).subscribe({
      next: (f) => {
        if (f !== null && f !== undefined && 'flightNumber' in f) {
          expect(f.flightNumber).toBe('AI-202');
          service.selectFlight(null);
        }
      },
      complete: () => {
        resolve();
      },
    });

    service.selectFlight(flight);
  }));

  it('getFlightById should return correct flight', () => {
    const flight = service.getFlightById('f001');
    expect(flight?.flightNumber).toBe('AI-202');
  });

  it('getFlightById should return undefined for unknown id', () => {
    expect(service.getFlightById('unknown')).toBeUndefined();
  });

  it('uniqueOrigins should return sorted unique codes', () => {
    const origins = service.uniqueOrigins;
    expect(origins.length).toBeGreaterThan(0);
    const sorted = [...origins].sort();
    expect(origins).toEqual(sorted);
  });
});
