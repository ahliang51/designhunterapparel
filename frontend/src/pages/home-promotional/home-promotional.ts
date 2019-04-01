import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { ProductListPage } from '../product-list/product-list';
import { StoreProvider } from '../../providers/store/store';

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

  promoProduct;
  banners = [];
  rootNavCtrl: NavController;
  storePath = "http://store-5q1eg0d0bi.mybigcommerce.com";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productProvider: ProductProvider,
    public storeProvider: StoreProvider,
    public loadingCtrl: LoadingController) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
  }

  ionViewDidLoad() {
    this.storeProvider.retrieveBanners().subscribe(data => {
      for (let banner of data) {
        let source = banner.content;
        let index = banner.content.search('src');
        // let fileType = banner.content.search('png');
        let fileType = banner.content.indexOf("png", banner.content.indexOf("png") + 1);
        let imagePath = this.storePath + source.substring(index + 28, fileType + 3)
        this.banners.push({
          src: imagePath
        });
      }
    })

    this.productProvider.retrievePromoProductCategories().subscribe(promoProduct => {
      this.promoProduct = promoProduct;
    })

  }

  filterProductByCategories(categoryName, categoryId) {
    let loading = this.loadingCtrl.create({
      content: 'Fetching data',
      spinner: 'dots',
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 10000);

    this.productProvider.filterProductByCategories(categoryId).subscribe(products => {
      loading.dismiss();
      this.rootNavCtrl.push("product-list", {
        categoryName: categoryName,
        productsArray: products
      })
    })
  }

}
