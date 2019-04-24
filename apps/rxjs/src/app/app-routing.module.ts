import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          // component: HomeComponent,
          redirectTo: 'rxjs',
          pathMatch: 'full'
        },
        {
          path: 'rxjs',
          loadChildren: './rxjs/rxjs.module#RxjsModule'
        }
      ],
      { useHash: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
