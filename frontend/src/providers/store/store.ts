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
    console.log('Hello StoreProvider Provider');
  }

  contactUs() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(vars.apiUrl + '/store/contact-us', { headers: headers })
      .map(res => res.json());
  }

}
