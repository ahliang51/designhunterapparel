import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePromotionalPage } from './home-promotional';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    HomePromotionalPage,
  ],
  imports: [
    IonicPageModule.forChild(HomePromotionalPage),
    IonicImageLoader
  ],
})
export class HomePromotionalPageModule { }
