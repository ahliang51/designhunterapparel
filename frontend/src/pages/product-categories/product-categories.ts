import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { ImageAttribute } from 'ionic-image-loader'
import { ProductListPage } from '../product-list/product-list';

/**
 * Generated class for the ProductCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "product-categories"
})
@Component({
  selector: 'page-product-categories',
  templateUrl: 'product-categories.html',
})
export class ProductCategoriesPage {

  productCategories
  rootNavCtrl: NavController;
  imageAttributes: ImageAttribute[] = [];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productProvider: ProductProvider,
    public loadingCtrl: LoadingController,
  ) {
    this.imageAttributes.push({
      element: 'class',
      value: 'product-categories'
    })
    this.rootNavCtrl = navParams.get('rootNavCtrl');
  }

  ionViewDidLoad() {
    this.productProvider.retrieveProductCategories().subscribe(productCategories => {
      this.productCategories = productCategories
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
