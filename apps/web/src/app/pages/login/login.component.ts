import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import {
  endWith,
  mapTo,
  startWith,
  delay,
  catchError,
  takeUntil
} from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit {
  destroy$ = new Subject();

  form = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });

  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Login',
    spinnerSize: 19,
    raised: true,
    stroked: true,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  };
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.user$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/nodejs/profile');
      }
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.userService
      .login(this.form.getRawValue())
      .pipe(
        catchError(() => of(false)),
        startWith(true),
        endWith(false)
      )
      .subscribe(data => {
        if (data) {
          this.btnOpts.active = true;
          this.btnOpts.disabled = true;
        } else {
          this.btnOpts.active = false;
          this.btnOpts.disabled = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
