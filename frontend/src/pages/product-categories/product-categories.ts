import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { ImageAttribute } from 'ionic-image-loader'

/**
 * Generated class for the ProductCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-categories',
  templateUrl: 'product-categories.html',
})
export class ProductCategoriesPage {

  productCategories
  imageAttributes: ImageAttribute[] = [];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productProvider: ProductProvider,
  ) {
    this.imageAttributes.push({
      element: 'class',
      value: 'product-categories'
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductCategoriesPage');
    this.productProvider.retrieveProductCategories().subscribe(productCategories => {
      console.log(productCategories)
      this.productCategories = productCategories
    })
  }

}
