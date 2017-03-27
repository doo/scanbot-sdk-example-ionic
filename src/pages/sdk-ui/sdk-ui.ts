import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var ScanbotSdkUi: any;

@Component({
  selector: 'page-sdk-ui',
  templateUrl: 'sdk-ui.html'
})
export class SdkUiPage {

  constructor(public navCtrl: NavController) {

  }

  public startCameraUi() {
    var options = { edgeColor: '#0000ff' };
    ScanbotSdkUi.startCamera(this.callbackCameraUi, this.callbackError, options);
  }

  private callbackCameraUi(result: any) {
    console.log('Got Camera result: ' + result);
  }

  private callbackError(error: string) {
    console.log('Error from Scanbot SDK Plugin: ' + error);
  }

}
