import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  isDark$: Observable<boolean> = this.darkMode.asObservable();

  get isDark(): boolean {
    return this.darkMode.value;
  }

  toggle(): void {
    const next = !this.darkMode.value;
    this.darkMode.next(next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  init(): void {
    // Start in light mode — .dark class NOT added
  }
}
