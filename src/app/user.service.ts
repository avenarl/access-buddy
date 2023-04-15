import { Injectable } from '@angular/core';
import { User } from './user.model';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  private authenticatedUser: User | null = null;
  userStateChange$: EventEmitter<void> = new EventEmitter<void>();
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

  deleteUser(id: number) {
    let updatedUser: User[] = [];

    // loop to existing uers
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id !== id) {
        updatedUser.push(this.users[i]);
      }
    }

    this.users = updatedUser;
    this.saveToLocalStorage();
  }

  authenticateUser(email: string, password: string): User | null {
    for (let i = 0; i < this.users.length; i++) {
      if (
        this.users[i].email === email &&
        this.users[i].password === password
      ) {
        return this.users[i];
      }
    }
    return null;
  }

  setAuthenticatedUser(user: User): void {
    this.authenticatedUser = user;
  }

  getAuthenticatedUser(): User | null {
    return this.authenticatedUser;
  }

  removeAuthenticatedUser(): void {
    this.authenticatedUser = null;
  }

  isLoggedIn(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    return !!currentUser;
  }

  currentUserRole(): string | null {
    return this.authenticatedUser ? this.authenticatedUser.role : null;
  }

  logout() {
    this.removeAuthenticatedUser();
  }
  getCurrentUser(): User | null {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }
  getCurrentUserName(): string | null {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return `${currentUser.firstName} ${currentUser.lastName}`;
    }
    return null;
  }

  loginUser(users: User) {
    this.userStateChange$.emit();
  }

  logoutUser() {
    this.userStateChange$.emit();
  }

  getCurrentUserRole(): string | null {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      return userData.role;
    }
    return null;
  }
}
