import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  /**
   * Offers API
   * GET type
   * @returns
   */
  getOffersApi() {
    var url = `${environment.apiBaseUrl}offers`;
    return this.http.get(url);
  }

  /**
   * Get Subscriptions of offer API
   * GET type
   * @returns
   */
  getOfferSubscriptionsApi(offerId) {
    var url = `${environment.apiBaseUrl}offers/${offerId}/subscriptions`;
    return this.http.get(url);
  }
}
