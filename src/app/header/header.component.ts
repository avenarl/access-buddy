import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    public userService: UserService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userService.userStateChange$.subscribe(() => {
      this.changeDetector.detectChanges();
    });
  }
}
