import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutRequest, logoutUser,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
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


  // logoutUser = createEffect(() => this.actions.pipe(
  //   ofType(logoutRequest),
  //   mergeMap(() => this.userService.logout().pipe(
  //     map(() => logoutUser()),
  //     tap(() => {
  //       this.helpers.openSnackbar('Logout successful'),
  //         void this.router.navigate(['/']);
  //     })
  //   ))
  // ))

  // logoutUser1 = createEffect(() => this.actions.pipe(
  //   ofType(logoutRequest),
  //   mergeMap(() => this.userService.logout().pipe(
  //       map(() => logoutUser()),
  //       tap(() => {
  //         this.helpers.openSnackbar('Logout successful');
  //         void this.router.navigate(['/']);
  //       })
  //     ))
  //   ))
  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutRequest),
    mergeMap(() => this.userService.logout()),
        map(() => logoutUser()),
        tap(() => {
          this.helpers.openSnackbar('Logout successful');
          void this.router.navigate(['/'])
    }))
  )
}

