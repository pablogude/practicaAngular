import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private localStorage: LocalStorageService, 
    private route: Router
  ) { }

  ngOnInit(): void {

  }

  public cerrarSesion() {
    if(localStorage) {
      this.localStorage.removeToken(); 
      this.route.navigate(["/login"]);
    }
   
  }

}
