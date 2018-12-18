import { NgModule } from "@angular/core";
import { DirectivesModule } from "../directives/directives.module";
import { ProductDetailPageModule } from "../pages/product-detail/product-detail.module";
import { ProductDetailPage } from "../pages/product-detail/product-detail";
import { SignUpPageModule } from "../pages/sign-up/sign-up.module";
import { ParallaxHeaderDirective } from "../directives/parallax-header/parallax-header";

@NgModule({
 imports: [ProductDetailPageModule, SignUpPageModule],
 declarations: [],
 exports: [ProductDetailPageModule, SignUpPageModule]
})
export class SharedModule { }