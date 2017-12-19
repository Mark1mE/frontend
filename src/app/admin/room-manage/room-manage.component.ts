import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html'
})
export class RoomManageComponent {
  private userid: string;

  constructor(private router: Router) {
    if (localStorage.getItem('user')) {
      this.userid = localStorage.getItem('user');
    } else {
      this.router.navigate(['/login']);
    }
  }
}
