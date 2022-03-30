import { UserState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  loginFailure, loginFbFailure, loginFbRequest, loginFbSuccess,
  loginRequest,
  loginSuccess,
  logoutUser,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null
};

export  const userReducer = createReducer(
  initialState,
  on(registerUserRequest, state => ({...state, registerLoading: true, registerError: null})),
  on(registerUserSuccess, (state, {user}) => ({...state, registerLoading: false, user})),
  on(registerUserFailure, (state, {error}) => ({...state, registerLoading: false, registerError: error})),

  on(loginRequest, state => ({...state, loginLoading: true, loginError: null,})),
  on(loginSuccess, (state, {user}) => ({...state, loginLoading: false, user})),
  on(loginFailure, (state, {error}) => ({...state, loginLoading: false, loginError: error})),

  on(loginFbRequest, state => ({...state, loginLoading: true, loginError: null,})),
  on(loginFbSuccess, (state, {user}) => ({...state, loginLoading: false, user})),
  on(loginFbFailure, (state, {error}) => ({...state, loginLoading: false, loginError: error})),

  on(logoutUser, state => ({...state, user: null,}))
)
