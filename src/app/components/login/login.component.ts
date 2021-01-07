import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loading = false;
  success = false;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private cookieService:CookieService,
    private tokenStorage:TokenStorageService,
    private snackbar:MatSnackBar,
    private router:Router
    ) { }

  ngOnInit(): void {

    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

   login() {
    this.loading = true;

    const formValue = this.loginForm.value;


    this.auth.login(formValue.email, formValue.password).pipe(first()).subscribe(
      (data: HttpResponse<any>) => {
        if(data.status == 200){
          this.tokenStorage.saveToken(data.headers.get('authorization'));
          this.tokenStorage.saveUser(data.body.username)

          this.snackbar.open("Login Success","close",{duration:5000})
          this.router.navigate(['/']).then(()=>{
            window.location.reload()
          })
          
        }
       
      },
      errors => {
        
        this.loading = false;
        this.snackbar.open("Login Fail","close",{duration:5000})
        this.isLoginFailed = true;
        console.log(errors)

      });
  }

}


