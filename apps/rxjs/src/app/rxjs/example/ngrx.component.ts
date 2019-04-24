import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../../store';

@Component({
  selector: 'app-ngrx',
  template: `
    <h1>NgRx</h1>
    <form role="form">
      <div class="form-group">
        <label for="textInput">Enter Query for Wikipedia</label>
        <input
          #input
          type="text"
          id="textInput"
          class="form-control"
          placeholder="Enter Query..."
        />
      </div>
    </form>

    <h2>
      Wyniki <small>({{ items.length }})</small>
    </h2>
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let item of items; let i = index">
        {{ item.title }}
      </li>
    </ul>
  `,
  styles: []
})
export class NgrxComponent implements OnInit {
  @ViewChild('input')
  input: ElementRef;

  items = [];
  constructor(store: Store<State>) {}

  ngOnInit() {}
}

/**
 *
    function searchWikipedia(term) {
      return ajax.getJSON('/api/wikipedia?search=' + term).pipe(
        map(response => response),
        catchError(err => {
          return of([{title: 'error: ' + err.message}]);
        })
      );
    }

    const input = this.input.nativeElement;

    const keyup$ = fromEvent(input, 'keyup').pipe(
      map((e: any) => e.target.value),
      filter((text) =>  text.length > 2),
      distinctUntilChanged(),
      debounceTime(250),
      switchMap(text => searchWikipedia(text))
    );

    keyup$.subscribe((data: any) => {
      console.log('data', data);
      this.items = data;
    });

 */
