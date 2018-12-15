import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { LoginPage } from '../login/login';

/**
 * Generated class for the HomePromotionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-promotional',
  templateUrl: 'home-promotional.html',
})
export class HomePromotionalPage {

  promoProduct
  rootNavCtrl: NavController;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productProvider: ProductProvider,
    public loadingCtrl: LoadingController) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePromotionalPage');
    this.productProvider.retrievePromoProductCategories().subscribe(promoProduct => {
      this.promoProduct = promoProduct;
    })
  }

  filterProductByCategories(categoryId) {
    console.log(categoryId)
    let loading = this.loadingCtrl.create({
      content: 'Fetching data',
      spinner: 'dots',
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 10000);

    this.productProvider.filterProductByCategories(categoryId).subscribe(products => {
      console.log(products);
      loading.dismiss();
      this.rootNavCtrl.push(LoginPage)
    })
  }

}
