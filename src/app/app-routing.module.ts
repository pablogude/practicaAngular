import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileDeleteComponent } from './components/profile-delete/profile-delete.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostDeleteComponent } from './components/post-delete/post-delete.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { UserGuard } from 'src/app/guards/user.guard';
import { UserLoginGuard } from 'src/app/guards/user-login.guard'; 


const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'post/:id',
    component: PostDetailComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'post/edit/:id',
    component: PostEditComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'post/delete/:id',
    component: PostDeleteComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate : [UserLoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate : [UserLoginGuard]
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'profile/edit',
    component: ProfileEditComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'profile/delete',
    component: ProfileDeleteComponent,
    canActivate: [UserGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
