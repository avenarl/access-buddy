import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    public userService: UserService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.userStateChange$.subscribe(() => {
      this.changeDetector.detectChanges();
    });
  }

  logout() {
    this.userService.logoutUser();
    this.router.navigate(['/login']);
  }
}
