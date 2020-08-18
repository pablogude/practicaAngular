import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { User } from 'src/app/models/user';
import { tokenName } from '@angular/compiler';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  public user: User = {};
  public u = {};

  constructor(
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    
    if (localStorage.getItem("--token-Users&Posts") != null) {
      console.log(this.localStorage.getToken());
      this.u = JSON.parse(this.localStorage.getToken()); 
      this.user = this.u; 
      console.log("UUUUUSER", this.user); 
    }
    
  }

}
