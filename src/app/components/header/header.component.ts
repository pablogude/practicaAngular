import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    private localStorage: LocalStorageService, 
    private route: Router
  ) { }

  ngOnInit(): void {

    if (localStorage.getItem("--token-Users&Posts") != null) {
      this.isLoggedIn = true; 
      console.log("isLoggedIn", this.isLoggedIn);
    } else {
      console.log("isLoggedIn", this.isLoggedIn);
    }

  }

  public cerrarSesion() {
    if(localStorage) {
      this.localStorage.removeToken(); 
      this.route.navigate(["/login"]);
    }
   
  }

}
