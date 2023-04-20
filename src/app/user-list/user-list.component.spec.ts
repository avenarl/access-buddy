import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';
import { User } from '../user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [UserService],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsers()', () => {
    const getUsersSpy = spyOn(userService, 'getUsers').and.callThrough();
    component.ngOnInit();
    expect(getUsersSpy).toHaveBeenCalled();
  });

  it('should populate users property with data from getUsers()', () => {
    const currentUsers: User[] = [
      {
        id: 1681649188558,
        firstName: 'admin',
        lastName: 'admin',
        birthDate: new Date('01/01/1990'),
        gender: 'male',
        email: 'admin@example.com',
        mobileNumber: 9123456789,
        address: 'Philippines',
        password: 'admin',
        role: 'admin',
      },
    ];

    spyOn(userService, 'getUsers').and.returnValue(currentUsers);
    component.userService = userService;
    component.ngOnInit();
    expect(component.users).toEqual(currentUsers);
  });
});
