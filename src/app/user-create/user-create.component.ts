import { User } from '../user.model';
import { UserService } from '../user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent {
  user: User = {
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    gender: 'other',
    email: '',
    mobileNumber: '',
    address: '',
  };
  constructor(private userService: UserService) {}

  createUser(): void {
    this.userService.createUser(this.user);
  }
}
