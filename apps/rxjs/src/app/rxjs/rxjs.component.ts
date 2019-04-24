import { Component, OnInit } from '@angular/core';
import { ROUTES } from './routes';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {
  routes: Routes = ROUTES;

  constructor() {}

  ngOnInit() {}
}
