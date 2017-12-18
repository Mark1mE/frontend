import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }),
  withCredentials: true
};


@Injectable()
export class RecordService {

  constructor(private http: HttpClient) {}

  getRecords(userid: string): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8080/records/userid/' + userid);
  }

  addRecords(userid: string, roomnum: string, starttime: string, endtime: string, usereason: string) {
    const params = new HttpParams().set('userid', userid).set('roomnum', roomnum)
      .set('starttime', starttime.replace('T',' '))
      .set('endtime', endtime.replace('T',' '))
      .set('usereason', usereason)
      .set('createtime', new Date().toLocaleDateString().replace('/', '-').replace('/', '-')
        + ' ' + new Date().toTimeString().split(' ')[0])
      .set('status', '2');
    return this.http.post<any>('http://127.0.0.1:8080/records', params);
  }

  updateRecords(id: string, roomnum: string, starttime: string, endtime: string, usereason: string) {
    const params = new HttpParams().set('id', id).set('userid', localStorage.getItem('user')).set('roomnum', roomnum)
      .set('starttime', starttime)
      .set('endtime', endtime)
      .set('usereason', usereason)
      .set('createtime', new Date().toLocaleDateString().replace('/', '-').replace('/', '-')
        + ' ' + new Date().toTimeString().split(' ')[0])
      .set('status', '2');
    return this.http.put<any>('http://127.0.0.1:8080/records', params);
  }

  queryRecords(roomnum: string, starttime: string) {
    console.log(starttime + ' 00:00:00');
    const params = new HttpParams().set('roomnum', roomnum)
      .set('starttime', starttime + ' 00:00:00');
    return this.http.post<any>('http://127.0.0.1:8080/records/query', params);
  }

  passRecords(userid: string): Observable<any> {
    const params = new HttpParams().set('userid', userid).set('status', '1');
    return this.http.post<any>('http://127.0.0.1:8080/records/userid/status', params);
  }

  reviewRecords(userid: string): Observable<any> {
    const params = new HttpParams().set('userid', userid).set('status', '2');
    return this.http.post<any>('http://127.0.0.1:8080/records/userid/status', params);
  }

  rejectRecords(userid: string): Observable<any> {
    const params = new HttpParams().set('userid', userid).set('status', '3');
    return this.http.post<any>('http://127.0.0.1:8080/records/userid/status', params);
  }

  deleteRecord(id: number): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8080/records/' + id);
  }
}
