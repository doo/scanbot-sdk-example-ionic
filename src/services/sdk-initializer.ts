import { Injectable } from '@angular/core';

import ScanbotSdk, { ScanbotSDKConfiguration } from 'cordova-plugin-scanbot-sdk'

var licenseKey = null;


@Injectable()
export default class SdkInitializer {
  private _promise: Promise<any>;

  constructor() {
    this._promise = this.initScanbotSdk();
  }

  public onInitialize(callback: () => void) {
    if (this._promise) {
      this._promise = this._promise.then(callback);
    } else {
      callback();
    }
  }

  private initScanbotSdk() {
    let options: ScanbotSDKConfiguration = {
      loggingEnabled: true,
      licenseKey: licenseKey,
      storageImageFormat: 'JPG',
      storageImageQuality: 70,
    };

    return ScanbotSdk.promisify().initializeSdk(options)
      .then(result => {
        this._promise = null;
        console.log(JSON.stringify(result));
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }
}