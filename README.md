# Flight Tracking & Operations Dashboard

A responsive flight operations dashboard built with Angular, PrimeNG, Tailwind CSS, and Leaflet Maps. Designed for aviation operations personnel to monitor live flights, view routes, and track operational KPIs.

---

## Tech Stack

- **Angular 21** — standalone components, reactive forms, lazy routing
- **PrimeNG 17** — UI components (dropdowns, buttons, inputs)
- **Tailwind CSS v4** — layout and utility styling
- **Leaflet** — interactive flight map
- **RxJS** — state management via BehaviorSubjects

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200) — the app loads directly on the dashboard.

---

## Scripts

```bash
npm start          # development server
npm run build      # production build
npm test           # run unit tests
```

---

## Project Structure

```
src/app/
├── core/
│   ├── models/         # TypeScript interfaces (Flight, Airport, FilterState)
│   └── services/       # FlightService (state + filters), ThemeService (dark mode)
├── data/
│   └── mock-data.ts    # 20 mock flights with real airport coordinates
├── features/
│   ├── dashboard/      # Main shell layout
│   ├── flight/         # Leaflet map component
│   ├── flight-detail/  # Flight info panel and detail page
│   ├── kpi-cards/      # Stats overview row
│   └── sidebar/        # Search, filters, flight list
└── shared/
    └── components/
        ├── header/         # Top nav with live UTC clock
        └── status-badge/   # Reusable status indicator
```

---

## Features

- **Interactive map** with custom airplane markers rotated by heading
- **Click a flight** to highlight its route, draw origin→destination polyline, and open the detail panel
- **Search** by callsign or flight number (debounced)
- **Filter** by status, origin, and destination airport
- **KPI cards** — total, active, delayed, arrived, cancelled, boarding counts
- **Dark / Light mode** toggle — switches map tiles and the full UI theme
- **Responsive** — sidebar collapses to a drawer on smaller screens

---

## Routes

| Path | Page |
|------|------|
| `/dashboard` | Main operations view |
| `/flight/:id` | Full flight detail page |

---

## Mock Data

The app uses 20 fictional flights across real airports — DEL, BOM, BLR, MAA, HYD, CCU, DXB, SIN, LHR, JFK, CDG, NRT and more. No backend is required.

---

## Testing

Unit tests cover the core service logic and key components:

```bash
npm test
```

- `FlightService` — filter logic, KPI computation, selection state
- `ThemeService` — toggle behavior
- `StatusBadgeComponent` — correct CSS class per status
- Component creation tests for Dashboard, Sidebar, FlightDetail
