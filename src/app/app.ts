import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/Auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('website');

  isMenuOpen: boolean = false;

  // Flips the menu open/closed when clicking the hamburger
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Closes the menu automatically when a user clicks a link
  closeMenu() {
    this.isMenuOpen = false;
  }

   constructor(public authService: AuthService) {}
}
