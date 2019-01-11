import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
    public navCtrl: NavController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, ) {
  }

  myOrders() {
    this.navCtrl.push('account-orders')
  }

  myInfo() {
    this.navCtrl.push('account-info')
  }

  signOut() {
    let loading = this.loadingCtrl.create({
      content: 'Fetching data',
      spinner: 'dots',
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 10000);

    let toast = this.toastCtrl.create({
      message: 'You have signed out',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();

    this.storage.remove('token').then(result => {
      loading.dismiss()
      this.navCtrl.setRoot('home')
      toast.present()
    }
    )
  }

}
