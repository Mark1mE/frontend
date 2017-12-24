import {FormControl, FormGroup} from '@angular/forms';

export function equalValidator(group: FormGroup): any {
  let password: FormControl = group.get('password') as FormControl;
  let pconfirm: FormControl = group.get('reInputPassword') as FormControl;
  let valid: boolean = (password.value === pconfirm.value);
  console.log('密码' + valid);
  return valid ? null : { equal: {descpw: '密码和确认密码不匹配'} };
}

