import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { from } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  formError: string;
  user: User = {};
  private id: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('My App - Register Page');

    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required],
      avatar: ['', [Validators.required]],
    });
  }

  public formSubmit() {
    if (!this.userForm.controls.email || !this.userForm.controls.password) {
      return (this.formError = 'All fields are required');
    }
    if (!this.formError) {
      this.user.email = this.userForm.controls.email.value;
      this.user.password = this.userForm.controls.password.value;
      
      this.submitted = true; 
      
      this.registerUser();
    }

    
  }

  registerUser = () => {
    this.userService.registerUser(this.user).subscribe((res) => {
      console.log('RES', res);
    });
  };

  onReset() {
    this.submitted = false; 
    this.userForm.reset(); 
  }
}
