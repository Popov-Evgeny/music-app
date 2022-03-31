import { createAction, props } from '@ngrx/store';
import { LoginError, LoginUserData, RegisterError, RegisterUserData, User } from '../models/user.model';
import { SocialUser } from 'angularx-social-login';

export const registerUserRequest = createAction('[Users] Register Request', props<{userData: RegisterUserData}>());
export const registerUserSuccess = createAction('[Users] Register Success', props<{user: User}>());
export const registerUserFailure = createAction('[Users] Register Failure', props<{error: null | RegisterError}>());

export const loginRequest = createAction('[Users] Login Request', props<{userData: LoginUserData}>());
export const loginSuccess = createAction('[Users] Login Success', props<{user: User}>());
export const loginFailure = createAction('[Users] Login Failure', props<{error: null | LoginError}>());

export const loginFbRequest = createAction('[Users] Login Fb Request', props<{userData: SocialUser}>());
export const loginFbSuccess = createAction('[Users] Login Fb Success', props<{user: User}>());
export const loginFbFailure = createAction('[Users] Login Fb Failure', props<{error: null | LoginError}>());

export const loginGoogleRequest = createAction('[Users] Login Google Request', props<{userData: SocialUser}>());
export const loginGoogleSuccess = createAction('[Users] Login Google Success', props<{user: User}>());
export const loginGoogleFailure = createAction('[Users] Login Google Failure', props<{error: null | LoginError}>());

export const logoutUser = createAction('[Users] Logout');
export const logoutUserRequest = createAction('[Users] Server Logout Request');
