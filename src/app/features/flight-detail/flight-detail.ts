import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FlightService } from '../../core/services/flight';
import { Flight } from '../../core/models/flight.model';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-flight-detail',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, ButtonModule, DividerModule],
  templateUrl: './flight-detail.html',
  styleUrl: './flight-detail.css',
})
export class FlightDetailComponent implements OnInit, OnDestroy {
  flight: Flight | null = null;
  private subs = new Subscription();

  private routeId?: string;

  constructor(
    private flightService: FlightService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.routeId = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.routeId) {
      const f = this.flightService.getFlightById(this.routeId);
      this.flight = f ?? null;
    } else {
      this.subs.add(
        this.flightService.selectedFlight$.subscribe((f) => (this.flight = f))
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  close(): void {
    if (this.routeId) {
      this.router.navigate(['/dashboard']);
    } else {
      this.flightService.selectFlight(null);
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  formatDateTime(iso: string): string {
    const d = new Date(iso);
    return d.toUTCString().replace('GMT', 'UTC');
  }

  formatTime(iso: string): string {
    return new Date(iso).toUTCString().split(' ').slice(4, 5)[0] + ' UTC';
  }

  get isPage(): boolean {
    return !!this.routeId;
  }
}
