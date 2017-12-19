import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../Service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validateForm: FormGroup;

  code: number;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private userservice: UserService) {
    this.validateForm = fb.group({
      userid: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: ['']
    });
  }

  onsubmit() {
    if (this.validateForm.valid) {
      this.userservice.validateLogin(this.validateForm.controls['userid'].value,
                                      this.validateForm.controls['password'].value).subscribe(data => {
        if (data['code'] === 0) {
          if (data['data'] === 'user') {
            localStorage.setItem('user', this.validateForm.controls['userid'].value);
            this.router.navigate(['/index']);
          } else if (data['data'] === 'admin') {
            localStorage.setItem('user', this.validateForm.controls['userid'].value);
            this.router.navigate(['/admin']);
          }
        } else if (data['code'] === 1) {
          alert('用户不存在');
          this.resetForm();
        } else if (data['code'] === 2) {
          alert('密码错误');
          this.resetForm();
        }
      });
    }
  }
  /**
   * 重置登录表单
   * */
  resetForm() {
    this.validateForm.reset();
  }
}
