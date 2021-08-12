import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public showSpinner: boolean;

  constructor(
    public authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Login form submit
   */
  submit() {
    if (this.authService.loginFormGroup.invalid) {
      this._snackBar.open('Email/Password invalid!', 'Dance', {
        duration: 2000,
      });
    } else {
      this.showSpinner = true;
      this.authService
        .loginApi({})
        // this.authService.loginApi(this.authService.loginFormGroup.value)   // In case params to send
        .subscribe(
          (response: any) => {
            this.showSpinner = false;
            this.authService.setSessionToken(response.authToken);
            this.router.navigate(['/home']);
          },
          (errorr) => {
            this.showSpinner = false;
            this._snackBar.open('Email/Password invalid!', 'Dance', {
              duration: 2000,
            });
          }
        );
    }
  }
}
