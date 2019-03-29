import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
import { DirectivesModule } from '../../directives/directives.module';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    ProductDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductDetailPage),
    DirectivesModule,
    IonicImageLoader
  ],
})
export class ProductDetailPageModule { }
