import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { ProductDetailPage } from '../product-detail/product-detail';
import _ from 'underscore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  productArray = [];

  constructor(public navCtrl: NavController,
    public productProvider: ProductProvider,
    public alertCtrl: AlertController,
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

    this.productProvider.retrieveAllProducts().subscribe(products => {
      console.log(products)
      loading.dismiss();
      if (products.responseStatus) {
        for (let product of products.result.data) {
          this.productArray.push({
            id: product.id,
            name: product.name,
            images: _.sortBy(product.images, 'sort_order'),
            price: product.price
          })
        }
        console.log(this.productArray);
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'There is an error',
          subTitle: 'Error Code ' + products.error.code,
          buttons: ['Dismiss']
        });
        alert.present();
      }
      console.log(this.productArray)
    })
  }

  onProductDetail(productId) {
    this.navCtrl.push(ProductDetailPage, {
      productId: productId
    });
  }
}
