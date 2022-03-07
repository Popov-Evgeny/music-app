import { UserState } from './types';
import { createReducer, on } from '@ngrx/store';
import { registerUserFailure, registerUserRequest, registerUserSuccess } from './users.actions';

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null
};

export  const userReducer = createReducer(
  initialState,
  on(registerUserRequest, state => ({
    ...state,
      registerLoading: true,
      registerError: null
  })),
  on(registerUserSuccess, (state, {user}) => ({
    ...state,
    registerLoading: false,
    user
  })),
  on(registerUserFailure, (state, {error}) => ({
    ...state,
    registerLoading: false,
    registerError: error
  }))
)
