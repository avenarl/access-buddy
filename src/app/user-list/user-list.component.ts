import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  constructor(private userService: UserService, private router: Router) {
    this.users = userService.getUsers();
  }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }
  showEditForm(users: User) {
    this.selectedUser = users;
  }
  updateUser(id: number) {
    this.router.navigate(['users', 'edit', id]);
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId); // call method from service
    this.users = this.userService.getUsers(); // update user list after delete
  }
}
