import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_URL = environment.baseUrl
const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) {}

  private handleError(error:HttpErrorResponse):any{
    if(error.error instanceof ErrorEvent){
      console.error('An error occurred:',error.error.message)
    }else{
      console.error(
        `Backend returned code ${error.status},` + `body was: ${error.error}`);
    }

    return throwError(
      'Something bad happened; please try again later.'
    );
  }

  login(email:string,password:string):Observable<any>{
    return this.httpClient.post<any>(base_URL+'login',{username:email,password:password},
    {observe:'response' as 'body'}).pipe(map(user=>{
      return user;
    }));
  }

  signup(username:string,password:string,email:string):Observable<any>{
    return this.httpClient.post<any>(base_URL+'authenticate',
    {
      username:username,
      password:password,
      email:email
    },{observe:'response' as 'body'}).pipe(map(user=>{
      return user;
    }));
  }

}
