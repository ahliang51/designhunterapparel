import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import _ from 'underscore';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  productId;
  productDetail;
  imageArray;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productProvider: ProductProvider,
    public loadingCtrl: LoadingController) {
    this.productId = navParams.get("productId")
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

    this.productProvider.retrieveProductDetail(this.productId).subscribe(productDetail => {
      loading.dismiss();
      console.log(productDetail.result.data)
      this.productDetail = productDetail.result.data;
      this.imageArray = _.sortBy(productDetail.result.data.images, 'sort_order');
    })
  }



}
