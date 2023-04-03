import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  // Set decorator Input
  @Input() userList: User[] = [];
  constructor() {}

  ngOnInit(): void {}

  getUsers(userText: string): void {
    console.log(userText);
  }
}
