import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    LoginComponent

   
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
   
   
  ]
})
export class AuthModule { }
