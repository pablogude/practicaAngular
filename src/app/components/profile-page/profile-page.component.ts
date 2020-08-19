import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { User } from 'src/app/models/user';
import { tokenName } from '@angular/compiler';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  public user: User = {};
  public u = {};

  constructor(
    private localStorage: LocalStorageService, 
    private title: Title
  ) { }

  ngOnInit(): void {

    this.title.setTitle("My Profile Page");
    
    if (localStorage.getItem("--token-Users&Posts") != null) {
      this.u = JSON.parse(this.localStorage.getToken()); 
      this.user = this.u;  
    }
    
  }

}
