import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formError: string; 
  user: User = {};
  private id: string;
  userForm = new FormGroup({
    email: new FormControl(''), 
    password: new FormControl(''), 
    confirm_password: new FormControl(''),
    first_name: new FormControl(''), 
    last_name: new FormControl(''), 
    avatar: new FormControl('')
  }); 

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public formSubmit() {
    if(
      !this.userForm.controls.email ||
      !this.userForm.controls.password
    ) {
      return this.formError = "All fields are required";
    }
    if(!this.formError) {
      this.user.email = this.userForm.controls.email.value; 
      this.user.password = this.userForm.controls.password.value; 
      this.registerUser();
    }
  }


  registerUser = () => {
    this.userService.addUser(this.user).subscribe(res => {
      console.log(res); 
    }); ;
  }
}
