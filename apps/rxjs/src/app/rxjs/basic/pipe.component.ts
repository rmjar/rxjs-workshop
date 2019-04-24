import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, interval, Subject, Subscription } from 'rxjs';
import {
  map,
  distinctUntilChanged,
  debounceTime,
  debounce,
  groupBy,
  filter,
  bufferTime,
  buffer,
  retry,
  switchMap
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ListComponent } from '../../shared/list/list.component';

@Component({
  selector: 'app-pipe',
  template: `
    <h1>Metoda pipe() na Observable</h1>
    <h2>operatory</h2>
    <p>podstawowe: map, filter, reduce</p>
    <input
      #input
      type="text"
      id="textInput"
      class="form-control"
      placeholder="Enter Query..."
      autocomplete="false"
    />
    <pre>{{ text }}</pre>
    <button #btn class="btn btn-primary">Button</button>
  `,
  styles: []
})
export class PipeComponent implements OnInit {
  @ViewChild('input')
  input: ElementRef;
  @ViewChild('btn')
  btn: ElementRef;
  text: string;
  constructor(private list: ListComponent) { }

  ngOnInit() {
    const log = (...args) => this.list.add(...args);
    const button = this.btn.nativeElement;
    const input = this.input.nativeElement;

    const interval$ = interval(1000);
    const btn$: Observable<MouseEvent> = fromEvent(button, 'click');
    const input$ = fromEvent<any>(input, 'keyup');

    const ajax$ = ajax('/api/404-error');

    // ajax$.pipe(
    //   // switchMap(res => ajax$.pipe(retry(2))),
    //   // retry(3)
    // ).subscribe(
    //   v => log('V', v),
    //   err => log('ERR', err)
    // );

    const keyboard$ = input$.pipe(
      map<any, string>(e => e.target.value),
      filter(v => v.length > 2),
      distinctUntilChanged(),
      // myDistinctUntilChanged(),
      // myFilter<string>(v => v.length > 2),
      // debounce(() => interval$),
      debounceTime(250),
      bufferTime(2000)
      // buffer(interval$)
    );

    const s = keyboard$.subscribe(v => log('V', v));
  }
}

