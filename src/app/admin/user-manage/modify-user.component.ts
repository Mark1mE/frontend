import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../Service/user.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html'
})
export class ModifyUserComponent {
  constructor(private userService: UserService,
              private router: Router) {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
  }
  onsubmit() {
    this.userService.adminUpdateUser($('#userid').val(), $('#password').val(),
      $('#phone').val(), $('#teacher').val(), $('#isadmin').val()).subscribe(
      user => {
        if (user['code'] === 0) {
          alert('修改成功');
          window.location.reload();
        }
      }
    );
  }
}
