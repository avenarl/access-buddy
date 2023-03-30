import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersKey = 'users'; // Create storage

  constructor() {}

  // GET
  getUsers(): any[] {
    const users = localStorage.getItem(this.usersKey); // Access usersKey

    // Validate if users has value
    if (users) {
      return JSON.parse(users);
    } else {
      return [];
    }
  }

  // POST
  createUser(user: User): void {
    const users = this.getUsers();
    user.id = new Date().getTime(); // Generate ID based on timestamps
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
}
