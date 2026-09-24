import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiCardsComponent } from './kpi-cards';

describe('KpiCardsComponent', () => {
  let component: KpiCardsComponent;
  let fixture: ComponentFixture<KpiCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KpiCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 card definitions', () => {
    expect(component.cards.length).toBe(6);
  });

  it('stats$ should be defined after init', () => {
    expect(component.stats$).toBeDefined();
  });
});
