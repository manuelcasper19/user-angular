import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../auth/services/services.service';
import { User } from '../../../auth/interfaces/auth.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  users : User [] = [] ;

  constructor( private servicesService : ServicesService, 
               private router : Router,
               private activateRouter    : ActivatedRoute) { }

  ngOnInit(): void {
    if( this.router.url.includes('delete')){
      this.activateRouter.params
      .pipe(
        switchMap( ({ id })=> this.servicesService.deleteUser( id ))
      ).subscribe(
        
        user => {
          Swal.fire(`usuario ${ user.fullName } borrado correctamente`)
          this.router.navigateByUrl('/users')
        }
      )
    }

    this.servicesService.listAll()
    .subscribe( user => this.users = user )

    
  }

  

  
}
