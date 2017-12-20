import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {BoardroomService} from '../../Service/boardroom.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-modify-room',
  templateUrl: './modify-room.component.html'
})
export class ModifyRoomComponent {
  constructor(private roomService: BoardroomService,
              private router: Router) {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
  }
  onsubmit() {
    this.roomService.updateRoom($('#roomnum').val(), $('#maxcap').val(),
      $('#projector').val(), $('#available').val()).subscribe(
      room => {
        if (room['code'] === 0) {
          alert('修改成功');
          window.location.reload();
        }
      }
    );
  }
}
