import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CustomerProvider } from '../../providers/customer/customer';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SignUpPage } from '../../pages/sign-up/sign-up';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {

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

  onSignUp() {
    this.navCtrl.push("sign-up");
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
      if (result.responseStatus) {
        this.storage.set('token', result.token)
        let toast = this.toastCtrl.create({
          message: "Login success!",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.setRoot("home", {}, { animate: true, direction: 'forward' });
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
