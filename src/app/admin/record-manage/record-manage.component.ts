import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-record-manage',
  templateUrl: './record-manage.component.html'
})
export class RecordManageComponent {
  private userid: string;

  constructor(private router: Router) {
    if (localStorage.getItem('user')) {
      this.userid = localStorage.getItem('user');
    } else {
      this.router.navigate(['/login']);
    }
  }
}
