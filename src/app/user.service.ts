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

  createUser(users: User): void {
    this.users.push(users);
    this.saveToLocalStorage();
  }

  getUsers(): User[] {
    return this.users;
  }

  // get user by id return null if not found
  getUserbyId(id: number): User | null {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        return this.users[i];
      }
    }
    return null;
  }

  // Edit User
  updateUser(id: number, updatedUser: User) {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.saveToLocalStorage();
    }
  }
}
