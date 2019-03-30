import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SizingPage } from './sizing';

@NgModule({
  declarations: [
    SizingPage,
  ],
  imports: [
    IonicPageModule.forChild(SizingPage),
  ],
})
export class SizingPageModule {}
