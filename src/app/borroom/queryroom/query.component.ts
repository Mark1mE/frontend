import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BoardroomService} from '../../Service/boardroom.service';
import {RecordService} from '../../Service/record.service';
import {Record} from '../../domain/record';
import {Boardroom} from '../../domain/boardroom';
import {Router} from '@angular/router';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryRoomComponent {
  roomnum;
  room: Boardroom[];
  record: Record[];
  boardroom: Boardroom;
  queryForm: FormGroup;
  roomdetail: string;
  userid = localStorage.getItem('user');
  constructor(private fb: FormBuilder,
               private boardroomService: BoardroomService,
               private recordService: RecordService,
               private router: Router) {
    if (localStorage.getItem('user')) {
      this.queryForm = fb.group({
        roomnum: [''],
        starttime: ['']
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
  chooseroom() {
    this.boardroomService.getAllRooms().subscribe(rooms => {
      this.room = rooms['data'];
    });
  }
  roomclick(room: string) {
    this.roomnum = room;
    $('#dropdownMenu1').html(room);
    this.boardroomService.getRoomDetail(this.roomnum).subscribe(records => {
      this.boardroom = records['data'];
      this.roomdetail = '▶最大容纳人数：' + this.boardroom['maxcap']
        + '▶是否有投影仪：' + this.boardroom['projector']
        + '▶是否允许使用：' + this.boardroom['available'];
    });
  }
  onsubmit() {
    console.log(this.queryForm.controls['starttime'].value);
    this.recordService.queryRecords(this.roomnum,
      this.queryForm.controls['starttime'].value).subscribe(records => {
        this.record = records['data'];
        console.log(records);
    });
  }
}
