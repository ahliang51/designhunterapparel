import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { Storage } from '@ionic/storage';

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
  cartAmount

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartProvider: CartProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BagPage');
    this.storage.get('cartId').then(cartId => {
      this.cartProvider.retrieveCart(cartId).subscribe(cartInfo => {
        console.log(cartInfo)
        this.cartInfo = cartInfo
        this.cartAmount = cartInfo.data.cart_amount
        this.cartSize = cartInfo.data.line_items.physical_items.length
        this.cartArray = cartInfo.data.line_items.physical_items
        console.log(this.cartArray)
      })
    })
  }

}
