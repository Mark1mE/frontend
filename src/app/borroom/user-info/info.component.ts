import {Component} from '@angular/core';
import {UserService} from '../../Service/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-user-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class UserInfoComponent {
  userid;
  password;
  phone;
  teacher;
  constructor(private userService: UserService,
              private router: Router) {
    if (localStorage.getItem('user')) {
      this.userid = localStorage.getItem('user');
      this.userService.getUser(this.userid).subscribe(user => {
        this.password = user['data']['password'];
        this.phone = user['data']['phone'];
        this.teacher = user['data']['teacher'];
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
  onsubmit() {
      this.userService.updateUser(localStorage.getItem('user'),
        $('#password').val(), $('#phone').val(), $('#teacher').val()).subscribe(data => {
        if (data['code'] === 0) {
          alert('修改成功');
        }
      });
  }
}
