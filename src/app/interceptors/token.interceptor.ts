import { Injectable } from '@angular/core';
import {
    HttpRequest, HttpHandler,
    HttpInterceptor, HttpErrorResponse,
    HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    isRefreshingToken = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        // private _toastr: ToastrService,
        private _authService: AuthService) {
        console.log('interceptor');
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
        | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

        const token = this._authService.getToken();

        request = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + token)
        });

        return next.handle(request).pipe(
            tap((resp: any) => {
                if (resp.headers) {
                    const newToken = resp.headers.get('token');

                    if (newToken) {
                        localStorage.setItem('token', newToken);
                    }
                }
            }),
            catchError((error) => {
                return this.handleAuthError(error);
            })
        );
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            this._authService.logout();
            //  this._toastr.error('Invalid username or password');
        }
        if (err.status === 403) {
            alert('No tiene permisos para realizar esta operacion');
        }

        return throwError(err);
    }
}
