import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginForm: FormGroup;
  public sessionToken: String;

  constructor(private builder: FormBuilder, private http: HttpClient) {
    if (localStorage.getItem('authToken'))
      this.sessionToken = localStorage.getItem('authToken');

    this.initializeForms();
  }

  initializeForms() {
    this.loginForm = this.builder.group({
      email: [
        'mba858@gmail.com',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['Admin@123', [Validators.required, Validators.minLength(6)]],
    });
  }

  clearSession() {
    localStorage.removeItem('authToken');
    this.sessionToken = null;
  }

  /**
   * Params for POST type login api {email, password}
   * @param params
   * @returns
   */
  loginApi(params) {
    var url = `${environment.apiBaseUrl}login`;
    return this.http.post(url, params);
  }

  /**
   * Form Group Getters
   */

  get loginFormGroup() {
    return this.loginForm;
  }

  get emailControl() {
    return this.loginForm.get('email');
  }
  get passwordControl() {
    return this.loginForm.get('password');
  }
}
