import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfileProvider } from '../../providers/profile/profile';

/**
 * Generated class for the AccountOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "account-orders"
})
@Component({
  selector: 'page-account-orders',
  templateUrl: 'account-orders.html',
})
export class AccountOrdersPage {

  orderArray

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public profileProvider: ProfileProvider) {
  }

  ionViewDidLoad() {
    this.storage.get('token').then(token => {
      this.profileProvider.retrieveOrders({ token: token }).subscribe(orders => {
        this.orderArray = orders
      })
    })
  }



}
