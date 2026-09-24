import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, ReactiveFormsModule],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filter form', () => {
    expect(component.filterForm).toBeDefined();
    expect(component.filterForm.get('search')).toBeTruthy();
  });

  it('statusOptions should contain All and 5 statuses', () => {
    expect(component.statusOptions.length).toBe(6);
    expect(component.statusOptions[0].value).toBe('');
  });
});
