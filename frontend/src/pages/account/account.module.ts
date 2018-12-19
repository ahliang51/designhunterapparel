import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { AccountPage } from './account';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AccountPage,
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(AccountPage),
    ComponentsModule
  ],
})
export class AccountPageModule { }
