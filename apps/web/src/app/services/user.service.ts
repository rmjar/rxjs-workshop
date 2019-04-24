import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap, switchMap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _tokenPayload$ = new BehaviorSubject(null);

  get token$() {
    return this._tokenPayload$
      .asObservable()
      .pipe(map(payload => (payload ? payload.token : null)));
  }

  get user$() {
    return this._tokenPayload$
      .asObservable()
      .pipe(map(payload => (payload ? payload.user : null)));
  }

  constructor(private http: HttpClient) {
    this.setupLocalStorage();
  }

  login({ email, password }) {
    return this.http
      .post('/api/user/login', {
        email,
        password
      })
      .pipe(tap(user => this._tokenPayload$.next(user)));
  }

  logout() {
    this._tokenPayload$.next(null);
  }

  getProfile() {
    return this.user$.pipe(
      switchMap(user =>
        this.http.get('/api/user').pipe(catchError(err => null))
      )
    );
  }

  setupLocalStorage() {
    const STORAGE_KEY = 'token-payload';
    // get user from session
    const userFromStorage = localStorage.getItem(STORAGE_KEY);
    if (userFromStorage) {
      try {
        this._tokenPayload$.next(JSON.parse(userFromStorage));
      } catch (error) {
        console.log('ERROR parsowania', error);
      }
    }
    // update user in session
    this._tokenPayload$.subscribe(user => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    });
  }
}
