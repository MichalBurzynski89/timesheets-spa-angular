import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'timesheets-spa-angular';

  constructor(public readonly auth: AuthService) {
    auth.handleAuthentication();
  }
}
