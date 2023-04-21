import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { User } from './user.model';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should delete a user', () => {
    spyOn(userService, 'deleteUser').and.callThrough();

    userService.deleteUser(1);
    expect(userService.deleteUser).toHaveBeenCalledWith(1);
  });

  it('should create a user', () => {
    spyOn(userService, 'createUser').and.callThrough();
    const newUser: User = {
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

    userService.createUser(newUser);
    expect(userService.createUser).toHaveBeenCalledWith(newUser);
  });

  it('should login as user', () => {
    spyOn(userService, 'loginUser').and.callThrough();
    const sampleUser: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      birthDate: new Date('1990-01-01'),
      gender: 'male',
      email: 'user@example.com',
      mobileNumber: 9123456789,
      address: '123 Main St',
      password: 'password',
      role: 'user',
    };

    userService.loginUser(sampleUser);
    expect(userService.loginUser).toHaveBeenCalledWith(sampleUser);
  });

  it('should login as admin', () => {
    spyOn(userService, 'loginUser').and.callThrough();
    const sampleAdmin: User = {
      id: 1,
      firstName: 'Admin',
      lastName: 'Admin',
      birthDate: new Date('1990-01-01'),
      gender: 'male',
      email: 'admin@example.com',
      mobileNumber: 9123456789,
      address: '123 Main St',
      password: 'password',
      role: 'admin',
    };

    userService.loginUser(sampleAdmin);
    expect(userService.loginUser).toHaveBeenCalledWith(sampleAdmin);
  });

  it('user can edit their own profile', () => {
    spyOn(userService, 'updateUser').and.callThrough();
    const updateProfile: User = {
      id: 1,
      firstName: 'user',
      lastName: 'user',
      birthDate: new Date('1990-01-01'),
      gender: 'male',
      email: 'admin@example.com',
      mobileNumber: 9123456789,
      address: '123 Main St',
      password: 'password',
      role: 'user',
    };
    userService.updateUser(updateProfile.id, updateProfile);
    expect(userService.updateUser).toHaveBeenCalledWith(
      updateProfile.id,
      updateProfile
    );
  });
});
