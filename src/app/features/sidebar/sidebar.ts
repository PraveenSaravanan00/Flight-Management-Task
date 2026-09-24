import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { FlightService } from '../../core/services/flight';
import { Flight, FlightStatus } from '../../core/models/flight.model';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StatusBadgeComponent,
    InputTextModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;
  flights: Flight[] = [];
  selectedFlight: Flight | null = null;
  private subs = new Subscription();

  statusOptions = [
    { label: 'All Statuses', value: '' },
    { label: 'Active', value: 'Active' },
    { label: 'Delayed', value: 'Delayed' },
    { label: 'Arrived', value: 'Arrived' },
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'Boarding', value: 'Boarding' },
  ];

  originOptions: { label: string; value: string }[] = [];
  destOptions: { label: string; value: string }[] = [];

  constructor(private fb: FormBuilder, private flightService: FlightService) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      search: [''],
      status: [''],
      origin: [''],
      destination: [''],
    });

    const origins = this.flightService.uniqueOrigins;
    this.originOptions = [
      { label: 'All Origins', value: '' },
      ...origins.map((o) => ({ label: o, value: o })),
    ];
    const dests = this.flightService.uniqueDestinations;
    this.destOptions = [
      { label: 'All Destinations', value: '' },
      ...dests.map((d) => ({ label: d, value: d })),
    ];

    this.subs.add(
      this.filterForm
        .get('search')!
        .valueChanges.pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((v) => this.flightService.updateFilter({ search: v }))
    );

    ['status', 'origin', 'destination'].forEach((ctrl) => {
      this.subs.add(
        this.filterForm
          .get(ctrl)!
          .valueChanges.subscribe((v) => this.flightService.updateFilter({ [ctrl]: v }))
      );
    });

    this.subs.add(
      this.flightService.filteredFlights$.subscribe((flights) => (this.flights = flights))
    );
    this.subs.add(
      this.flightService.selectedFlight$.subscribe((f) => (this.selectedFlight = f))
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  selectFlight(flight: Flight): void {
    this.flightService.selectFlight(flight);
  }

  resetFilters(): void {
    this.filterForm.reset({ search: '', status: '', origin: '', destination: '' });
    this.flightService.resetFilters();
  }

  isSelected(flight: Flight): boolean {
    return this.selectedFlight?.id === flight.id;
  }

  formatTime(iso: string): string {
    return new Date(iso).toUTCString().split(' ').slice(4, 5)[0];
  }

  getStatusClass(status: FlightStatus): string {
    const map: Record<FlightStatus, string> = {
      Active: 'status-active',
      Delayed: 'status-delayed',
      Arrived: 'status-arrived',
      Cancelled: 'status-cancelled',
      Boarding: 'status-boarding',
    };
    return map[status];
  }
}
