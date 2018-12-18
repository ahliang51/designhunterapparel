import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [LoginComponent],
	imports: [ReactiveFormsModule,
		IonicModule.forRoot(LoginComponent)],
	exports: [LoginComponent]
})
export class ComponentsModule { }
