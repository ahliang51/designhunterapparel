import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'pages'
})
@Component({
  selector: 'page-pages',
  templateUrl: 'pages.html',
})
export class PagesPage {

  bodyText;
  title;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bodyText = navParams.get('body')
    this.title = navParams.get('title')
    console.log(this.bodyText)
    console.log(this.title)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesPage');
  }

}
