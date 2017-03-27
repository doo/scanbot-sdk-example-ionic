import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

declare var ScanbotSdk: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Initialize Scanbot SDK:
      this.initScanbotSdk();
    });
  }

  private initScanbotSdk() {
    var options = { loggingEnabled: true, licenseKey: '' };
    ScanbotSdk.initializeSdk(function(result) {
        console.log(result);
      },
      function(error) {
        console.log('Error from Scanbot SDK: ' + error);
      },
      options
    );
  }
}
