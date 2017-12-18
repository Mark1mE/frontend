import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './aboutus.component.html'
})
export class AboutusComponent {
  constructor(private router: Router) {
    if (!localStorage.getItem('user')) {
        this.router.navigate(['/login']);
    }
  }
}
