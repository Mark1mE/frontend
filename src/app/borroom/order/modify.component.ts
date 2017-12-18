import {Component, Input} from '@angular/core';
import {RecordService} from '../../Service/record.service';
import {Router} from '@angular/router';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-order-modify',
  templateUrl: './modify.component.html'
})
export class ModifyComponent {
  constructor(private recordService: RecordService,
              private router: Router) {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
  }
  onsubmit() {
    /*console.log($('#recordid').text());
    console.log($('#starttime').val());
    console.log($('#usereason').val());
    console.log($('#roomnum').val());*/
    this.recordService.updateRecords($('#recordid').text(), $('#roomnum').val(),
      $('#starttime').val(), $('#endtime').val(), $('#usereason').val()).subscribe(
      record => {
        if (record['code'] === 0) {
          alert('修改成功');
          window.location.reload();
        }
      }
    );
  }
}
