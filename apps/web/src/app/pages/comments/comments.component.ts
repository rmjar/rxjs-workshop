import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { CommentsDataSource } from './comments-datasource';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { catchError, delay, startWith, endWith } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: CommentsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'btns'];

  form = this.fb.group({
    name: [null, []]
  });

  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Login',
    spinnerSize: 19,
    raised: true,
    stroked: true,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  };

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {
    this.dataSource = new CommentsDataSource(this.paginator, this.http);
  }

  onSubmit() {
    const formData = this.form.getRawValue();
    if (!formData.name) {
      return;
    }
    this.dataSource
      .addComment(formData)
      .pipe(
        catchError(() => of(false)),
        startWith(true),
        endWith(false)
      )
      .subscribe(data => {
        this.form.reset();
        if (data) {
          this.btnOpts.active = true;
          this.btnOpts.disabled = true;
        } else {
          this.btnOpts.active = false;
          this.btnOpts.disabled = false;
        }
      });
  }
}
