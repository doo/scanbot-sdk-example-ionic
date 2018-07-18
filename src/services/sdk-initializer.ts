import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import ScanbotSdk, { ScanbotSDKConfiguration } from 'cordova-plugin-scanbot-sdk'

// TODO Put the Scanbot SDK license key here
const myLicenseKey = '';

export const IMAGE_QUALITY = 80;

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
    console.log("Initializing Scanbot SDK...");

    let config: ScanbotSDKConfiguration = {
      loggingEnabled: true, // ! Consider switching logging OFF in production builds for security and performance reasons !
      licenseKey: myLicenseKey,
      storageImageFormat: 'JPG',
      storageImageQuality: IMAGE_QUALITY
    };

    return ScanbotSdk.promisify().initializeSdk(config).then(result => {
      this._promise = null;
      console.log(JSON.stringify(result));
    });
  }
}
