import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard';
import { RouterModule } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, RouterModule.forRoot([])],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sidebarOpen should default to false', () => {
    expect(component.sidebarOpen).toBeFalsy();
  });

  it('toggleSidebar should flip sidebarOpen', () => {
    component.toggleSidebar();
    expect(component.sidebarOpen).toBeTruthy();

    component.toggleSidebar();
    expect(component.sidebarOpen).toBeFalsy();
  });
});
