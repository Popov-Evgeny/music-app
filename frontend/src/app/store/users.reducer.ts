import { UserState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  loginFailure,
  loginFbFailure,
  loginFbRequest,
  loginFbSuccess,
  loginGoogleFailure,
  loginGoogleRequest,
  loginGoogleSuccess,
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
  loadingFb: false,
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

  on(loginFbRequest, state => ({...state, loadingFb: true, loginError: null,})),
  on(loginFbSuccess, (state, {user}) => ({...state, loadingFb: false, user})),
  on(loginFbFailure, (state, {error}) => ({...state, loadingFb: false, loginError: error})),

  on(loginGoogleRequest, state => ({...state, loadingFb: true, loginError: null,})),
  on(loginGoogleSuccess, (state, {user}) => ({...state, loadingFb: false, user})),
  on(loginGoogleFailure, (state, {error}) => ({...state, loadingFb: false, loginError: error})),

  on(logoutUser, state => ({...state, user: null,}))
)
