import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    gender: 'other',
    email: '',
    mobileNumber: 0,
    address: '',
  };
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    let userId: number;
    // Validate
    if (idParam) {
      userId = parseInt(idParam, 10);
    } else {
      userId = 0;
    }

    const foundUser = this.userService.getUserbyId(userId);
    // Validate
    if (foundUser) {
      this.user = foundUser;
    }
  }

  updateUser() {
    this.userService.updateUser(this.user.id, this.user);
    this.router.navigate(['/users']);
  }
}
