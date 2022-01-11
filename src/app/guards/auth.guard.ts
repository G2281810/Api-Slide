import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:ApiserviceService,private router:Router){

  }
  message:any;

  canActivate():boolean{
    if(!this.service.isAuth()){
      this.message = 'Necesitas iniciar sesión para coninuar';
      console.log('Necesitas iniciar sesión para ingresar');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
