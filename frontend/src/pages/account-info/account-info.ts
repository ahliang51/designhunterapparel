import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../shared/password.validator';

/**
 * Generated class for the AccountInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'account-info'
})
@Component({
  selector: 'page-account-info',
  templateUrl: 'account-info.html',
})
export class AccountInfoPage {

  infoArray
  updateForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public profileProvider: ProfileProvider,
    public formBuilder: FormBuilder,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[^@]+@[^\.]+\..+')]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(7), Validators.pattern('^[A-Za-z0-9]{7,}$')]],
      confirmPassword: ['', Validators.required],
    }, { validator: PasswordValidation.MatchPassword });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountInfoPage');
    this.storage.get('token').then(token => {
      console.log(token)
      this.profileProvider.retrieveInfo({ token: token }).subscribe(info => {
        console.log(info)
        this.infoArray = info
      })
    })
  }

}
