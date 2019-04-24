import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  profile$: Observable<any>;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.profile$ = this.userService.getProfile();
    this.userService.user$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (!user) {
        this.router.navigateByUrl('/nodejs/login');
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
