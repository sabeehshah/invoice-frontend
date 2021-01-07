import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;

  loading = false;
  success = false;

  durationInSeconds = 5;



  constructor(private fb: FormBuilder, private auth:AuthService,
    private snackBar:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.minLength(8),Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]]
    })
  }

  get username(){
    return this.signupForm.get('username');
  }

  get email(){
    return this.signupForm.get('email');
  }

  get password(){
    return this.signupForm.get('password');
  }
  
  signup(){
    this.loading = true;

    const formValue = this.signupForm.value;

    this.auth.signup(formValue.username,formValue.password,formValue.email).pipe(first()).subscribe(
      (data:HttpResponse<any>)=>{
        console.log(data)
        if(data.status == 200){
          this.snackBar.open("Congrats! You signed up successfully.","Close")
          this.router.navigate(['/login']);
        }
      },
      errors =>{
        this.loading = false
      })
  }


}


