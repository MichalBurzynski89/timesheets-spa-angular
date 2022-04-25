import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './routes/home/home.component';
import { NgModule } from '@angular/core';
import { ScopeGuard } from './auth/guards/scope.guard';

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
    path: 'timesheets',
    loadChildren: () =>
      import('./routes/timesheets/timesheets.module').then(
        m => m.TimesheetsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'approval',
    loadChildren: () =>
      import('./routes/approval/approval.module').then(m => m.ApprovalModule),
    canActivate: [ScopeGuard],
    data: {
      expectedScopes: ['approve:timesheets'],
    },
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
