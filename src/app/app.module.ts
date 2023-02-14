import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './auth/pages/register/register.component';
import { AuthInterceptor } from './helper/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
