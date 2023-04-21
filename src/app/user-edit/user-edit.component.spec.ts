import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponent } from './user-edit.component';
import { User } from '../user.model';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { convertToParamMap } from '@angular/router';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: convertToParamMap({ id: '1' }),
    },
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEditComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to edit the firstName', () => {
    const testUser: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      birthDate: new Date('1990-01-01'),
      gender: 'male',
      email: 'john.doe@example.com',
      mobileNumber: 9123456789,
      address: '123 Main St',
      password: 'password',
      role: 'user',
    };

    spyOn(component.userService, 'getUserbyId').and.returnValue(testUser);

    // set form value with the test user's data
    component.form.patchValue(testUser);

    // update the firsName field in the form
    component.form.get('firstName')?.setValue('Jane');

    // call the updateUser() method
    spyOn(component.userService, 'updateUser').and.callThrough();
    component.updateUser();

    // check if the user's firstName has been updated
    expect(component.userService.updateUser).toHaveBeenCalledWith(1, {
      ...testUser,
      firstName: 'Jane',
    });
  });
});
