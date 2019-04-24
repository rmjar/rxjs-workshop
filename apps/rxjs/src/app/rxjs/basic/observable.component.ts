import {
  Component,
  OnInit,
  ViewChild,
  ViewRef,
  ElementRef
} from '@angular/core';

import { fromEvent, Observable, Observer, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { ListComponent } from '../../shared/list/list.component';

@Component({
  selector: 'app-observable',
  template: `
    <h1>Observable</h1>
    <button #btn class="btn btn-primary">Button</button>
  `,
  styles: []
})
export class ObservableComponent implements OnInit {
  @ViewChild('btn')
  btn: ElementRef;
  constructor(private list: ListComponent) { }

  ngOnInit() {
    const log = (...args) => this.list.add(...args);
    const button = this.btn.nativeElement;

    /**
     * PRODUCER
     */
    // const btn$: Observable<MouseEvent> = fromEvent(button, 'click');
    const btn$ = new Observable(obs => {
      // obs.next('custom value 1');
    //   // obs.error('custom error');
    //   obs.complete();
    //   obs.next('custom value 2');

      function onClick(e) {
        obs.next(e);
      }

      button.addEventListener('click', onClick);

      return () => {
        log('koniec pracy');
        button.removeEventListener('click', onClick);
      };
    }).pipe(share());



    /**
     * CONSUMER
     */
    const observer: Observer<MouseEvent> = {
      next: val => this.list.add('next', val),
      error: err => this.list.add('error', err),
      complete: () => this.list.add('complete')
    };

    const subscription: Subscription = btn$.subscribe(observer);
    // const subscription2: Subscription = btn$.subscribe(observer);

    // setTimeout(() => {
    //   log('unsubscribe');
    //   subscription.unsubscribe();
    // }, 2000);

    const sbuscription2 = btn$.subscribe(
      (val) => this.list.add('b next', val),
      (err) => this.list.add('b error', err),
      () => this.list.add('b complete')
    );
  }
}

//zadanie domowe - przerobić na observable
function ajax(url, success, error) {
  const controller = new AbortController();
  const signal = controller.signal;
  fetch(url, { signal })
    .then(res => res.json())
    .then(success)
    .catch(error);
  // abort request
  controller.abort();
}
