import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from './routes';
import { RxjsComponent } from './rxjs.component';

const routes: Routes = [
  {
    path: '',
    component: RxjsComponent,
    children: ROUTES
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxjsRoutingModule {}
