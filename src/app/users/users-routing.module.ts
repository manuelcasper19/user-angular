import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './pages/all/all.component';
import { EditComponent } from './pages/edit/edit.component';
import { RegisterComponent } from '../auth/pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'all', component: AllComponent},
      { path: 'edit/:id', component: RegisterComponent },  
      { path: 'delete/:id', component: AllComponent },    
      { path: '**', redirectTo: 'all'} 
    ]
 
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
