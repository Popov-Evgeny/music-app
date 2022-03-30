import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUserData, LoginUserDataFb, RegisterUserData, User } from '../models/user.model';
import { environment, environment as env } from '../../environments/environment';

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

  loginFb(userData: LoginUserDataFb) {
    return this.http.post<User>(environment.apiUrl + '/users/facebookLogin', userData);
  }

  logout() {
    return this.http.delete(env.apiUrl + '/users/sessions');
  }
}
