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
});
