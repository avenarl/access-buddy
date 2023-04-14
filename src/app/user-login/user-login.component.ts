import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const loggedInUser = this.userService.authenticateUser(email, password);
      if (loggedInUser) {
        // store user data in localStorage
        this.router.navigate(['/users']);
      } else {
        // error message
      }
    }
  }
}
