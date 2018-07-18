import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { SdkUiPage } from '../pages/sdk-ui/sdk-ui';
import { PageFilterPage } from '../pages/sdk-ui/filter';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import SdkInitializer from '../services/sdk-initializer';



@NgModule({
  declarations: [
    MyApp,
    SdkUiPage,
    PageFilterPage,
    AboutPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SdkUiPage,
    PageFilterPage,
    AboutPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    SdkInitializer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
