import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ScopeGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const scopes: string[] = route.data['expectedScopes'];

    if (!this.auth.isAuthenticated() || !this.auth.userHasScopes(scopes)) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
