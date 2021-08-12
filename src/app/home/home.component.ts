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
  public offerSubscriptions: any = [];

  constructor(
    private router: Router,
    public authService: AuthService,
    public homeService: HomeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.showSpinner = true;
    this.homeService.getOffersApi().subscribe(
      (response: any) => {
        this.showSpinner = false;
        this.offers = response.offers;
        this.offers.map((x) => {
          x['subscriptions'] = [];
          x['loadingSubscriptions'] = false;
          x['showing'] = false;
        });
        console.log(this.offers);
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }

  /**
   * Loading per offer subscriptions
   */
  loadOfferSubscription(offer) {
    if (!offer.showing) {
      offer.loadingSubscriptions = true;
      offer.showing = true;
      this.homeService.getOfferSubscriptionsApi(offer.id).subscribe(
        (response: any) => {
          offer.loadingSubscriptions = false;
          offer.subscriptions = response.subscriptions;
          offer.subscriptions.forEach((offerSub) => {
            offerSub.usage.forEach((usage) => {
              let left = (usage.used / usage.limit) * 100;
              usage['left'] = parseInt(left + '');
            });
          });
        },
        (error) => {
          this._snackBar.open(
            'Failed to load subscriptions. Please try again!',
            'Dance',
            {
              duration: 2000,
            }
          );
          offer.loadingSubscriptions = false;
          offer.showing = false;
        }
      );
    } else offer.showing = false;
  }

  logout() {
    this.authService.clearSession();
    this.router.navigate(['/login']);
    this._snackBar.open('Logout Successfully!', 'Dance', {
      duration: 2000,
    });
  }
}
