import { Component } from '@angular/core';

/**
 * Generated class for the AccountDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'account-detail',
  templateUrl: 'account-detail.html'
})
export class AccountDetailComponent {

  text: string;

  constructor() {
    console.log('Hello AccountDetailComponent Component');
    this.text = 'Hello World';
  }

}
