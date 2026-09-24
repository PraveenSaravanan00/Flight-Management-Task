import {
  Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
import { FlightService } from '../../core/services/flight';
import { ThemeService } from '../../core/services/theme';
import { Flight, FlightStatus } from '../../core/models/flight.model';

const STATUS_COLORS: Record<FlightStatus, string> = {
  Active: '#22c55e', Delayed: '#f59e0b', Arrived: '#3b82f6',
  Cancelled: '#ef4444', Boarding: '#a855f7'
};

function createAirplaneIcon(status: FlightStatus, heading: number, selected = false): L.DivIcon {
  const color = STATUS_COLORS[status];
  const size = selected ? 36 : 28;
  const glow = selected ? `filter: drop-shadow(0 0 8px ${color});` : '';
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px; height:${size}px;
      display:flex; align-items:center; justify-content:center;
      transform: rotate(${heading}deg);
      transition: all 0.3s ease;
      ${glow}
    ">
      <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
      </svg>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function createAirportIcon(code: string): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div style="
      background: rgba(15,22,42,0.85);
      border: 2px solid #60a5fa;
      border-radius: 6px;
      padding: 3px 7px;
      font-size: 11px;
      font-weight: 700;
      color: #60a5fa;
      white-space: nowrap;
      font-family: 'JetBrains Mono', monospace;
      backdrop-filter: blur(4px);
    ">${code}</div>`,
    iconSize: [50, 24],
    iconAnchor: [25, 12],
  });
}

@Component({
  selector: 'app-flight-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight.html',
  styleUrl: './flight.css',
})
export class FlightMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;

  private map!: L.Map;
  private markers = new Map<string, L.Marker>();
  private routeLayer?: L.Polyline;
  private airportMarkers: L.Marker[] = [];
  private tileLayer!: L.TileLayer;
  private subs = new Subscription();
  private flights: Flight[] = [];
  private isDark = false;

  private readonly DARK_TILE  = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  private readonly LIGHT_TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  constructor(
    private flightService: FlightService,
    private themeService: ThemeService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => this.initMap());

    this.subs.add(
      this.flightService.filteredFlights$.subscribe((flights) => {
        this.flights = flights;
        this.ngZone.runOutsideAngular(() => this.renderMarkers(flights));
      })
    );

    this.subs.add(
      this.flightService.selectedFlight$.subscribe((flight) => {
        this.ngZone.runOutsideAngular(() => this.onFlightSelected(flight));
      })
    );

    this.subs.add(
      this.themeService.isDark$.subscribe((dark) => {
        this.isDark = dark;
        this.ngZone.runOutsideAngular(() => this.switchTile(dark));
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (this.map) this.map.remove();
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [25, 55],
      zoom: 4,
      zoomControl: true,
      attributionControl: false,
    });

    this.tileLayer = L.tileLayer(this.LIGHT_TILE, { maxZoom: 18, subdomains: 'abc' });
    this.tileLayer.addTo(this.map);

    L.control.attribution({ prefix: false }).addTo(this.map);

    this.map.on('click', () => {
      this.ngZone.run(() => this.flightService.selectFlight(null));
    });
  }

  private renderMarkers(flights: Flight[]): void {
    const currentIds = new Set(flights.map((f) => f.id));
    this.markers.forEach((marker, id) => {
      if (!currentIds.has(id)) { marker.remove(); this.markers.delete(id); }
    });

    flights.forEach((flight) => {
      const existing = this.markers.get(flight.id);
      const icon = createAirplaneIcon(flight.status, flight.heading);
      const popup = this.buildPopup(flight);

      if (existing) {
        existing.setIcon(icon);
        existing.setPopupContent(popup);
      } else {
        const marker = L.marker([flight.currentLat, flight.currentLng], { icon })
          .bindPopup(popup, { closeButton: false, maxWidth: 250 });
        marker.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          this.ngZone.run(() => this.flightService.selectFlight(flight));
        });
        marker.on('mouseover', () => marker.openPopup());
        marker.on('mouseout', () => marker.closePopup());
        marker.addTo(this.map);
        this.markers.set(flight.id, marker);
      }
    });
  }

  private onFlightSelected(flight: Flight | null): void {
    this.flights.forEach((f) => {
      const m = this.markers.get(f.id);
      if (m) m.setIcon(createAirplaneIcon(f.status, f.heading, false));
    });

    this.routeLayer?.remove();
    this.airportMarkers.forEach((m) => m.remove());
    this.airportMarkers = [];

    if (!flight) return;

    const sel = this.markers.get(flight.id);
    if (sel) sel.setIcon(createAirplaneIcon(flight.status, flight.heading, true));

    const color = STATUS_COLORS[flight.status];
    this.routeLayer = L.polyline(
      [[flight.origin.lat, flight.origin.lng], [flight.destination.lat, flight.destination.lng]],
      { color, weight: 2.5, opacity: 0.85, dashArray: '10, 6', className: 'flight-route-active' }
    ).addTo(this.map);

    const oMarker = L.marker([flight.origin.lat, flight.origin.lng], {
      icon: createAirportIcon(flight.origin.code), zIndexOffset: 1000
    }).addTo(this.map);
    const dMarker = L.marker([flight.destination.lat, flight.destination.lng], {
      icon: createAirportIcon(flight.destination.code), zIndexOffset: 1000
    }).addTo(this.map);
    this.airportMarkers = [oMarker, dMarker];

    const bounds = L.latLngBounds([
      [flight.origin.lat, flight.origin.lng],
      [flight.currentLat, flight.currentLng],
      [flight.destination.lat, flight.destination.lng],
    ]);
    this.map.fitBounds(bounds, { padding: [60, 60], maxZoom: 7 });
  }

  private switchTile(dark: boolean): void {
    if (!this.map) return;
    this.tileLayer?.remove();
    this.tileLayer = L.tileLayer(dark ? this.DARK_TILE : this.LIGHT_TILE, {
      maxZoom: 18, subdomains: dark ? 'abcd' : 'abc'
    });
    this.tileLayer.addTo(this.map);
  }

  private buildPopup(flight: Flight): string {
    const color = STATUS_COLORS[flight.status];
    return `
      <div style="font-family:'Inter',sans-serif; min-width:200px; padding:4px;">
        <div style="font-size:15px;font-weight:700;color:var(--text-primary,#f1f5f9);margin-bottom:6px;">
          ${flight.flightNumber} &nbsp;
          <span style="font-size:11px;font-weight:600;background:${color}22;color:${color};padding:2px 8px;border-radius:12px;border:1px solid ${color}44;">
            ${flight.status}
          </span>
        </div>
        <div style="font-size:12px;color:var(--text-secondary,#94a3b8);margin-bottom:4px;">
          <i class="pi pi-tag"></i> ${flight.callsign} &nbsp;|&nbsp; ${flight.aircraftType}
        </div>
        <div style="font-size:13px;font-weight:600;color:var(--text-primary,#f1f5f9);">
          ${flight.origin.code} &rarr; ${flight.destination.code}
        </div>
        <div style="font-size:11px;color:var(--text-muted,#475569);margin-top:4px;">
          ${flight.origin.city} &rarr; ${flight.destination.city}
        </div>
        ${flight.status === 'Active' ? `
        <div style="font-size:11px;color:var(--text-muted,#475569);margin-top:6px;display:flex;gap:12px;">
          <span>Alt: ${flight.altitude.toLocaleString()}ft</span>
          <span>Spd: ${flight.speed}kts</span>
          <span>Hdg: ${flight.heading}°</span>
        </div>` : ''}
      </div>
    `;
  }
}
