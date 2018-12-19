import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController } from 'ionic-angular/navigation/nav-controller';

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


  constructor(public navParams: NavParams,
    public navCtrl: NavController, ) {
  }

  myOrders() {
    this.navCtrl.push('account-orders')
  }


}
