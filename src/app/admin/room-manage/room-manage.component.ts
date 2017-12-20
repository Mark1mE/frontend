import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Record} from '../../domain/record';
import {Boardroom} from '../../domain/boardroom';
import {BoardroomService} from '../../Service/boardroom.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html'
})
export class RoomManageComponent {
  private userid: string;
  private record: Boardroom[];
  private keywords: string;
  private keywordFilter: FormControl = new FormControl();

  constructor(private router: Router,
               private boardroomService: BoardroomService) {
    if (localStorage.getItem('user')) {
      this.userid = localStorage.getItem('user');
      boardroomService.getAllRooms().subscribe(rooms => {
        this.record = rooms['data'];
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
  deleteroom(roomnum: string) {
    this.boardroomService.deleteRoom(roomnum).subscribe(room => {
      if (room['code'] === 0) {
        alert('已成功删除' + roomnum + '会议室');
        window.location.reload();
      }
    });
  }
  editInfo(room: Boardroom) {
    $('#roomnum').val(room['roomnum']);
    $('#maxcap').val(room['maxcap']);
    $('#projector').val(room['projector']);
    $('#available').val(room['available']);
  }
}
