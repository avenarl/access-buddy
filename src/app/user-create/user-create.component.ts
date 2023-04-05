import { Component } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent {
  user: any;
  constructor(private userService: UserService) {}

  createUser() {
    this.userService.createUser(this.user);
  }
}
