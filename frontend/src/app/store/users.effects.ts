import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutUserRequest,
  logoutUser,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
  loginFbRequest,
  loginFbSuccess,
  loginFbFailure,
  loginGoogleRequest,
  loginGoogleSuccess,
  loginGoogleFailure,
} from './users.actions';
import { mergeMap, tap, map } from 'rxjs';
import { HelpersService } from '../services/helpers.service';

@Injectable()

export class UsersEffects {
  constructor(
    private actions: Actions,
    private userService: UsersService,
    private router: Router,
    private helpers: HelpersService,
  ) {
  }

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.userService.registerUser(userData).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Register successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(registerUserFailure)
  ))))


    loginUser = createEffect(() => this.actions.pipe(
    ofType(loginRequest),
    mergeMap(({userData}) => this.userService.login(userData).pipe(
      map(user => loginSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Login successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginFailure)
    ))
  ))

  loginUserFb = createEffect(() => this.actions.pipe(
    ofType(loginFbRequest),
    mergeMap(({userData}) => this.userService.loginFb(userData).pipe(
      map(user => loginFbSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Signed in successful with Facebook!');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginFbFailure)
    ))
  ))

  loginUserGoogle = createEffect(() => this.actions.pipe(
    ofType(loginGoogleRequest),
    mergeMap(({userData}) => this.userService.loginGoogle(userData).pipe(
      map(user => loginGoogleSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Signed in successful with Google!');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginGoogleFailure)
    ))
  ))

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    mergeMap(() => {
      return this.userService.logout().pipe(
        map(() => logoutUser()),
        tap(() => {
          void this.router.navigate(['/']);
          this.helpers.openSnackbar('Logout successful');
        })
      );
    }))
  )
}

