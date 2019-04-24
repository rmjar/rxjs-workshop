import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  Observable,
  fromEvent,
  combineLatest,
  BehaviorSubject,
  interval,
  of,
  EMPTY
} from 'rxjs';
import {
  startWith,
  map,
  share,
  switchMap,
  catchError,
  takeUntil,
  tap,
  exhaustMap,
  mergeMap
} from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { ListComponent } from '../../shared/list/list.component';

@Component({
  selector: 'app-operators',
  template: `
    <h1>Operatory</h1>
    <p>
      zaawansowane: switchMap, debounceTime throttleTime combineLatest retry
      merge delay bufferTime switchMap takeUntil
    </p>
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

    <pre>{{ data$ | async | json }}</pre>
  `,
  styles: []
})
export class OperatorsComponent implements OnInit {
  @ViewChild('input')
  input: ElementRef;
  @ViewChild('btn')
  btn: ElementRef;
  text: string;

  data$: Observable<any>;
  constructor(private list: ListComponent) {}
  ngOnInit() {
    const log = (...args) => this.list.add(...args);
    const button = this.btn.nativeElement;
    const input = this.input.nativeElement;

    const btn$: Observable<MouseEvent> = fromEvent(button, 'click');
    const input$: Observable<MouseEvent> = fromEvent(input, 'keyup');

    const interval$ = interval(1000);

    function myMap(mapFn) {
      return in$ => {
        const out$ = new Observable(obs => {
          const sub = in$.subscribe({
            next: v => obs.next(mapFn(v)),
            error: err => obs.error(err),
            complete: () => obs.complete()
          });
          return () => sub.unsubscribe();
        });
        return out$;
      };
    }

    function myFilter(filterFn) {
      return in$ => {
        const out$ = new Observable(obs => {
          const sub = in$.subscribe({
            next: val => (filterFn(val) ? obs.next(val) : null),
            error: err => obs.error(err),
            complete: () => obs.complete()
          });
          return () => sub.unsubscribe();
        });
        return out$;
      };
    }

    function myStartWith(startValue) {
      return in$ => {
        const out$ = new Observable(obs => {
          const sub = in$.subscribe({
            next: val => obs.next(val),
            error: err => obs.error(err),
            complete: () => obs.complete()
          });
          obs.next(startValue);
          return () => sub.unsubscribe();
        });
        return out$;
      };
    }

    function myEndWith(endValue) {
      return in$ => {
        const out$ = new Observable(obs => {
          const sub = in$.subscribe({
            next: val => obs.next(val),
            error: err => obs.error(err),
            complete: () => {
              obs.next(endValue);
              obs.complete();
            }
          });
          return () => sub.unsubscribe();
        });
        return out$;
      };
    }

    this.data$ = btn$.pipe(
      tap(v => log('D', v)),

      //switchMap - przerywa bieżący event i tworzy nowy
      // switchMap(v => {
      //   return ajax({ url: '/api/user', });
      // }),
      //   tap(v => log('E', v)),

      //exhaustMap - nie wykona kolejnych eventów, dopóki nie skończy się trwający
      // exhaustMap(v => {
      //   return ajax({ url: '/api/user' });
      // }),
      //mergeMap - zbiera wszystkie trwające eventy i emituje wszystkie z nich zdarzenia
      mergeMap(v => {
        return ajax({ url: '/api/user' });
      }),
      tap(v => log('E', v))
    );

    // this.data$ = interval(1000).pipe(
    //   share(),
    //   myMap(x => 2 * x),
    //   myFilter(x => x < 10),
    //   myStartWith(-500),
    //   myEndWith(3)
    // );

    // this.data$ = ajax('/api/long').pipe(
    //   myMap((res: AjaxResponse) => res.response),
    //   myFilter(res => res.name === 'Piotr'),
    //   // myOperator(),
    //   startWith({ id: 2, name: 'guest' }),
    //   takeUntil(btn$)
    // );

    // const sharedInterval$ = interval$.pipe(
    //   takeUntil(btn$),
    //   share()
    // );

    // sharedInterval$.subscribe(v => log('A', v));

    // setTimeout(() => {
    //   sharedInterval$.subscribe(v => log('B', v));
    // }, 4000);

    // setTimeout(() => {
    //   interval$.pipe(takeUntil(btn$)).subscribe(v => log('Z', v));
    // }, 5000);

    // const id$ = of(1);

    // function getUser(id): Observable<any> {
    //   return ajax({url: '/api/user?id=' + id, }).pipe(
    //     map(res => res.response),
    //     catchError(err => EMPTY)
    //   );
    // }

    // function getCategory(id): Observable<any> {
    //   return ajax({url: '/api/category/' + id, }).pipe(
    //     map(res => res.response)
    //   );
    // }

    // function getUserWithCategory(id): Observable<any> {
    //   return of(id).pipe(
    //     switchMap(id2 => getUser(id2)),
    //     switchMap(user => getCategory(user.category).pipe(map(category => [user, map]))),
    //     catchError(err => EMPTY)
    //   );
    // }

    // const data$ = id$.pipe(
    //   switchMap(id => getUserWithCategory(id).pipe(
    //     catchError(err => {
    //       // TODO UI dla errorow
    //       return EMPTY;
    //     })
    //   ))
    // );

    // data$.subscribe(
    //   data => log('DATA', data),
    //   err => log('ERR', err)
    // );

    // const config$ = new BehaviorSubject('config');
  }
}
