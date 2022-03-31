import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUserData, LoginUserDataFb, RegisterUserData, User } from '../models/user.model';
import { environment, environment as env } from '../../environments/environment';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  registerUser(userData: RegisterUserData) {
    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('name', userData.name);
    formData.append('password', userData.password);

    if (userData.avatar) {
      formData.append('avatar', userData.avatar);
    }
    return this.http.post<User>(env.apiUrl + '/users', formData);
  }

  login(userData: LoginUserData) {
    return this.http.post<User>(env.apiUrl + '/users/sessions', userData);
  }

  loginFb(userData: SocialUser) {
    return this.http.post<User>(environment.apiUrl + '/users/facebookLogin', userData);
  }

  loginGoogle(userData: SocialUser) {
    return this.http.post<User>(environment.apiUrl + '/users/googleLogin', userData);
  }

  logout() {
    return this.http.delete(env.apiUrl + '/users/sessions');
  }
}
