import { Injectable, Inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  of,
  throwError,
  Subject,
  interval,
  merge
} from 'rxjs';
import { switchMap, map, tap, filter } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export interface User {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user$ = new BehaviorSubject<User | null>(null);

  get user$() {
    return this._user$.asObservable();
  }

  get user() {
    return this._user$.getValue();
  }

  constructor() {}

  private sessionDuration = 6;
  private onRequest$ = new Subject();
  public refreshButtonClick$ = new Subject();

  private _idleTime$ = new BehaviorSubject(this.sessionDuration);

  get idleTime$() {
    return this._idleTime$.asObservable();
  }

  setupIdleTime() {
    /**
     * IDLE TIME
     */
    merge(of(1), this.onRequest$, this.refreshButtonClick$)
      .pipe(
        switchMap(() => {
          return interval(1000);
        }),
        map((time: number) => {
          return this.sessionDuration - time;
        }),
        filter((time: number) => time >= 0)
        // map((time: number) => {
        //   return time >= 0 ? time : 0;
        // })
      )
      .subscribe(time => {
        // console.log('time', time);
        if (time === 0) {
          this.logout();
        }
        // if (!time && this._idleTime$.getValue() !== 0) {
        //   this.logout();
        // }
        this._idleTime$.next(time);
      });
  }

  onRequest() {
    this.onRequest$.next();
  }

  onRefreshClick() {
    this.refreshButtonClick$.next();
  }

  logout() {
    this._user$.next(null);
  }

  login(email, pass): Observable<User> {
    return ajax
      .getJSON<User>('/api/user')
      .pipe(tap(user => this._user$.next(user)));
  }

  setupLocalStorage() {
    // get user from session
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      try {
        this._user$.next(JSON.parse(userFromStorage));
      } catch (error) {
        console.log('ERROR parsowania', error);
      }
    }
    // update user in session
    this._user$.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }
}
