import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    isAdmin = false;
    constructor(
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const roleUser = this.authService.getRole();
        const userName = this.authService.getUser();

        if (!userName) {
            this.authService.logout();
            return false;
        }

        const roles = route.data.roles;

        if (roles.indexOf(roleUser) !== -1) {
            return true;
        } else {
            this.authService.redirectToDefaultPage();
            return false;
        }
    }
    
}