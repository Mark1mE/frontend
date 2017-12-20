import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../Service/user.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {
  constructor(private userService: UserService,
              private router: Router) {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
  }
  onsubmit() {
    this.userService.addUser($('#add-userid').val(), $('#add-password').val(),
      $('#add-phone').val(), $('#add-teacher').val(), $('#add-isadmin').val()).subscribe(
      user => {
        if (user['code'] === 0) {
          alert('添加成功');
          window.location.reload();
        }
      }
    );
  }
}
