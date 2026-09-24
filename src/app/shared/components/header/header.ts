import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ThemeService } from '../../../core/services/theme';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentTime = '';
  isDark = true;
  private timeSub?: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDark = this.themeService.isDark;
    this.updateTime();
    this.timeSub = interval(1000).subscribe(() => this.updateTime());
    this.themeService.isDark$.subscribe((v) => (this.isDark = v));
  }

  ngOnDestroy(): void {
    this.timeSub?.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toUTCString().split(' ').slice(4, 5)[0] + ' UTC';
  }
}
