import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { WheelSelector } from '@ionic-native/wheel-selector';
import _ from 'underscore';
import { BagPage } from '../bag/bag';
import { Storage } from '@ionic/storage';
import { CartProvider } from '../../providers/cart/cart';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "product-detail"
})
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  productId;
  productDetail;
  productPrice;
  imageArray;
  variantArray = [];
  variantIndex = 0;
  itemQuantity = 1;
  selectedOption = "Select Option";
  isOptionSelected = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productProvider: ProductProvider,
    public loadingCtrl: LoadingController,
    public selector: WheelSelector,
    public toastCtrl: ToastController,
    public storage: Storage,
    public cartProvider: CartProvider) {
    this.productId = navParams.get("productId")
  }

  getDeviceHeight() {
    return (window.screen.height * 0.80) + "px"; //To set the image to 80% of the height
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

    if (this.productId != "") {

      this.productProvider.retrieveProductDetail(this.productId).subscribe(productDetail => {
        loading.dismiss();
        // console.log(productDetail.result.data)
        this.productDetail = productDetail.result.data;
        this.productPrice = this.productDetail.price
        this.imageArray = _.sortBy(productDetail.result.data.images, 'sort_order');
        for (let variant of this.productDetail.variants) {
          let optionName = "";
          console.log(variant)
          for (let option of variant.option_values) {
            optionName = optionName + " " + option.label

          }
          if (variant.price) {
            optionName = optionName + " - $" + variant.price
          }

          this.variantArray.push({
            variantId: variant.id,
            description: optionName,
            price: variant.price
          })
        }
        console.log(productDetail)
        // console.log(this.variantArray)
      })
      // console.log(this.productDetail)
    }
  }

  selectOption() {

    this.selector.show({
      title: "Select Options",
      items: [
        this.variantArray, [{
          description: "1 Quantity"
        }, {
          description: "2 Quantity"
        }, {
          description: "3 Quantity"
        }]
      ],
      positiveButtonText: "Select",
      defaultItems: [
        { index: 0, value: this.variantArray[0].description },
      ]
    }).then(
      result => {
        this.selectedOption = result[0].description
        this.isOptionSelected = true
        this.variantIndex = result[0].index
        this.itemQuantity = result[1].index + 1
        console.log(this.variantArray[result[0].index].price)
        this.productPrice = this.variantArray[result[0].index].price
        console.log(result[0].description + ' at index: ' + result[0].index + " with " + this.itemQuantity);
      },
      err => console.log('Error: ', err)
    );
  }

  onBag() {
    this.navCtrl.push("bag")
  }

  addToCart() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 10000
    });
    loading.present();



    this.storage.get('cartId').then(cartId => {
      //There is existing cart, add product to cart
      if (cartId) {
        console.log(cartId)
        let product = [{
          "quantity": this.itemQuantity,
          "product_id": this.productId,
          "variant_id": this.productDetail.variants[this.variantIndex].id
        }]

        this.cartProvider.addToCart(cartId, product).subscribe(result => {
          console.log(result)
          loading.dismiss();
          if (result.responseStatus) {
            let toast = this.toastCtrl.create({
              message: 'Added To Cart',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
          }
          else {
            let toast = this.toastCtrl.create({
              message: 'Error ' + result.error.code,
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
          }
        })
      }

      //There are no existing cart
      else {
        this.storage.get('token').then(token => {
          console.log(token)
          if (!token) {
            let toast = this.toastCtrl.create({
              message: 'Please Sign in first',
              duration: 2000,
              position: 'bottom'
            });
            toast.present()
            loading.dismiss()
          }
          else {
            let product = [{
              "quantity": this.itemQuantity,
              "product_id": this.productId,
              "variant_id": this.productDetail.variants[this.variantIndex].id
            }]
            this.cartProvider.createCart(token, product).subscribe(cart => {
              console.log(cart)
              loading.dismiss();

              if (cart.responseStatus) {
                this.storage.set('cartId', cart.cart.data.id)
                let toast = this.toastCtrl.create({
                  message: 'Added To Cart',
                  duration: 2000,
                  position: 'bottom'
                });
                toast.present();
              }
              else {
                let toast = this.toastCtrl.create({
                  message: 'Error ' + cart.error.code,
                  duration: 2000,
                  position: 'bottom'
                });
                toast.present();
              }
            })
          }
        })
      }
    })
  }
}
