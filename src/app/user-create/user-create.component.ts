import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent {
  users: User[] = [];
  constructor(private userService: UserService) {}

  createUser() {
    this.userService.createUser(this.users);
  }
}
