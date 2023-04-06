import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  constructor() {
    this.loadFromLocalStorage(); // use as backend
  }

  loadFromLocalStorage() {
    // Get saved users from localStorage as JSON string
    const savedUsers = localStorage.getItem('users');

    // Validate if there is data in localStorage
    if (savedUsers) {
      // Parse the JSON string and assign to this.users
      this.users = JSON.parse(savedUsers);
    } else {
      // assign empty array to this.users
      this.users = [];
    }
  }

  // save users array to storage as JSON string
  saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  createUser(users: any) {
    this.users.push(users);
  }

  getUsers() {
    return this.users;
  }
}
