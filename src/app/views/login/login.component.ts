import { Component, OnInit } from '@angular/core';
import { Login } from '../../model/Login';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {

  }

  login() {
    const login = new Login();
    login.usernameOrEmail = 'admin';
    login.password = '123';

    return this._authService.login(login)
      .subscribe((data) => {
        const authToken = data;

        if (authToken === null) {
          alert('Invalid username or password');
        } else {
          this._authService.setToken(authToken.toString());
          this._router.navigate(['/dashboard']);
        }
      }, (err) => alert('Invalid username or password'));
  }

 }
