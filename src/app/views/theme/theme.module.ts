// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { TypographyComponent } from './typography.component';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersSercice } from '../../service/users.service';
import { TokenInterceptor } from '../../interceptors/token.interceptor';

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UsersSercice, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  declarations: [
    TypographyComponent
  ]
})
export class ThemeModule { }
