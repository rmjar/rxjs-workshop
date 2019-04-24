import {
  Component,
  OnInit,
  ViewChild,
  ViewRef,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { fromEvent, Observable, Observer, Subscription } from 'rxjs';
import { ListComponent } from '../../shared/list/list.component';

@Component({
  selector: 'app-promises',
  template: `
    <h1>Callbacks</h1>
    <button #btn class="btn btn-primary">Button</button>
  `,
  styles: []
})
export class CallbackComponent implements OnInit, OnDestroy {
  @ViewChild('btn')
  btn: ElementRef;

  constructor(private list: ListComponent) { }

  ajaxDestroy: any;

  ngOnInit() {
    const log = (...args) => this.list.add(...args);
    const button = this.btn.nativeElement;

    // callbacks
    const onClick = e => {
      this.ajaxDestroy = ajax('/api/parse', (err, data) => {
        this.ajaxDestroy = null;
        log('ajax 1', data);
        ajax('/api/create', (error, record) => {
          log('record', record);
          ajax('/api/create', (error2, record2) => {
            log('record2', record2);
          });
        });
      });

      // button.removeEventListener('click', onClick);
    };
    button.addEventListener('click', onClick);

    setTimeout(() => {
      button.removeEventListener('click', onClick);
    }, 5000);
  }
  ngOnDestroy(): void {
    if (this.ajaxDestroy) {
      this.ajaxDestroy();
    }
  }
}

function ajax(url, cb) {
  fetch(url)
    .then(res => res.json())
    .then(res => cb(null, res), err => cb(err));
}


