import { ACCESS_TOKEN } from './auth/auth0-variables';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuthService } from './auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './routes/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { ScopeGuard } from './auth/guards/scope.guard';
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
  providers: [AuthService, AuthGuard, ScopeGuard, TimesheetsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
