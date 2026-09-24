import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FlightService } from '../../core/services/flight';
import { KpiStats } from '../../core/models/flight.model';

interface KpiItem {
  title: string;
  value: keyof KpiStats;
  icon: string;
  gradient: string;
  glow: string;
  trend: string;
  trendUp: boolean;
}

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-cards.html',
  styleUrl: './kpi-cards.css',
})
export class KpiCardsComponent implements OnInit {
  stats$!: Observable<KpiStats>;

  cards: KpiItem[] = [
    { title: 'Total Flights', value: 'total', icon: 'pi pi-send', gradient: 'grad-indigo', glow: 'glow-indigo', trend: '+2 today', trendUp: true },
    { title: 'Active', value: 'active', icon: 'pi pi-check-circle', gradient: 'grad-green', glow: 'glow-green', trend: 'Airborne', trendUp: true },
    { title: 'Delayed', value: 'delayed', icon: 'pi pi-clock', gradient: 'grad-amber', glow: 'glow-amber', trend: 'Avg 45min', trendUp: false },
    { title: 'Arrived', value: 'arrived', icon: 'pi pi-flag', gradient: 'grad-blue', glow: 'glow-blue', trend: 'On time', trendUp: true },
    { title: 'Cancelled', value: 'cancelled', icon: 'pi pi-times-circle', gradient: 'grad-red', glow: 'glow-red', trend: 'Today', trendUp: false },
    { title: 'Boarding', value: 'boarding', icon: 'pi pi-ticket', gradient: 'grad-purple', glow: 'glow-purple', trend: 'At gate', trendUp: true },
  ];

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.stats$ = this.flightService.kpiStats$;
  }
}
