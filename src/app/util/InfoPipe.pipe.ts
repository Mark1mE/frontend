import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'infoPipe'
})
export class InfoPipePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value === 1) {
      return '通过';
    } else if (value === 2) {
      return '审核中';
    } else if (value === 3) {
      return '驳回';
    }
  }
}
