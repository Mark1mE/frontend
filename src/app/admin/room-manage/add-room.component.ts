import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {BoardroomService} from '../../Service/boardroom.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html'
})
export class AddRoomComponent {
  constructor(private roomService: BoardroomService,
              private router: Router) {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
  }
  onsubmit() {
    this.roomService.addRoom($('#add-roomnum').val(), $('#add-maxcap').val(),
      $('#add-projector').val(), $('#add-available').val()).subscribe(
      room => {
        if (room['code'] === 0) {
          alert('添加成功');
          window.location.reload();
        }
      }
    );
  }
}
