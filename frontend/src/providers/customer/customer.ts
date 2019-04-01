import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

import * as vars from '../../global-variable';
/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomerProvider {

  constructor(public http: Http) {
  }

  signUp(credentials) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(vars.apiUrl + '/auth/sign-up', credentials, { headers: headers })
      .map(res => res.json());
  }

  signIn(credentials) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(vars.apiUrl + '/auth/login', credentials, { headers: headers })
      .map(res => res.json());
  }


}
