import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(list: any[], filterField: string, keyword: string): any {
    if (!keyword) {
      return list;
    }
    return list.filter (item => {
      let fieldValue = item[filterField];
      if (filterField === 'starttime' || filterField === 'endtime') {
        fieldValue = new Date(fieldValue).toLocaleDateString().replace('/', '-').replace('/', '-')
          + ' ' + new Date(fieldValue).toTimeString().split(' ')[0];
      }
      return fieldValue.indexOf(keyword) >= 0;
    });
  }
}
