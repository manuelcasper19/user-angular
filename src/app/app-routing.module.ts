import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helper/auth.guard';

const routes: Routes = [

    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)      

    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module').then( m => m.UsersModule),
      canActivate: [AuthGuard]      

    },
   
    {
      path: '**',
      redirectTo: 'auth'
    }
  ];


@NgModule({
  declarations: [],
  imports: [
   RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
