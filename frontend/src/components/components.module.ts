import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { AccountDetailComponent } from './account-detail/account-detail';
@NgModule({
	declarations: [LoginComponent,
    AccountDetailComponent],
	imports: [ReactiveFormsModule,
		IonicModule.forRoot(LoginComponent)],
	exports: [LoginComponent,
    AccountDetailComponent]
})
export class ComponentsModule { }
