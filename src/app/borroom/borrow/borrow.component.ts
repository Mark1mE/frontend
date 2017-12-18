import { Component } from '@angular/core';
import {BoardroomService} from '../../Service/boardroom.service';
import {Boardroom} from '../../domain/boardroom';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RecordService} from '../../Service/record.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css',
              '../../../assets/dropdownButton.css']
})
export class BorrowComponent {
  room: Boardroom[];
  roomnum;
  borrow: FormGroup;
  userid = localStorage.getItem('user');
  constructor(private boardroomService: BoardroomService,
               private fb: FormBuilder,
               private router: Router,
               private recordService: RecordService) {
    if (localStorage.getItem('user')) {
      this.borrow = fb.group({
        starttime: ['', [Validators.required]],
        endtime: ['', [Validators.required]],
        usereason: ['']
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
  }
  onsubmit() {
    if (this.borrow.valid) {
      this.recordService.addRecords(localStorage.getItem('user'),
                                     this.roomnum,
                                     this.borrow.controls['starttime'].value,
                                     this.borrow.controls['endtime'].value,
                                     this.borrow.controls['usereason'].value).subscribe(data => {
        if (data['code'] === 0 ) {
          alert('预约成功');
          this.resetBorrow();
        }
      });
    }
  }
  resetBorrow() {
    this.borrow.reset();
  }
}
