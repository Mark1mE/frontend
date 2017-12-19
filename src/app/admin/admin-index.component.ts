import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.css']
})
export class AdminIndexComponent {
  private userid: string;

  constructor(private router: Router) {
    if (localStorage.getItem('user')) {
      this.userid = localStorage.getItem('user');
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    if (localStorage.getItem('user') != null) {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    } else {
      alert('未登录');
    }
  }
}
