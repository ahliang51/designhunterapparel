import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { CustomerProvider } from '../../providers/customer/customer';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email;
  password;
  loginForm: FormGroup

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public customerProvider: CustomerProvider,
    public storage: Storage,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[^@]+@[^\.]+\..+')]],
      password: ['', Validators.required]
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  onSignUp() {
    this.navCtrl.push(SignUpPage);
  }

  onSignIn() {
    let loading = this.loadingCtrl.create({
      content: 'Loading',
      spinner: 'dots',
    });

    loading.present();
    this.customerProvider.signIn({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe(result => {
      console.log(result)
      if (result.responseStatus) {
        this.storage.set('token', result.token)
        let toast = this.toastCtrl.create({
          message: "Login success!",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' });
      }
      else {
        let toast = this.toastCtrl.create({
          message: result.error,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      loading.dismiss();
    })
  }
}
