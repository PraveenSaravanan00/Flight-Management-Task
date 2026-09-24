import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header';
import { KpiCardsComponent } from '../kpi-cards/kpi-cards';
import { SidebarComponent } from '../sidebar/sidebar';
import { FlightMapComponent } from '../flight/flight';
import { FlightDetailComponent } from '../flight-detail/flight-detail';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    KpiCardsComponent,
    SidebarComponent,
    FlightMapComponent,
    FlightDetailComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
