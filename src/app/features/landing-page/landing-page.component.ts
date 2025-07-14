import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
