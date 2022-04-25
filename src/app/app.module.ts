import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CallbackComponent } from './routes/callback/callback.component';
import { HomeComponent } from './routes/home/home.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './routes/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
