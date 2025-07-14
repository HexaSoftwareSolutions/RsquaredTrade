import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface FooterLink {
  label: string;
  route: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
}
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() companyName: string = 'Your Company';
  @Input() companyDescription: string = 'Your company description goes here. We provide excellent services and solutions for your business needs.';
  @Input() logoUrl: string = '';
  @Input() quickLinks: FooterLink[] = [];
  @Input() services: FooterLink[] = [];
  @Input() bottomLinks: FooterLink[] = [];
  @Input() socialLinks: SocialLink[] = [];
  @Input() contactInfo: ContactInfo = {};
  @Input() showNewsletter: boolean = true;

  @Output() newsletterSubmit = new EventEmitter<string>();

  newsletterEmail: string = '';
  currentYear: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    // Set default links if none provided
    if (this.quickLinks.length === 0) {
      this.quickLinks = [
        { label: 'Home', route: '/' },
        { label: 'About Us', route: '/about' },
        { label: 'Services', route: '/services' },
        { label: 'Contact', route: '/contact' }
      ];
    }

    if (this.services.length === 0) {
      this.services = [
        { label: 'Web Development', route: '/services/web-development' },
        { label: 'Mobile Apps', route: '/services/mobile-apps' },
        { label: 'Consulting', route: '/services/consulting' },
        { label: 'Support', route: '/services/support' }
      ];
    }

    if (this.bottomLinks.length === 0) {
      this.bottomLinks = [
        { label: 'Privacy Policy', route: '/privacy' },
        { label: 'Terms of Service', route: '/terms' },
        { label: 'Cookie Policy', route: '/cookies' }
      ];
    }

    if (this.socialLinks.length === 0) {
      this.socialLinks = [
        { label: 'Facebook', url: 'https://facebook.com', icon: 'fab fa-facebook-f' },
        { label: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter' },
        { label: 'LinkedIn', url: 'https://linkedin.com', icon: 'fab fa-linkedin-in' },
        { label: 'Instagram', url: 'https://instagram.com', icon: 'fab fa-instagram' }
      ];
    }

    if (Object.keys(this.contactInfo).length === 0) {
      this.contactInfo = {
        address: '123 Business Street, City, State 12345',
        phone: '+1 (555) 123-4567',
        email: 'info@yourcompany.com'
      };
    }
  }

  onNewsletterSubmit(): void {
    if (this.newsletterEmail && this.isValidEmail(this.newsletterEmail)) {
      this.newsletterSubmit.emit(this.newsletterEmail);
      this.newsletterEmail = '';
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
