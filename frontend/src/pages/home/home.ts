import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, IonicPage } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { ProductDetailPage } from '../product-detail/product-detail';
import _ from 'underscore';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Storage } from '@ionic/storage';
import { BagPage } from '../bag/bag';

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
    this.navCtrl.push("product-detail", {
      productId: productId
    });
  }

  onBag() {
    this.navCtrl.push("bag")
  }

  onTabSelect(ev: any) {
    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
    this.tabName = ev.id;
  }
}
