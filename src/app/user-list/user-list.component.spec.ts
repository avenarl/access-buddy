import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let UserService: UserService;

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
    const getUsersSpy = spyOn(UserService, 'getUsers').and.callThrough();
    component.ngOnInit();
    expect(getUsersSpy).toHaveBeenCalled();
  });
});
