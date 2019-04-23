import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

import { User } from '../model/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersSercice {

  urlSercer = environment.urlServer + '/users';

  constructor(private http: HttpClient) {
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(this.urlSercer + '/signup', user);
  }

  getPage(page: number, size: number, sort: string): Observable<any> {
    const Gurl = `${this.urlSercer + '/getPage'}/?page=${page}&size=${size}&sort=${sort}`;
    // &search=${search}&category=${category};
    return this.http.get<any[]>(Gurl);
  }
}
