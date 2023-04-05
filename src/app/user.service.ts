import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];
  constructor() {}

  createUser(users: any) {
    this.users.push(users);
  }

  getUsers() {
    return this.users;
  }
}
