import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightStatus } from '../../../core/models/flight.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'status-badge.html',
  styleUrl:"status-badge.css"
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: FlightStatus;

  get badgeClass(): string {
    const map: Record<FlightStatus, string> = {
      Active:    'status-bg-active',
      Delayed:   'status-bg-delayed',
      Arrived:   'status-bg-arrived',
      Cancelled: 'status-bg-cancelled',
      Boarding:  'status-bg-boarding',
    };
    return map[this.status] ?? '';
  }

  get dotClass(): string {
    const map: Record<FlightStatus, string> = {
      Active:    'dot-active',
      Delayed:   'dot-delayed',
      Arrived:   'dot-arrived',
      Cancelled: 'dot-cancelled',
      Boarding:  'dot-boarding',
    };
    return map[this.status] ?? '';
  }
}
