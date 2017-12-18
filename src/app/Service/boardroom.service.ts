import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {User} from '../domain/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }),
  withCredentials: true
};

@Injectable()
export class BoardroomService {

  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8080/boardrooms');
  }

  getRoomDetail(roomnum: string): Observable<any> {
    return this.http.get<User>('http://127.0.0.1:8080/boardrooms/' + roomnum);
  }

}
