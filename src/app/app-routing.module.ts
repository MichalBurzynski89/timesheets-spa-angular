import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './routes/home/home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./routes/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'callback',
    loadChildren: () =>
      import('./routes/callback/callback.module').then(m => m.CallbackModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
