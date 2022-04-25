import { Component, OnInit } from '@angular/core';

import { Auth0UserProfile } from 'auth0-js';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile!: Auth0UserProfile;

  constructor(private readonly auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((_err, profile) => {
        this.profile = profile as unknown as Auth0UserProfile;
      });
    }
  }
}
