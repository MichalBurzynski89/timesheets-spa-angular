import {
  ACCESS_TOKEN,
  AUTH_CONFIG,
  EXPIRES_AT,
  ID_TOKEN,
  SCOPES,
} from './auth0-variables';
import {
  Auth0DecodedHash,
  Auth0Error,
  Auth0UserProfile,
  WebAuth,
} from 'auth0-js';
import { Observable, Subscription, mergeMap, of, timer } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  userProfile!: Auth0UserProfile;
  refreshSubscription!: Subscription;
  requestedScopes = 'openid profile read:timesheets create:timesheets';

  auth0 = new WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: AUTH_CONFIG.audience,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: this.requestedScopes,
  });

  constructor(private readonly router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public getProfile(callback: <T, U>(err: T, profile: U) => void): void {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    this.auth0.client.userInfo(
      accessToken,
      (err: Auth0Error | null, profile: Auth0UserProfile) => {
        if (profile) {
          this.userProfile = profile;
        }

        callback(err, profile);
      }
    );
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ID_TOKEN);
    localStorage.removeItem(EXPIRES_AT);
    localStorage.removeItem(SCOPES);
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt: number = JSON.parse(
      localStorage.getItem(EXPIRES_AT) as string
    );
    return new Date().getTime() < expiresAt;
  }

  public userHasScopes(scopes: string[]): boolean {
    const grantedScopes: string[] = JSON.parse(
      localStorage.getItem(SCOPES) as string
    ).split(' ');

    return scopes.every(scope => grantedScopes.includes(scope));
  }

  public renewToken(): void {
    this.auth0.checkSession(
      {
        audience: AUTH_CONFIG.audience,
      },
      (err: Auth0Error | null, result: Auth0DecodedHash) => {
        if (!err) {
          this.setSession(result);
        }
      }
    );
  }

  public scheduleRenewal(): void {
    if (!this.isAuthenticated()) {
      return;
    }

    const expiresAt: number = JSON.parse(
      localStorage.getItem('expires_at') as string
    );

    const source: Observable<0> = of(expiresAt).pipe(
      mergeMap(expiresAt => {
        const now = Date.now();

        // Use the delay in a timer to
        // run the refresh at the proper time
        const refreshAt = expiresAt - 1000 * 30; // Refresh 30 seconds before expiry
        return timer(Math.max(1, refreshAt - now));
      })
    );

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => this.renewToken());
  }

  public unscheduleRenewal(): void {
    if (!this.refreshSubscription) {
      return;
    }

    this.refreshSubscription.unsubscribe();
  }

  private setSession(authResult: Auth0DecodedHash): void {
    // Set the time that the Access Token will expire at
    const expiresAt: string = JSON.stringify(
      (authResult.expiresIn as number) * 1000 + new Date().getTime()
    );

    // If there is a value on the scope param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes: string = authResult.scope || this.requestedScopes || '';

    localStorage.setItem(ACCESS_TOKEN, authResult.accessToken as string);
    localStorage.setItem(ID_TOKEN, authResult.idToken as string);
    localStorage.setItem(EXPIRES_AT, expiresAt);
    localStorage.setItem(SCOPES, JSON.stringify(scopes));
    this.scheduleRenewal();
  }
}
