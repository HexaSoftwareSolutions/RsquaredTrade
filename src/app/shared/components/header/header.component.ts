import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
export interface NavItem {
  label: string;
  link: string;
  icon?: string;
  exact?: boolean;
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  @Input() brandName: string = 'Your Brand';
  @Input() logoUrl: string = '';
  @Input() menuItems: any[] = [];
  @Input() showUserActions: boolean = true;
  @Input() isLoggedIn: boolean = false;
  @Input() userAvatar: string = '';
  @Input() userName: string = '';

  @Output() loginClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();
  @Output() settingsClick = new EventEmitter<void>();

  isMenuOpen: boolean = false;
  isUserMenuOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Set default menu items if none provided
    if (this.menuItems.length === 0) {
      this.menuItems = [
        { label: 'Home', link: '/', exact: true },
        { label: 'About', link: '/about' },
        { label: 'Services', link: '/services' },
        { label: 'Contact', link: '/contact' }
      ];
    }
  }

  get userInitials(): string {
    if (!this.userName) return 'U';
    return this.userName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  onLogin(): void {
    this.loginClick.emit();
  }

  onLogout(event: Event): void {
    event.preventDefault();
    this.isUserMenuOpen = false;
    this.logoutClick.emit();
  }

  onProfile(event: Event): void {
    event.preventDefault();
    this.isUserMenuOpen = false;
    this.profileClick.emit();
  }

  onSettings(event: Event): void {
    event.preventDefault();
    this.isUserMenuOpen = false;
    this.settingsClick.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Close user menu when clicking outside
    if (!target.closest('.user-profile')) {
      this.isUserMenuOpen = false;
    }

    // Close mobile menu when clicking outside
    if (!target.closest('.nav-container') && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // Close mobile menu on window resize
    if (window.innerWidth > 768) {
      this.isMenuOpen = false;
    }
  }
}
