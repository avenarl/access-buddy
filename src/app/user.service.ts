import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersKey = 'users'; // Create storage

  constructor() {}

  getUsers(): any[] {
    const users = localStorage.getItem(this.usersKey); // Access usersKey

    // Validate if users has value
    if (users) {
      return JSON.parse(users);
    } else {
      return [];
    }
  }
}
