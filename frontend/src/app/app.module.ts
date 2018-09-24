import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicImageLoader } from 'ionic-image-loader';
import { ParallaxHeaderDirective } from '../directives/parallax-header/parallax-header';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ProductProvider } from '../providers/product/product';
import { ProductDetailPage } from '../pages/product-detail/product-detail';


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        LoginPage,
        SignUpPage,
        ProductDetailPage,
        ParallaxHeaderDirective
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp, {
            scrollPadding: false,
            scrollAssist: false
        }),
        IonicImageLoader.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        LoginPage,
        SignUpPage,
        ProductDetailPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ProductProvider
    ]
})
export class AppModule { }
