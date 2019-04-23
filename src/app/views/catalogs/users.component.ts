import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersSercice } from '../../service/users.service';
import { MustMatch } from '../../helpers/MustMatch.validator';
import { User } from '../../model/User';
import { Role } from '../../model/Role';
import { NotificationService } from '../../service/notification.service';


@Component({
  templateUrl: 'users.component.html'
})
export class UsuerComponent implements OnInit {

  registerUserFormGroup: FormGroup;

  /* pagination properties */
  currentPage = 0;
  sorting = 'id,desc';
  totalElements = 0;
  pageSize = 10;

  constructor(private _formBuilder: FormBuilder, private _userService: UsersSercice, private _notification: NotificationService) { }

  ngOnInit(): void {
    this.registerUserFormGroup = this._formBuilder.group({
      nameControl: new FormControl('', Validators.required),
      userNameControl: new FormControl('', Validators.required),
      emailControl: new FormControl('', [Validators.required, Validators.email]),
      rolControl: new FormControl('', Validators.required),
      passwordControl: new FormControl('', Validators.required),
      newPasswordControl: new FormControl('', Validators.required)
    }, {
        validator: MustMatch('passwordControl', 'newPasswordControl')
      });
  }

  get f() { return this.registerUserFormGroup.controls; }

  onCancel() {
    this.registerUserFormGroup.reset('');
    this.registerUserFormGroup.controls['rolControl'].setValue('');
  }

  onSave() {
    const user = this.getUserObject();
    this._userService.save(user)
      .subscribe(
        result => {
          this._notification.success('El usuario se guardó con exito');
          this.onCancel();
        },
        error => {
          this._notification.error('Ha ocurrido un error al guardar el usuario');
          console.log(error);
        }
      );
  }

  getUserObject() {
    const user: User = new User();
    user.name = this.registerUserFormGroup.controls['nameControl'].value;
    user.username = this.registerUserFormGroup.controls['userNameControl'].value;
    user.email = this.registerUserFormGroup.controls['emailControl'].value;
    const roles: Role[] = [];
    roles.push(new Role(this.registerUserFormGroup.controls['rolControl'].value));
    user.roles = roles;
    user.password = this.registerUserFormGroup.controls['passwordControl'].value;

    return user;
  }


  getPage(page: number) {
    this._userService.getPage(page, this.pageSize, this.sorting)
      .subscribe(
        result => {

        },
        error => {

        }
      );
  }
}
