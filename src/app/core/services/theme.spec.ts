import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to light mode', () => {
    expect(service.isDark).toBeFalsy();
  });

  it('toggle() should switch between light and dark', () => {
    service.toggle();
    expect(service.isDark).toBeTruthy();

    service.toggle();
    expect(service.isDark).toBeFalsy();
  });

  it('isDark$ observable emits the toggled value', () => new Promise<void>((resolve) => {
    let count = 0;
    service.isDark$.subscribe((v) => {
      count++;
      if (count === 1) { expect(v).toBeFalsy(); }
      if (count === 2) { expect(v).toBeTruthy(); resolve(); }
    });
    service.toggle();
  }));
});
