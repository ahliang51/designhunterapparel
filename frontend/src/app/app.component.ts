import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ImageLoaderConfig } from 'ionic-image-loader';
import { StoreProvider } from '../providers/store/store';
import { p } from '@angular/core/src/render3';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = HomePage;
  rootPage: any = "home";

  pages: Array<{ title: string, component: any, body: string }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public imageLoaderConfig: ImageLoaderConfig,
    public storeProvider: StoreProvider) {
    imageLoaderConfig.setImageReturnType('base64');
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'My Account', component: "account", body: "" },
      // { title: 'LOG OUT', component: "account" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.storeProvider.retrievePages().subscribe(pages => {
        for (let page of pages) {
          if (page.is_visible && page.body) {
            this.pages.push({
              title: page.name,
              component: 'pages',
              body: page.body
            })
          }
        }
        console.log(this.pages)
      })

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component, {
      body: page.body,
      title: page.title
    });
  }
}
