import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any[] = [];
  constructor() {}

  createUser(text: any) {
    this.user.push(text);
  }
}
