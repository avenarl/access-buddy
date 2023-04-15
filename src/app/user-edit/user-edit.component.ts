import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Retrieve the user and set the form values
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      const user = this.userService.getUserbyId(+userId);
      if (user) {
        this.form.patchValue(user);
      }
    }

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          this.emailValidator(userId ? +userId : undefined),
        ],
      ],
      mobileNumber: ['', Validators.required],
      address: ['', Validators.required],
    });

    if (userId) {
      const user = this.userService.getUserbyId(+userId);
      if (user) {
        this.form.patchValue(user);
      }
    }
  }

  emailValidator(excludeUserId?: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (this.userService.checkDuplicateEmail(email, excludeUserId)) {
        return { duplicateEmail: true };
      }
      return null;
    };
  }

  updateUser() {
    if (this.form.valid) {
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        const user = this.userService.getUserbyId(+userId);
        if (user) {
          const updatedUser: User = {
            id: +userId,
            firstName: this.form.get('firstName')?.value ?? '',
            lastName: this.form.get('lastName')?.value ?? '',
            birthDate: this.form.get('birthDate')?.value ?? '',
            gender: this.form.get('gender')?.value ?? '',
            email: this.form.get('email')?.value ?? '',
            mobileNumber: this.form.get('mobileNumber')?.value ?? '',
            address: this.form.get('address')?.value ?? '',
            password: user.password, // Use the original password
            role: user.role, // Use the original role
          };
          this.userService.updateUser(+userId, updatedUser); // Pass both id and updatedUser as arguments
          this.router.navigate(['/users']);
        }
      }
    }
  }
}
