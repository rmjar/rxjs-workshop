import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, of, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  delay,
  share,
  mergeMap,
  exhaustMap,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  template: `
    <h1>Autocomplete</h1>
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
export class AutocompleteComponent implements OnInit {
  @ViewChild('input')
  input: ElementRef;

  items = [];
  constructor() {}

  ngOnInit() {
    const input = this.input.nativeElement;


    //uwaga na obsługę błedów wewnątrz switchMap - inaczej w razie błędu strumień się przerwie!
    const keyup$ = fromEvent(input, 'keyup').pipe(
      debounceTime(1000),
      map<any, string>(e => e.target.value),
      filter(v => v.length > 2),
      distinctUntilChanged(),
      switchMap(value =>
        searchWikipedia(value).pipe(
          catchError(err => {
            return of([{ title: 'error ' + err.message }]);
          })
        )
      )
    );

    keyup$.subscribe((data: any) => {
      console.log('data', data);
      this.items = data;
    });
  }
}

function searchWikipedia(term) {
  return ajax.getJSON('/api/wikipedia?search=' + term).pipe(
    map(response => response),
    catchError(err => {
      return of([{ title: 'error: ' + err.message }]);
    })
  );
}
