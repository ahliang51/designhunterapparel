import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StoreProvider } from '../../providers/store/store';

/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "contact-us"
})
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {

  contactUs
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storeProvider: StoreProvider,
    public loadingCtrl: LoadingController, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
    let loading = this.loadingCtrl.create({
      content: 'Fetching data',
      spinner: 'dots',
    });
    loading.present();
    this.storeProvider.contactUs().subscribe(contactUs => {
      console.log(contactUs)
      this.contactUs = contactUs
      loading.dismiss();
      console.log(this.contactUs)
    })
  }

}
