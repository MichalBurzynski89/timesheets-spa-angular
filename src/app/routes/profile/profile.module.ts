import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [CommonModule, ProfileRoutingModule],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
