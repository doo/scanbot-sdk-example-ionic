import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import ScanbotSdk, { ScanbotSDKConfiguration } from 'cordova-plugin-scanbot-sdk'

var licenseKey = null;


@Injectable()
export default class SdkInitializer {
  public _promise: Promise<any>;
  public _error: any;
  public _result: any;

  constructor(platform: Platform) {
    console.log("Starting SDK initializer...");
    this._promise = platform.ready().then(() => this.initScanbotSdk());
  }

  public onInitialize(callback: (err, result) => void) {
    if (this._promise) {
      this._promise = this._promise
        .then(result => {
          this._result = result;
          callback(null, result);
        }).catch(err => {
          this._error = err;
          callback(err, null);
        });
    } else {
      callback(this._error, this._result);
    }
  }

  private initScanbotSdk() {
    console.log("Initializing SDK...");

    let options: ScanbotSDKConfiguration = {
      loggingEnabled: true,
      licenseKey: licenseKey,
      storageImageFormat: 'JPG',
      storageImageQuality: 70,
    };

    return ScanbotSdk.promisify().initializeSdk(options).then(result => {
      this._promise = null;
      console.log(JSON.stringify(result));
    });
  }
}