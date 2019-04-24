import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  Observable,
  fromEvent,
  interval,
  of,
  empty,
  EMPTY,
  range,
  timer,
  throwError,
  from
} from 'rxjs';
import { share } from 'rxjs/operators';
import { ListComponent } from '../../shared/list/list.component';

@Component({
  selector: 'app-create',
  template: `
    <h1>Create Observables</h1>
    <p>
      dostępne metody: Create, Defer, Empty/Never/Throw, From, Interval, Just,
      Range, Repeat, Start, and Timer
    </p>
    <button #btn class="btn btn-primary">Button</button>
  `,
  styles: []
})
export class CreateComponent implements OnInit {
  @ViewChild('btn')
  btn: ElementRef;
  constructor(private list: ListComponent) {}

  ngOnInit() {
    const log = (...args) => this.list.add(...args);
    const button = this.btn.nativeElement;

    const stream$ = myInterval(500).pipe(share());
    // const stream$ = interval(500).pipe(share());
    // const stream$ = of({id: 2, name: 'Piotr'}); // of - jeden obiekt
    // const stream$ = empty(); //deprecated
    // const stream$ = EMPTY;
    // const stream$ = range(2, 4); // range - od 2, 4 eventy
    // const stream$ = timer(2000);
    // const stream$ = throwError('custom error');
    // const stream$ = from(['q', 'w', 'e']); // from - iterowanie po kolekcji
    // const stream$ = of(['q', 'w', 'e']);

    function myInterval(time: number) {
      let counter = 0;
      return new Observable(obs => {
        const clock = setInterval(() => {
          obs.next(counter++);
        }, time);
        return () => clearInterval(clock);
      });
    }
    
    const sub = stream$.subscribe(
      val => log('A', val),
      err => log('error', err),
      () => log('complete')
    );

    // const sub2 = stream$.subscribe(
    //   (val) => log('B', val),
    //   (err) => log('error 2', err),
    //   () => log('complete 2')
    // );

    // setTimeout(() => {
    //   sub.unsubscribe();
    // }, 1000);

    // setTimeout(() => {
    //   sub2.unsubscribe();
    // }, 4000);

    setTimeout(() => {
      const sub3 = stream$.subscribe(
        val => log('C', val),
        err => log('error 2', err),
        () => log('complete 2')
      );
      setTimeout(() => {
        sub3.unsubscribe();
      }, 2000);
    }, 3000);

    // setTimeout(() => {
    //   const sub3 = stream$.subscribe(
    //     (val) => log('D', val),
    //     (err) => log('error 2', err),
    //     () => log('complete 2')
    //   );
    //   setTimeout(() => {
    //     sub3.unsubscribe();
    //   }, 2000);
    // }, 7000);

    // const btn$ = Observable.create((obs) => {

    //   let counter = 0;
    //   function onClick(e) {
    //     if (counter > 3) {
    //       return obs.error('nie nie nie ');
    //     }
    //     counter++;
    //     obs.next(e);
    //   }
    //   button.addEventListener('click', onClick);

    //   return () => {
    //     log('clean your resources');
    //     button.removeEventListener('click', onClick);
    //   };
    // });

    // btn$.subscribe(
    //   (val) => log('next', val),
    //   (err) => log('error', err),
    //   () => log('complete')
    // );
  }
}
