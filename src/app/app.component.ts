import { Component } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'access-buddy';

  userList: User[] = [
    {
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      birthDate: '01-01-1990',
      gender: 'male',
      email: 'juan@hotmail.com',
      mobileNumber: '09123456789',
      address: 'Manila, Philippines',
    },
  ];
}
