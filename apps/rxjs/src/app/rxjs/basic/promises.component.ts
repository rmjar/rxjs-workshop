import {
  Component,
  OnInit,
  ViewChild,
  ViewRef,
  ElementRef
} from '@angular/core';
import { fromEvent, Observable, Observer, Subscription } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ListComponent } from '../../shared/list/list.component';

@Component({
  selector: 'app-promises',
  template: `
    <h1>Promise</h1>
    <button #btn class="btn btn-primary">Button</button>
  `,
  styles: []
})
export class PromisesComponent implements OnInit {
  @ViewChild('btn')
  btn: ElementRef;

  constructor(private list: ListComponent) {}

  async ngOnInit() {
    const log = (...args) => this.list.add(...args);
    const button = this.btn.nativeElement;

    // tworzenie promisa
    const myTask = new Promise((resolve, reject) => {
      setTimeout(() => {
        log('produce data');
        resolve({ title: 'my data after: 2s' });
      }, 2000);
    });

    myTask.then(data => log(data));

    // cache
    setTimeout(() => {
      myTask.then(data => log(data));
    }, 3000);

    // async await
    try {
      // ajax + cache
      const data = await fetch('/api/parse').catch(err =>
        Promise.resolve({ title: 'my data from cache' })
      );

      // get user
      const data2 = await fetch('/api/parse');
    } catch (error) {
      console.log('error', error);
    }

    // chaining
    let running = false;
    const onClick = e => {
      log(e);
      if (running) {
        return;
      }
      running = true;

      fetch('/api/parse')
        .then(res => res.json())
        .then(data => {
          if (!data) {
            return Promise.reject('no data  from server');
          }
          return fetch('/api/create', { method: 'GET' }).then(res =>
            res.json()
          );
        })
        .catch(err => {
          return Promise.resolve({ title: 'my data from cache' });
        })
        .then(data => {
          running = false;
          return fetch('/api/parse');
        })
        .catch(err => log('err', err));

      // button.removeEventListener('click', onClick);
    };
    button.addEventListener('click', onClick);
  }
}
