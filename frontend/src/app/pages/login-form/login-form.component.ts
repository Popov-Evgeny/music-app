import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { LoginError, LoginUserData } from '../../models/user.model';
import { loginRequest } from '../../store/users.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent {
  @ViewChild('form') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | LoginError>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginRequest({userData}));
  }

}
