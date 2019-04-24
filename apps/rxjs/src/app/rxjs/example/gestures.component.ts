import {
  Component,
  OnInit,
  ViewChild,
  ViewRef,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';
import {
  fromEvent,
  Observable,
  Observer,
  Subscription,
  Subject,
  merge
} from 'rxjs';
import { mergeMap, takeUntil, map, tap, distinctUntilChanged, scan } from 'rxjs/operators';

export interface Pos {
  x: number;
  y: number;
}

@Component({
  selector: 'app-drag-and-drop',
  template: `
    <h1>Mouse Gestures</h1>
    <h2>Gesture: {{(gesture | json) || 'draw gesture on canvas'}}</h2>
    <div #host class="host"></div>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .host {
        height: 400px;
        width: 100%;
        border: 1px solid gray;
        position: relative;
      }
      .host > div {
        background-color: black;
        width: 3px;
        height: 3px;
        position: fixed;
      }
    `
  ]
})
export class GesturesComponent implements OnInit {
  @ViewChild('host')
  host: ElementRef;
  threshold = 20;
  gesture: any;

  ngOnInit() {
    const down$ = merge(
      fromEvent<MouseEvent>(document, 'mousedown'),
      fromEvent<MouseEvent>(document, 'touchstart')
    );
    const move$ = merge(
      fromEvent<MouseEvent>(document, 'mousemove').pipe(
        map<any, Pos>((e) => ({ x: e.pageX, y: e.pageY })),
      ),
      fromEvent<MouseEvent>(document, 'touchmove').pipe(
        map<any, Pos>((e) => ({ x: e.touches[0].pageX, y: e.touches[0].pageY }))
      )
    );
    const up$ = merge(
      fromEvent<MouseEvent>(document, 'mouseup'),
      fromEvent<MouseEvent>(document, 'touchend')
    );

    const gestures = {
      'D': 'Down',
      'U': 'Up',
      'L': 'Left',
      'R': 'Right',
      'DL': 'Down and Left',
      'DR': 'Down adn Right',
      'DRU': 'U shape',
      'DRD': 'Waterfall',
      'RDLU': 'Circle',
      'RDLUR': 'Circle Full',
    };

    //scan - taki 'reduce' dla eventów 
    const drag$ = down$.pipe(
      tap(() => this.clear()),
      mergeMap(() => move$.pipe(
        tap(pos => this.draw(pos)),
        toGesture(this.threshold),
        distinctUntilChanged(),
        scan((acc, val) => {
          acc.push(val);
          return acc;
        }, []),
        map(g => gestures[g.join('')] || 'Un known gesture'),
        takeUntil(up$)
      ))
    );

    drag$.subscribe(gesture => {
      this.gesture = gesture;
    });

    function toGesture(t) {
      let prev;
      return (in$) => {
        const out$ = new Observable(obs => {
          const sub = in$.subscribe(
            (next: Pos) => {
              if (!prev) {
                prev = next;
                return;
              }
              if (Math.abs(prev.x - next.x) >= t) {
                if (Math.sign(prev.x - next.x) > 0) {
                  obs.next('L');
                } else {
                  obs.next('R');
                }
                prev = next;
              } else if (Math.abs(prev.y - next.y) >= t) {
                if (Math.sign(prev.y - next.y) < 0) {
                  obs.next('D');
                } else {
                  obs.next('U');
                }
                prev = next;
              }

            },
            err => obs.error(err),
            () => obs.complete()
          );
          return () => sub.unsubscribe();
        });

        return out$;
      };
    }
  }
  clear() {
    this.host.nativeElement.innerHTML = '';
  }
  draw(pos) {
    const dot = document.createElement('div');
    dot.style.left = pos.x + 'px';
    dot.style.top = pos.y + 'px';
    this.host.nativeElement.appendChild(dot);
  }
}


/**
 * bufferCount + scan
 * https://stackoverflow.com/questions/47911178/rxjs-take-n-last-elements-from-an-observable
  scan((acc, val) => {
    acc.push(val);
    return acc.slice(-4);
  }, []),
 */
