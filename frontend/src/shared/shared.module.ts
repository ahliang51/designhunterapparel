import { NgModule } from "@angular/core";
import { DirectivesModule } from "../directives/directives.module";
import { LoginPageModule } from "../pages/login/login.module";
import { LoginPage } from "../pages/login/login";
import { ProductDetailPageModule } from "../pages/product-detail/product-detail.module";
import { ProductDetailPage } from "../pages/product-detail/product-detail";
import { SignUpPageModule } from "../pages/sign-up/sign-up.module";
import { ParallaxHeaderDirective } from "../directives/parallax-header/parallax-header";

@NgModule({
 imports: [LoginPageModule, ProductDetailPageModule, SignUpPageModule],
 declarations: [],
 exports: [LoginPageModule, ProductDetailPageModule, SignUpPageModule]
})
export class SharedModule { }