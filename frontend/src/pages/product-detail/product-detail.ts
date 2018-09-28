import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { WheelSelector } from '@ionic-native/wheel-selector';
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
  variantArray = [];
  selectedOption = "Select Option";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productProvider: ProductProvider,
    public loadingCtrl: LoadingController,
    public selector: WheelSelector) {
    this.productId = navParams.get("productId")
  }

  getDeviceHeight() {
    return (window.screen.height * 0.9) + "px"; //To set the image to 80% of the height
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

      for (let variant of this.productDetail.variants) {
        console.log(variant)
        let optionName = "";
        for (let option of variant.option_values) {
          optionName = optionName + " " + option.label
        }
        console.log(optionName)
        this.variantArray.push({
          variantId: variant.id,
          description: optionName
        })
      }
      console.log(this.variantArray);
    })
  }

  selectOption() {
    this.selector.show({
      title: "Select Options",
      items: [
        this.variantArray
      ],
      positiveButtonText: "Select",
      defaultItems: [
        { index: 0, value: this.variantArray[0].description },
      ]
    }).then(
      result => {
        this.selectedOption = result[0].description
        console.log(result[0].description + ' at index: ' + result[0].index);
      },
      err => console.log('Error: ', err)
    );
  }



}
