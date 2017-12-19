import {Component} from '@angular/core';
import {Record} from '../../domain/record';
import {RecordService} from '../../Service/record.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';
import {DateFormatService} from '../../Service/dateFormat.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent {
  record: Record[];
  private keywords: string;
  private keywordFilter: FormControl = new FormControl();
  constructor(private recordService: RecordService,
              private router: Router,
              private dateFormat: DateFormatService) {
    if (localStorage.getItem('user')) {
      recordService.getRecords(localStorage.getItem('user')).subscribe(records => {
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
    this.recordService.getRecords(localStorage.getItem('user')).subscribe(records => {
      this.record = records['data'];
    });
  }
  pass() {
    this.recordService.passRecords(localStorage.getItem('user')).subscribe(records => {
      this.record = records['data'];
    });
  }
  review() {
    this.recordService.reviewRecords(localStorage.getItem('user')).subscribe(records => {
      this.record = records['data']
      console.log(this.record);
    });
  }
  reject() {
    this.recordService.rejectRecords(localStorage.getItem('user')).subscribe(records => {
      this.record = records['data'];
    });
  }
  deleteorder(id: number) {
    this.recordService.deleteRecord(id).subscribe(records => {
      console.log(records['code']);
      if (records['code'] === 0) {
        alert('删除成功');
        window.location.reload();
      }
    });
  }
  editInfo(record: Record) {
    $('#recordid').html(record['id']);
    $('#roomnum').val(record['roomnum']);
    $('#starttime').val(this.dateFormat.dateFormat(record['starttime']));
    $('#endtime').val(this.dateFormat.dateFormat(record['endtime']));
    $('#usereason').val(record['usereason']);
  }
}
