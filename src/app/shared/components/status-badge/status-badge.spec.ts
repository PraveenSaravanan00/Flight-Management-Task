import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBadgeComponent } from './status-badge';
import { FlightStatus } from '../../../core/models/flight.model';

describe('StatusBadgeComponent', () => {
  let component: StatusBadgeComponent;
  let fixture: ComponentFixture<StatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBadgeComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(StatusBadgeComponent);
    component = fixture.componentInstance;
  });

  const statusCases: { status: FlightStatus; expectedClass: string }[] = [
    { status: 'Active',    expectedClass: 'status-bg-active'    },
    { status: 'Delayed',   expectedClass: 'status-bg-delayed'   },
    { status: 'Arrived',   expectedClass: 'status-bg-arrived'   },
    { status: 'Cancelled', expectedClass: 'status-bg-cancelled' },
    { status: 'Boarding',  expectedClass: 'status-bg-boarding'  },
  ];

  statusCases.forEach(({ status, expectedClass }) => {
    it(`should apply "${expectedClass}" class for status "${status}"`, () => {
      component.status = status;
      expect(component.badgeClass).toBe(expectedClass);
    });
  });

  it('should render status text in the template', () => {
    component.status = 'Active';
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Active');
  });
});
