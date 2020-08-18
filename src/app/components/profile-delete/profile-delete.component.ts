import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.scss']
})
export class ProfileDeleteComponent implements OnInit {

  u: User = {};

  constructor(
    private localStorage: LocalStorageService,
    private userService: UserService, 
    private route: Router, 
    private location: Location
  ) {
    
   }

  ngOnInit(): void {
    this.u = JSON.parse(this.localStorage.getToken());  
  }

  deleteUser = () => {
    this.userService.deleteUser(`${this.u.id}`).subscribe(res => {
      console.log("RES", res);
      this.localStorage.removeToken(); 
      this.route.navigate(['/register'])
    }); 
  }

  back = () => {
    this.location.back();

  }

}
