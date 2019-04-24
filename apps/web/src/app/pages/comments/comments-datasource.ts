import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, switchMap, startWith, tap, takeUntil } from 'rxjs/operators';
import {
  Observable,
  of as observableOf,
  merge,
  BehaviorSubject,
  Subject,
  combineLatest,
  Subscription
} from 'rxjs';
import { CommentModel } from '../../models';
import { HttpClient } from '@angular/common/http';

export class CommentsDataSource extends DataSource<CommentModel> {
  comments$ = new BehaviorSubject<CommentModel[]>([]);
  reload$ = new Subject<void>();
  disconnect$ = new Subject<void>();

  constructor(private paginator: MatPaginator, private http: HttpClient) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<CommentModel[]> {
    this.load().subscribe();
    return this.comments$.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.disconnect$.next();
    this.comments$.complete();
    this.reload$.complete();
    this.disconnect$.complete();
  }

  load(): Observable<any> {
    return merge(this.paginator.page, this.reload$).pipe(
      takeUntil(this.disconnect$),
      startWith(1),
      switchMap(() => {
        return this.http
          .get<{ data: CommentModel[]; total: number }>('/api/comments', {
            params: <any>{
              pageSize: this.paginator.pageSize,
              pageIndex: this.paginator.pageIndex
            }
          })
          .pipe(
            tap(data => {
              this.comments$.next(data.data);
              this.paginator.length = data.total;
            })
          );
      })
    );
  }

  addComment(newData) {
    return this.http.post<any>('/api/comments', newData).pipe(
      takeUntil(this.disconnect$),
      tap(data => {
        this.paginator.length = data.total;
        this.paginator.pageIndex = 0;
        this.reload$.next();
      })
    );
  }

  deleteComment(id) {
    return this.http
      .delete<any>('/api/comments/' + id)
      .pipe(
        takeUntil(this.disconnect$),
        tap(data => {
          this.paginator.length = data.total;
          this.reload$.next();
        })
      )
      .subscribe();
  }
}
