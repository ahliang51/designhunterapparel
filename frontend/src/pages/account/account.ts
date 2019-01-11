import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "account"
})
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  isLoggedIn: boolean = false

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Fetching data',
      spinner: 'dots',
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 10000);

    this.storage.get('token').then(token => {
      if (token) {
        this.isLoggedIn = true
      }
      else {
        this.isLoggedIn = false
      }
      loading.dismiss()
    })
  }



}
