import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent {
  // declare properties to holde the form values
  firstName: string = '';
  lastName: string = '';
  birthDate: Date;
  gender: 'male' | 'female' | 'other' = 'other';
  email: string = '';
  password: string = '';
  role: 'admin' | 'user';
  mobileNumber: number;
  address: string = '';

  constructor(private userService: UserService) {}

  createUser() {
    // this.userService.createUser(this.users);
    const newUser: User = {
      id: Date.now(),
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      gender: this.gender,
      email: this.email,
      mobileNumber: this.mobileNumber,
      address: this.address,
      password: this.password, // Add password property
      role: this.role,
    };
    this.userService.createUser(newUser);
  }
}
