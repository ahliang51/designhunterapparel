import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "product-list"
})
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  categoryName
  productArray = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.categoryName = this.navParams.get("categoryName")
    this.productArray = this.navParams.get("productsArray").data
    console.log(this.productArray)
  }

  ionViewDidLoad() {
  }

  onProductDetail(productId) {
    this.navCtrl.push("product-detail", {
      productId: productId
    });
  }

}
