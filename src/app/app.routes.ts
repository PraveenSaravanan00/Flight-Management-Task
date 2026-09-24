import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard').then((m) => m.DashboardComponent),
  },
  {
    path: 'flight/:id',
    loadComponent: () =>
      import('./features/flight-detail/flight-detail').then((m) => m.FlightDetailComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];
