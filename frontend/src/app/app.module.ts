import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicImageLoader } from 'ionic-image-loader';
import { IonicStorageModule } from '@ionic/storage';
import { SuperTabsModule } from 'ionic2-super-tabs';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductProvider } from '../providers/product/product';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { CustomerProvider } from '../providers/customer/customer';
import { SharedModule } from '../shared/shared.module';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';
import { CartProvider } from '../providers/cart/cart';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StoreProvider } from '../providers/store/store';
import { ComponentsModule } from '../components/components.module';


@NgModule({
    declarations: [
        MyApp,
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
        SharedModule,
        ComponentsModule,
        SuperTabsModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ProductProvider,
        WheelSelector,
        CustomerProvider,
        AuthenticateProvider,
        InAppBrowser,
        CartProvider,
        StoreProvider,
    ]
})
export class AppModule { }
