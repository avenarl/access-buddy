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
  userRole: string;
  constructor(public userService: UserService, private router: Router) {
    this.users = userService.getUsers();
  }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.userRole = localStorage.getItem('userRole') ?? '';
  }

  deleteUser(userId: number) {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      alert('You cannot delete your own account.');
    } else {
      this.userService.deleteUser(userId);
      this.users = this.userService.getUsers();
    }
  }

  canEdit(user: User): boolean {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;
    if (currentUser.id === user.id) return true;
    return false;
  }

  updateUser(user: User): void {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem('users', JSON.stringify(users));
      alert('User details updated successfully!');
    } else {
      alert('Error: User not found!');
    }
  }
}
