import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  formError: string;
  user: User = {};

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private localStorage: LocalStorageService,
    private route: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('My App - Login Page');

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public formSubmit() {

    this.submitted = true; 

    if (!this.loginForm.controls.email || !this.loginForm.controls.password) {
      return (this.formError = 'All fields are required');
    }
    if (!this.formError) {
      this.user.email = this.loginForm.controls.email.value;
      this.user.password = this.loginForm.controls.password.value;
      this.loginUser();
    }
  }

  loginUser = () => {


    this.userService.loginUser(this.user).subscribe(
      (res) => {
        this.userService.getUserById('1').subscribe(
          (res) => {
            this.user.id = res.data.id;
            this.user.first_name = res.data.first_name;
            this.user.last_name = res.data.last_name;
            this.user.email = res.data.email;
            this.user.avatar = res.data.avatar;

            this.localStorage.setToken(JSON.stringify(this.user));

            this.route.navigate(['/']);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  };

  onReset() {
    this.submitted = false; 
    this.loginForm.reset(); 
  }
}
