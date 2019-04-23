import { ToastrManager } from 'ng6-toastr-notifications';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

     title = 'Mensaje del sistema';

    constructor(public toastr: ToastrManager) {

    }

    success(body: string) {
         this.toastr.successToastr(body, this.title);
    }

    error(body: string) {
         this.toastr.errorToastr( body, this.title );
    }

    info(body: string) {
         this.toastr.infoToastr(body, this.title );
    }
}
