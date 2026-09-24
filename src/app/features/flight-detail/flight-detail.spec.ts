import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightDetailComponent } from './flight-detail';
import { RouterModule } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('FlightDetailComponent', () => {
  let component: FlightDetailComponent;
  let fixture: ComponentFixture<FlightDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightDetailComponent, RouterModule.forRoot([])],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isPage should be false when no route param', () => {
    expect(component.isPage).toBeFalsy();
  });

  it('flight should be null initially (no selection)', () => {
    expect(component.flight).toBeNull();
  });
});
