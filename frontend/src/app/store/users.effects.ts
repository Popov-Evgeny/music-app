import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  loginFailure,
  loginRequest,
  loginSuccess, logoutRequest, logoutUser,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';
import { catchError, mergeMap, NEVER, of, tap, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable()

export  class UsersEffects {
  constructor(
    private actions: Actions,
    private userService: UsersService,
    private router: Router,
    private snackbar: MatSnackBar,
    private helpers: HelpersService,
    private store: Store<AppState>
  ) {}

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.userService.registerUser(userData).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.snackbar.open('Register successful', 'OK', {duration: 4000});
        void this.router.navigate(['/']);
      }),
      catchError( reqErr => {
        let registerError = null;
        if (reqErr instanceof HttpErrorResponse && reqErr.status === 400) {
          registerError = reqErr.error;
        } else {
          this.snackbar.open('Server Error', 'OK', {duration: 4000});
        }
        return of(registerUserFailure({error: registerError}));
      })
    ))
  ))

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

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutRequest),
    withLatestFrom(this.store.select(state => state.users.user  )),
    mergeMap(([_, user]) => {
      if (user) {
        return this.userService.logout(user.token).pipe(
          map(() => logoutUser()),
          tap(() => {
            this.helpers.openSnackbar('Logout successful');
            void this.router.navigate(['/']);
          })
        );
      }
      return NEVER;
    }))
  )
}

