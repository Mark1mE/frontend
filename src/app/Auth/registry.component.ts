import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {equalValidator} from '../util/validators';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent {
  registryForm: FormGroup;

  constructor(private fb: FormBuilder,
                private http: HttpClient,
                private router: Router,
                private userservice: UserService) {
    this.registryForm = fb.group({
      userid: ['', Validators.required],
      confirmPassword: fb.group({
        password: ['', Validators.minLength(6)],
        reInputPassword: ['']
      }, {validator: equalValidator}),
      idnum: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      phone: ['', [Validators.minLength(11), Validators.maxLength(11)]],
      teacher: ['']
    });
  }
  onsubmit() {
    // console.log(this.registryForm.value);
    if (this.registryForm.valid) {
      this.userservice.registry(this.registryForm.controls['userid'].value,
                                  this.registryForm.controls['confirmPassword'].value['password'],
                                  this.registryForm.controls['idnum'].value,
                                  this.registryForm.controls['phone'].value,
                                  this.registryForm.controls['teacher'].value).subscribe(user => {
                                    alert(user['code']);
        if (user['code'] === 0) {
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
