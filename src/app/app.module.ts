import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ACCESS_TOKEN } from './auth/auth0-variables';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuthService } from './auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './routes/home/home.component';
import { JwtModule } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { ScopeGuard } from './auth/guards/scope.guard';
import { SetHeadersInterceptor } from './interceptors/set-headers.interceptor';
import { TimesheetsService } from './services/timesheets.service';

export function tokenGetter(): string | null {
  return localStorage.getItem(ACCESS_TOKEN);
}

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: { tokenGetter, allowedDomains: ['localhost:8080'] },
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    ScopeGuard,
    TimesheetsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SetHeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
