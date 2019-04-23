import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';
import { UserInfo } from '../model/UserInfo';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Login } from '../model/Login';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    serverUrl: string = environment.urlServer;
    decodedToken: any;
    helper = new JwtHelperService();
    userInfoBehaviour = new BehaviorSubject<UserInfo>(null);
    userInfo: UserInfo;

    constructor(private _router: Router, private http: HttpClient) {
        const token = this.getToken();
        this.setUserInfo(token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    setUserInfo(authToken: string) {
        if (authToken) {
            this.decodedToken = this.helper.decodeToken(authToken);
            this.userInfo = new UserInfo();
            this.userInfo.Role = this.decodedToken.role;
            this.userInfo.UserName = this.decodedToken.unique_name;
        } else {
            this.userInfo = null;
        }

        this.userInfoBehaviour.next(this.userInfo);
    }

    setToken(authToken: string) {
        if (!authToken) {
            localStorage.removeItem('token');
        } else {
            localStorage.setItem('token', authToken);
        }
    }

    login(pro: Login) {
        return this.http.post<Login>(this.serverUrl + '/auth/signin', pro);
    }

    logout() {
        this.setToken(null);
        this._router.navigate(['/login']);
    }
}
