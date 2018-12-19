import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { ProductListPage } from '../product-list/product-list';

/**
 * Generated class for the HomePromotionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "home-promotional"
})
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
      console.log(this.promoProduct)
    })
  }

  filterProductByCategories(categoryName, categoryId) {
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
      console.log(categoryName)
      this.rootNavCtrl.push("product-list", {
        categoryName: categoryName,
        productsArray: products
      })
    })
  }

}
