import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailDisponibleService } from '../../validator/email-disponible.service';
import { VerificarDatosService } from '../../validator/verificar-datos.service';
import { ServicesService } from '../../services/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from '../../interfaces/auth.interface';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user! : User;
  hayId: boolean = false;

  constructor(
    private fb                 : FormBuilder,
    private emailServices      : EmailDisponibleService,
    private vdatosServices     : VerificarDatosService,
    private authService : ServicesService,
    private router            : Router,
    private activateRouter    : ActivatedRoute

  ) { }

  ngOnInit(): void {
    
    if(!this.router.url.includes('edit')){
      return;
    }
    this.formRegister.get('email')?.disable();
    this.activateRouter.params
    .pipe(
      switchMap( ({ id }) => this.authService.getUserById( id)),
     
      
    )
    .subscribe(
      user => {
        this.user = user;     
        this.hayId = true;        
        this.formRegister.reset( 
          {
            id            :  user.id,
            email         :  user.email,
            fullName      :  user.fullName,
            password      :  user.password,
            password2     :  user.password,
           
          }
        )
      }
     
    )
  }

  
  formRegister: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.pattern(this.vdatosServices.emailPattern) ], [this.emailServices]],
    fullName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.vdatosServices.nombrePattern)]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
    password2: ['', [ Validators.required]]
   },
   {
     validators: this.vdatosServices.validarPasswordIguales( 'password', 'password2') 
   }
   )
   getErrorMsg( campo: string){
    return this.vdatosServices.getErrorMsg(campo, this.formRegister )
  }
  validarCampos( campo: string ){
    return this.vdatosServices.validarCampoCorrecto( campo, this.formRegister )
  }
  save(){
    if(this.formRegister.invalid){
      this.formRegister.markAllAsTouched();
      return;

    }
  
    let email = this.formRegister.get('email')?.value;
    const { fullName, password  } = this.formRegister.value;
    if(!this.router.url.includes('edit')){   
    
    this.authService.register(email, fullName, password )
        .subscribe( user  => {
          if(user.id){
            Swal.fire(`User ${ user.fullName } creado exitosamente` );
            this.router.navigateByUrl('/users')
          }else {
            Swal.fire('Error!',  'No se pudo guardar el usuario');
          }
        })

      }else{
        this.authService.edit( this.user.id as number, email, fullName, password)
            .subscribe(user => {
              if( user.id ){
                Swal.fire(`User ${ user.fullName } actualizado exitosamente` );
                this.router.navigateByUrl('/users');
              }
            })

      }
  }

}
