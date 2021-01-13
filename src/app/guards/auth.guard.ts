import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  path:ActivatedRouteSnapshot[];
  route:ActivatedRouteSnapshot;


  constructor(private token:TokenStorageService, private router:Router){}

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url:string = state.url;
    return this.checkLogin(url);
  }

  async checkLogin(url:string):Promise<boolean>{
    return new Promise(resolve =>{
      if(this.token.getToken()){
        console.log('exists')
        resolve(true)
      }else{
        console.log('doesnt exist')
        resolve(false);
        this.token.signOut();
        this.router.navigate(['/login']);
        
      }
    })
  }
  
}
