import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { DirectivesModule } from '../../directives/directives.module';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    DirectivesModule,
    SuperTabsModule
  ],
})
export class HomePageModule { }
