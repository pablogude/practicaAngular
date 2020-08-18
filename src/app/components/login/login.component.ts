import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formError: string;
  user: User = {};
 loginForm = new FormGroup({
    email: new FormControl(''), 
    password: new FormControl('')
  });

  constructor(
    private userService: UserService, 
    private localStorage: LocalStorageService, 
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  public formSubmit() {
    if(
      !this.loginForm.controls.email ||
      !this.loginForm.controls.password
    ) {
      return this.formError = "All fields are required";
    }
    if(!this.formError) {
      this.user.email = this.loginForm.controls.email.value; 
      this.user.password = this.loginForm.controls.password.value; 
      this.loginUser();
    } 
  }

  loginUser = () => {
    this.userService.loginUser(this.user).subscribe(res => {
      console.log("Yo soy tu gatita");
      this.userService.getUserById("1").subscribe(res => {
        this.user.id = res.data.id; 
        this.user.first_name = res.data.first_name; 
        this.user.last_name = res.data.last_name; 
        this.user.email = res.data.email; 
        this.user.avatar  = res.data.avatar; 

        this.localStorage.setToken(JSON.stringify(this.user));

        this.route.navigate(['/']);

      }, error => {
        console.log(error);
      })
    }, 
    error => {
      console.log(error);
    }); ;
  }

}
