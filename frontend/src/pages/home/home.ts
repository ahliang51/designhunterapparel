import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, IonicPage } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { ProductDetailPage } from '../product-detail/product-detail';
import _ from 'underscore';

@IonicPage({
  name: "home"
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  productArray = [];
  tabName = "Home"

  page1 = "home-promotional"
  page2 = "product-categories"

  constructor(public navCtrl: NavController,
    public productProvider: ProductProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {

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
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'There is an error',
          subTitle: 'Error Code ' + products.error.code,
          buttons: ['Dismiss']
        });
        alert.present();
      }
    })
  }

  onProductDetail(productId) {
    this.navCtrl.push("product-detail", {
      productId: productId
    });
  }

  onBag() {
    this.navCtrl.push("bag")
  }

  onSearch() {
    this.navCtrl.push("search")
  }

  onTabSelect(ev: any) {
    this.tabName = ev.id;
  }
}
