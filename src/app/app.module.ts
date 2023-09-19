import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { File } from '@awesome-cordova-plugins/file/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DialogsService } from './services/dialogs.service';
import { ScanbotSdkDemoService } from './services/scanbot-sdk-demo.service';
import { ImageResultsRepository } from './services/image-results.repository';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DialogsService,
    ScanbotSdkDemoService,
    ImageResultsRepository,
    File
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
