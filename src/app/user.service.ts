import { Injectable } from '@angular/core';
import { User } from './user.model';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersKey = 'users'; // Create storage

  userCreated: EventEmitter<User> = new EventEmitter();

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

    // Emit the userCreated event with the new user object
    this.userCreated.emit(user);
  }
}
