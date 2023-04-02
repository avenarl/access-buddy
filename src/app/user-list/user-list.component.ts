import { Component } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  user: User[] = [];
  constructor(private userService: UserService) {}

  getUsers(): void {
    this.user = this.userService.getUsers();
  }
}
