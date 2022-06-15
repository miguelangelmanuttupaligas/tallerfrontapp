import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private loginService: ApiService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if (localStorage.getItem('user')) {
        //this.currentUser = JSON.parse(localStorage.getItem('user'));
        console.log("AQUI: ",localStorage.getItem('user'));
        const rol = JSON.parse(localStorage.getItem('user'))?.rol;
        console.log("ROL: ",rol);
        //const rol = 'usuario normal';
        if (rol == 'usuario normal' || rol == 'USER') {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      } else {
        this.router.navigate(['/login']);
        return false;
      }

  }
  
}
