import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Record} from '../../domain/record';
import {RecordService} from '../../Service/record.service';
import {DateFormatService} from '../../Service/dateFormat.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-record-manage',
  templateUrl: './record-manage.component.html'
})
export class RecordManageComponent {
  private userid: string;
  private record: Record[];
  private keywords: string;
  private keywordFilter: FormControl = new FormControl();

  constructor(private recordService: RecordService,
              private router: Router,
              private dateFormat: DateFormatService) {
    if (localStorage.getItem('user')) {
      this.userid = localStorage.getItem('user');
      recordService.getAllRecords().subscribe(records => {
        this.record = records['data'];
      });
      this.keywordFilter.valueChanges.debounceTime(500).subscribe(value => this.keywords = value);
    } else {
      this.router.navigate(['/login']);
    }
  }
  choice(option: string) {
    $('#choices').html(option);
  }
  allorder() {
    this.recordService.getAllRecords().subscribe(records => {
      this.record = records['data'];
    });
  }
  pass() {
    this.recordService.allRecordsPass().subscribe(records => {
      this.record = records['data'];
    });
  }
  review() {
    this.recordService.allRecordsReview().subscribe(records => {
      this.record = records['data'];
    });
  }
  reject() {
    this.recordService.allRecordsReject().subscribe(records => {
      this.record = records['data'];
    });
  }
  passorder(id: number) {
    this.recordService.makeRecordPass(id).subscribe( records => {
      if (records['code'] === 0) {
        alert('预约已通过');
        window.location.reload();
      }
    });
  }
  rejectorder(id: number) {
    this.recordService.makeRecordReject(id).subscribe( records => {
      if (records['code'] === 0) {
        alert('预约已驳回');
        window.location.reload();
      }
    });
  }
  editInfo(record: Record) {
    $('#userid').val(record['userid']);
    $('#recordid').html(record['id']);
    $('#roomnum').val(record['roomnum']);
    $('#starttime').val(this.dateFormat.dateFormat(record['starttime']));
    $('#endtime').val(this.dateFormat.dateFormat(record['endtime']));
    $('#usereason').val(record['usereason']);
  }
}
