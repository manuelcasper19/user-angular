import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicesService } from '../auth/services/services.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private service: ServicesService ) {}

  //Interceptamos el request para agregar el token y que se vuelva enviar al backend cuando se cambie de vista

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.service.getToken();
    if( token ){
      
      const clone = request.clone( 
        {
          headers: request.headers.set("Authorization", `Bearer ${ token}`)
        }
      )
    
      return next.handle(clone);
    }
    return next.handle(request);
  }
}
