import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmailDisponible } from '../interfaces/auth.interface';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmailDisponibleService implements AsyncValidator{
  private _urlEndPoint         :   string   = environment.baseUrlAuth;
  constructor( private http: HttpClient ) { }
  validate(control: AbstractControl):  Observable<ValidationErrors | null> {
    const email = control.value;
   
    const url  = `${ this._urlEndPoint }/api/v1/find/${ email }`
 
    return this.http.get<EmailDisponible>(url)
           .pipe(
             
             map( resp => {
    
               return ( resp.ok === true)
               ? null
               : { emailTomado : true}
             })
           )
  }
}
