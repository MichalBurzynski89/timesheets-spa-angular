import {
  ACCESS_TOKEN,
  AUTH_CONFIG,
  EXPIRES_AT,
  ID_TOKEN,
  SCOPES,
} from './auth0-variables';
import { Auth0DecodedHash, WebAuth } from 'auth0-js';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  userProfile: any;
  requestedScopes: string = 'openid profile read:timesheets create:timesheets';

  auth0 = new WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: AUTH_CONFIG.apiUrl,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: this.requestedScopes,
  });

  constructor(public readonly router: Router) {}

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

  private setSession(authResult: Auth0DecodedHash): void {
    // Set the time that the Access Token will expire at
    const expiresAt: string = JSON.stringify(
      authResult.expiresIn! * 1000 + new Date().getTime()
    );

    // If there is a value on the scope param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes: string = authResult.scope || this.requestedScopes || '';

    localStorage.setItem(ACCESS_TOKEN, authResult.accessToken!);
    localStorage.setItem(ID_TOKEN, authResult.idToken!);
    localStorage.setItem(EXPIRES_AT, expiresAt);
    localStorage.setItem(SCOPES, JSON.stringify(scopes));
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
    const expiresAt: number = JSON.parse(localStorage.getItem(EXPIRES_AT)!);
    return new Date().getTime() < expiresAt;
  }

  public userHasScopes(scopes: string[]): boolean {
    const grantedScopes: string[] = JSON.parse(
      localStorage.getItem(SCOPES)!
    ).split(' ');

    return scopes.every(scope => grantedScopes.includes(scope));
  }
}
