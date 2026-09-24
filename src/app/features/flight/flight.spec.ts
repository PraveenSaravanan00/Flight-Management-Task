import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightMapComponent } from './flight';

describe('FlightMapComponent', () => {
  let component: FlightMapComponent;
  let fixture: ComponentFixture<FlightMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightMapComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
