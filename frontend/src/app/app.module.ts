import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicImageLoader } from 'ionic-image-loader';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ProductProvider } from '../providers/product/product';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { CustomerProvider } from '../providers/customer/customer';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from '../directives/directives.module';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';
import { BagPage } from '../pages/bag/bag';


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        BagPage
        // LoginPage,
        // SignUpPage,
        // ProductDetailPage,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp, {
            // scrollPadding: false,
            // scrollAssist: false
        }),
        IonicImageLoader.forRoot(),
        IonicStorageModule.forRoot(),
        SharedModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        LoginPage,
        SignUpPage,
        ProductDetailPage,
        BagPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ProductProvider,
        WheelSelector,
        CustomerProvider,
        AuthenticateProvider,
    ]
})
export class AppModule { }
