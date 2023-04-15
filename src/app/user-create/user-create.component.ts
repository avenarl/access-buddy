import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent {
  form: FormGroup;
  firstName: string = '';
  lastName: string = '';
  birthDate: Date;
  gender: 'male' | 'female' | 'other' = 'other';
  email: string = '';
  password: string = '';
  role: 'admin' | 'user';
  mobileNumber: number;
  address: string = '';

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['other', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, this.emailValidator()],
      ],
      password: ['', Validators.required],
      role: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  createUser() {
    console.log('Form submitted:', this.form.value);
    if (this.form.invalid) {
      return;
    }

    const newUser: User = {
      id: Date.now(),
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      birthDate: this.form.get('birthDate')?.value,
      gender: this.form.get('gender')?.value,
      email: this.form.get('email')?.value,
      mobileNumber: this.form.get('mobileNumber')?.value,
      address: this.form.get('address')?.value,
      password: this.form.get('password')?.value,
      role: this.form.get('role')?.value,
    };

    this.userService.createUser(newUser);
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (this.userService.checkDuplicateEmail(email)) {
        return { duplicateEmail: true };
      }
      return null;
    };
  }
}
