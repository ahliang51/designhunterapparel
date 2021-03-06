import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import * as vars from '../../global-variable';

/*
  Generated class for the StoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreProvider {

  constructor(public http: Http) {
  }

  contactUs() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(vars.apiUrl + '/store/contact-us', { headers: headers })
      .map(res => res.json());
  }

  sizingGuide() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(vars.apiUrl + '/store/sizing', { headers: headers })
      .map(res => res.json());
  }

  retrievePages() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(vars.apiUrl + '/store/pages', { headers: headers })
      .map(res => res.json());
  }

  retrieveBanners() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(vars.apiUrl + '/store/banner', { headers: headers })
      .map(res => res.json());
  }

}
