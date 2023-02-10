import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/auth.interface';
import { catchError, map, of, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private _urlAuth : string = environment.baseUrlAuth

  constructor( private http: HttpClient) { }


  register( email: string, fullName: string, password: string,   ){
    const body = { email, fullName,  password };
    const url = `${this._urlAuth}/api/v1/create`

    return this.peticionHttpAuth( url, body);

  }
  getUserById( id : number ){

    const url = `${this._urlAuth}/api/v1/findbyid/${ id }`;
    return this.http.get<User>( url)
           .pipe(
            map( user => user )
           )

  }

  getUserByEmail( email : string, password : string ){

    const url = `${this._urlAuth}/api/v1/find/${ email}`;
    return this.http.get<User>( url)
           .pipe(
            tap( resp => {
              console.log( resp );
              if( resp.password === password ){
                localStorage.setItem('email ',  resp.email! )
              }
            }),
            map( user => user ),
            catchError( err => of("Error de inicio de sesión"))
           )

  }

  listAll(){
    const url = `${this._urlAuth}/api/v1/all`
    return this.http.get<User[]>( url )
      .pipe( 
        map( user => user), 

        tap( user => user )
      )
  }
  edit(id: number, email: string, fullName: string, password: string){
    const body = { id, email, fullName,  password };

    const url = `${this._urlAuth}/api/v1/update`;
    return this.peticionHttpAuth( url, body);
  }

  deleteUser( id : number ){

    const url = `${this._urlAuth}/api/v1/delete/${ id }`;
    return this.http.delete<User>( url)
           .pipe(

            map( user => user )
           )

  }

  
  peticionHttpAuth ( url: string, body: User){
    return this.http.post<User>(url, body )
           .pipe( 
             tap( resp => {
               if(resp.token){
                 localStorage.setItem('token', resp.token!)
               }
             }),
             map( resp => resp ),
          
           )
  }
}
