import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { VerificarDatosService } from '../../validator/verificar-datos.service';
import { ServicesService } from '../../services/services.service';
import { User } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  getErrorMsg( campo: string){
    return this.vdatosServices.getErrorMsg(campo, this.formlogin )
  }

  constructor( 
      private fb  : FormBuilder,
      private vdatosServices     : VerificarDatosService,
      private router             : Router,
      private authService : ServicesService
    
  ) { }

  ngOnInit(): void {
    this.formlogin.reset( 
      {
        email : "test2@test.com",
        password: "123456"
      }
    )
  }

  formlogin : FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.pattern(this.vdatosServices.emailPattern) ]],
    password: ['', [ Validators.required ]]

  }) 
  validarCampos( campo : string ): boolean {            
    return this.vdatosServices.validarCampoCorrecto( campo, this.formlogin)          
 }

 login(){
 
   
   if(this.formlogin.invalid){
     this.formlogin.markAllAsTouched();
     return;

   }
   const { email, password } = this.formlogin.value;
   this.authService.login( email, password )
       .subscribe( user => 
        this.router.navigateByUrl("/users")
       
          
       )
   
 }
}
