import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nodejs-nav',
  templateUrl: './nodejs-nav.component.html',
  styleUrls: ['./nodejs-nav.component.css']
})
export class NodejsNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    public userService: UserService
  ) {}
}
