import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountOrdersPage } from './account-orders';

@NgModule({
  declarations: [
    AccountOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountOrdersPage),
  ],
})
export class AccountOrdersPageModule { }
