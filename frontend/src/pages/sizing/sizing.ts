import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StoreProvider } from '../../providers/store/store';

/**
 * Generated class for the SizingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "sizing"
})
@Component({
  selector: 'page-sizing',
  templateUrl: 'sizing.html',
})
export class SizingPage {

  sizingGuide

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storeProvider: StoreProvider,
    public loadingCtrl: LoadingController, ) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Fetching data',
      spinner: 'dots',
    });
    loading.present();
    this.storeProvider.sizingGuide().subscribe(contactUs => {
      this.sizingGuide = contactUs
      loading.dismiss();
    })
  }

}
