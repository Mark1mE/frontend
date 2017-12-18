import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

export function equalValidator(group: FormGroup): any {
  let password: FormControl = group.get('password') as FormControl;
  let pconfirm: FormControl = group.get('reInputPassword') as FormControl;
  let valid: boolean = (password.value === pconfirm.value);
  console.log('密码' + valid);
  return valid ? null : { equal: {desc: '密码和确认密码不匹配'} };
}

