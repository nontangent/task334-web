import { Inject, Injectable, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { FirebaseAppConfig, FirebaseOptions, FIREBASE_APP_NAME, FIREBASE_OPTIONS } from '@angular/fire';
import { AngularFireAuthGuard, AuthPipe, AuthPipeGenerator, loggedIn } from '@angular/fire/auth-guard';
import { map, switchMap, take } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService extends AngularFireAuthGuard {

  constructor(
    @Inject(FIREBASE_OPTIONS) options: FirebaseOptions,
    @Optional() @Inject(FIREBASE_APP_NAME) nameOrConfig: string|FirebaseAppConfig|null|undefined,
    zone: NgZone,
    private _router: Router,
    @Inject(PLATFORM_ID) private platform
  ) {
    super(options, nameOrConfig, zone, _router);
  }

  canActivate = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    if (isPlatformBrowser(this.platform)) {
      const authPipeFactory = next.data.authGuardPipe as AuthPipeGenerator || (() => loggedIn);
      return this.authState.pipe(
        take(1),
        authPipeFactory(next, state),
        map(can => typeof can === 'boolean' ? can : this._router.createUrlTree(can as any[]))
      );
    }

    return of(true);
  }

}

export const canActivate = (pipe: AuthPipeGenerator) => ({
  canActivate: [ AuthGuardService ], data: { authGuardPipe: pipe }
});


export const isNotAnonymous: AuthPipe = map(user => !!user && !user.isAnonymous);
export const idTokenResult = switchMap((user: firebase.User|null) => user ? user.getIdTokenResult() : of(null));
export const emailVerified: AuthPipe = map(user => !!user && user.emailVerified);
export const customClaims = pipe(idTokenResult, map(idTokenResult => idTokenResult ? idTokenResult.claims : []));
export const hasCustomClaim: (claim: string) => AuthPipe =
(claim) => pipe(customClaims, map(claims =>  claims.hasOwnProperty(claim)));
export const redirectUnauthorizedTo: (redirect: any[]) => AuthPipe =
(redirect) => pipe(loggedIn, map(loggedIn => loggedIn || redirect));
export const redirectLoggedInTo: (redirect: any[]) => AuthPipe =
(redirect) => pipe(loggedIn, map(loggedIn => loggedIn && redirect || true));
