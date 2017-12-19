import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../domain/user';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }),
    withCredentials: true
  };


@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://127.0.0.1:8080/users');
    }

    getUser(userid: string): Observable<any> {
        return this.http.get<User>('http://127.0.0.1:8080/users/' + userid);
    }

    updateUser(userid: string, password: string, phone: string, teacher: string): Observable<any> {
      const userinfo = new HttpParams().set('userid', userid)
        .set('password', password)
        .set('phone', phone)
        .set('teacher', teacher)
        .set('isadmin', '0');
        return this.http.put('http://127.0.0.1:8080/users', userinfo);
    }

    registry(userid: string, password: string, idnum: string, phone: string, teacher: string): Observable<any> {
        const userinfo = new HttpParams().set('userid', userid)
                                         .set('password', password)
                                         .set('phone', phone)
                                         .set('teacher', teacher)
                                         .set('isadmin', '0')
                                         .set('idnum', idnum);
        return this.http.post('http://127.0.0.1:8080/registry', userinfo, httpOptions);
    }

    validateLogin(userid: string, password: string): Observable<any> {
        const userinfo = new HttpParams().set('userid', userid).set('password', password);
        return this.http.post('http://127.0.0.1:8080/login', userinfo);
    }

    /*isadmin(userid: string): Observable<any> {
      return this.http.get<User>('http://127.0.0.1:8080/users/isadmin/' + userid);
    }*/
    /*
    isLogin(): Observable<any> {
      return this.http.get<any>('http://127.0.0.1:8080/isLogin');
    }
    */

}
