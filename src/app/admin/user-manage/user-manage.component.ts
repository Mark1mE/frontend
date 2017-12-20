import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../Service/user.service';
import {User} from '../../domain/user';
import {FormControl} from '@angular/forms';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html'
})
export class UserManageComponent {
  private userid: string;
  private record: User[];
  private keywords: string;
  private keywordFilter: FormControl = new FormControl();

  constructor(private router: Router,
              private userService: UserService) {
    if (localStorage.getItem('user')) {
      this.userid = localStorage.getItem('user');
      userService.getUsers().subscribe(users => {
        this.record = users['data'];
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
  deleteuser(userid: string) {
    this.userService.deleteUser(userid).subscribe(user => {
      if (user['code'] === 0) {
        alert('已成功删除:' + userid);
        window.location.reload();
      }
    });
  }
  editInfo(user: User) {
    $('#userid').val(user['userid']);
    $('#password').val(user['password']);
    $('#phone').val(user['phone']);
    $('#teacher').val(user['teacher']);
    $('#isadmin').val(user['isadmin']);
  }
}
