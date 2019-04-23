import { Component, OnInit, HostListener } from '@angular/core';
import { Login } from '../../model/Login';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _notification: NotificationService) {
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      userNameControl: new FormControl('', Validators.required),
      passwordControl: new FormControl('', Validators.required)
    });
  }

  login() {
    const login = this.getObject();

    return this._authService.login(login)
      .subscribe((data) => {
        const authToken: any = data;

        if (authToken.accessToken === null) {
          this._notification.error('Username or password invalido');
        } else {
          this._authService.setToken(authToken.accessToken.toString());
          this._router.navigate(['/dashboard']);
        }
      }, (err) => {
        this._notification.error('Username or password invalido');
      });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      this.login();
    }
  }

  getObject() {
    const login = new Login();
    login.usernameOrEmail = this.loginForm.controls['userNameControl'].value;
    login.password = this.loginForm.controls['passwordControl'].value;

    return login;
  }

}
