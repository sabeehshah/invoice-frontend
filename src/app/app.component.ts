import { Component, OnInit } from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'invoice-app';

  isLoggedIn = false;
  username?: string;

  constructor(private tokenStorageService:TokenStorageService){

  }

  ngOnInit():void{
    
    document.addEventListener('DOMContentLoaded',function(){
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.username = user
    }
  }

  logout():void{
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}


