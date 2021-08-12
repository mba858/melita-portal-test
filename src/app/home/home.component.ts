import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public showSpinner: boolean;
  public offers: any = [];

  constructor(
    private router: Router,
    public authService: AuthService,
    public homeService: HomeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.showSpinner = true;
    this.homeService.getOffersApi().subscribe(
      (response:any) => {
        this.showSpinner = false;
        console.log(response);
        this.offers = response.offers;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }

  logout() {
    this.authService.clearSession();
    this.router.navigate(['/login']);
    this._snackBar.open('Logout Successfully!', 'Dance', {
      duration: 2000,
    });
  }
}
