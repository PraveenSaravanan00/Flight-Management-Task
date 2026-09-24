import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styles: [`
    :host { display: block; height: 100vh; }
  `]
})
export class App implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.init();
  }
}
