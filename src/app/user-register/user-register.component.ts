import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  registerForm: FormGroup;

  constructor(private userService: UserService) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  registerUser() {
    if (this.registerForm.valid) {
      const newUser: User = {
        ...this.registerForm.value,
        id: Date.now(),
      };
      this.userService.createUser(newUser);
      this.registerForm.reset();
    }
  }
}
