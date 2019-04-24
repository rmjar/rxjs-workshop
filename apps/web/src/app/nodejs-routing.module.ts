import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NodejsNavComponent } from './nodejs-nav/nodejs-nav.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: NodejsNavComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'photos', component: PhotosComponent },
      { path: 'comments', component: CommentsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NodejsRoutingModule {}
