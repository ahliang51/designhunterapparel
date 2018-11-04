import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the BagPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bag',
  templateUrl: 'bag.html',
})
export class BagPage {

  cartArray = []
  cartInfo = {}
  cartSize
  variantText = ""
  cartAmount
  testradioOpen: boolean;
  testradioResult;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartProvider: CartProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public inAppBrowser: InAppBrowser,
    public platform: Platform) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Fetching data',
      spinner: 'dots',
    });

    loading.present();
    this.storage.get('cartId').then(cartId => {
      this.cartProvider.retrieveCart(cartId).subscribe(cartInfo => {
        loading.dismiss();
        console.log(cartInfo)
        this.cartInfo = cartInfo
        this.cartAmount = cartInfo.data.cart_amount
        this.cartSize = cartInfo.data.line_items.physical_items.length
        this.cartArray = cartInfo.data.line_items.physical_items

        for (let item of this.cartArray) {
          console.log(item)
          for (let option of item.options) {
            item.variantText += option.name + " " + option.value + " \n";
            console.log(this.variantText)
          }
        }
        console.log(this.cartArray)
      })
    })
  }

  onRemove(index) {


    //Creating a local variable to store cart array due to nested callback
    let localCart = [];
    localCart = this.cartArray;

    let alert = this.alertCtrl.create({
      title: 'Confirm Remove',
      message: 'Do you want to remove this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: "Loading",
              spinner: 'dots',
            });
            loading.present();
            if (this.cartArray.length > 1) {
              // console.log(JSON.stringify(this.cartArray))
              this.storage.get('cartId').then(cart => {
                this.cartProvider.removeItem(cart, localCart[index].id).subscribe(result => {
                  // console.log(JSON.stringify(result))
                  this.ionViewDidLoad();

                })
              })
            }
            else {
              this.storage.remove('cartId');
              this.ionViewDidLoad();
            }
            loading.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  onEdit(index) {
    let alert = this.alertCtrl.create({
      title: 'Select Quantity',
    });

    alert.addInput({
      type: 'radio',
      label: '1',
      value: '1',
      checked: true
    });

    for (let i = 2; i <= 10; i++) {
      alert.addInput({
        type: 'radio',
        label: i.toString(),
        value: i.toString()
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Update',
      handler: data => {
        console.log('radio data:', data);
        this.testradioOpen = false;
        this.testradioResult = data;
        let loading = this.loadingCtrl.create({
          content: 'Please wait...',
        });
        loading.present();

        this.storage.get('cartId').then(cart => {
          this.cartProvider.updateCart(cart, this.cartArray[index].id, this.cartArray[index].product_id, data).subscribe(result => {
            loading.dismiss();
            if (result.code) {
              let alert = this.alertCtrl.create({
                title: 'Not Enough Stock',
                subTitle: 'We do not have enough stock for the quantity you had chosen',
                buttons: ['Dismiss']
              });
              alert.present();
            }
            else {
              this.ionViewDidLoad();
            }
          })
        })
      }
    });
    alert.present().then(() => {
      this.testradioOpen = true;
    });
  }

  checkOut() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loading.present();

    let paymentMade = false;
    this.storage.get('cartId').then(cartId => {
      console.log(cartId)
      this.storage.get('token').then(token => {
        this.cartProvider.placeOrder(token, cartId).subscribe(data => {
          loading.dismiss();
          this.platform.ready().then(() => {
            let browser = this.inAppBrowser.create(data.result, '_blank', {
              location: 'no',
              zoom: 'no'
            });

            browser.on('exit').subscribe(result => {
              // this.navCtrl.setRoot(CartPage);
              if (paymentMade) {
                this.ionViewDidLoad();
              }
            })

            browser.on('loadstart').subscribe(event => {
              if (event.url.includes("order-confirmation") || event.url.includes("finishorder")) {
                paymentMade = true
                this.storage.remove('cart')
              }
            })
          })
        })
      })
    })
  }

}
