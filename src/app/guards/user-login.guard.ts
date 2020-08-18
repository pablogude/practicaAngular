import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserHelper } from '../helpers/user-helper';

@Injectable({
  providedIn: 'root',
})
export class UserLoginGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (UserHelper.isLoggedIn()) {
      console.log('No esta logeado');
      // this.router.navigateByUrl("/");
      alert('No puedes acceder a esta URL');
      return of(false);
    }
    console.log('Está logeado');
    return of(true);
  }
}
