import { createAction, props } from '@ngrx/store';
import { LoginError, LoginUserData, RegisterError, RegisterUserData, User } from '../models/user.model';

export const registerUserRequest = createAction('[Users] Register Request', props<{userData: RegisterUserData}>());
export const registerUserSuccess = createAction('[Users] Register Success', props<{user: User}>());
export const registerUserFailure = createAction('[Users] Register Failure', props<{error: null | RegisterError}>());

export const loginRequest = createAction('[Users] Login Request', props<{userData: LoginUserData}>());
export const loginSuccess = createAction('[Users] Login Success', props<{user: User}>());
export const loginFailure = createAction('[Users] Login Failure', props<{error: null | LoginError}>());

// export const loginFbRequest = createAction('[Users] Login Fb Request', props<{userData: LoginUserData}>());
// export const loginFbSuccess = createAction('[Users] Login Fb Success', props<{user: User}>());
// export const loginFbFailure = createAction('[Users] Login Fb Failure', props<{error: null | LoginError}>());


// export const logoutUser = createAction('[Users] Logout');
// export const userLogout = createAction('[Users] Logout')
export const logoutUser = createAction('[Users] Logout Request');

export const logoutRequest = createAction('[Users] Logout Server Request');
