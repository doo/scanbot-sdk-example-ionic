import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';

import ScanbotSdk, { ScanbotSDKConfiguration } from 'cordova-plugin-scanbot-sdk'

// TODO Put the Scanbot SDK license key here
const myLicenseKey = '';

export const IMAGE_QUALITY = 80;

@Injectable()
export default class SdkInitializer {
  public _promise: Promise<any>;
  public _error: any;
  public _result: any;

  constructor(private platform: Platform, private file: File) {
    console.log('Starting SDK initializer...');
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
    console.log('Initializing Scanbot SDK...');

    // optional storageBaseDirectory - see the comments below.
    const customStorageBaseDirectory = this.getDemoStorageBaseDirectory();

    const config: ScanbotSDKConfiguration = {
      loggingEnabled: true, // ! Consider switching logging OFF in production builds for security and performance reasons !
      licenseKey: myLicenseKey,
      storageImageFormat: 'JPG',
      storageImageQuality: IMAGE_QUALITY,
      storageBaseDirectory: customStorageBaseDirectory
    };

    return ScanbotSdk.promisify().initializeSdk(config).then(result => {
      this._promise = null;
      console.log(JSON.stringify(result));
    });
  }

  private getDemoStorageBaseDirectory(): string {
    // !! Please note !!
    // It is strongly recommended to use the default (secure) storage location of the Scanbot SDK.
    // However, for demo purposes we overwrite the "storageBaseDirectory" of the Scanbot SDK by a custom storage directory.
    //
    // On Android we use the "externalDataDirectory" which is a public(!) folder.
    // All image files and export files (PDF, TIFF, etc) created by the Scanbot SDK in this demo app will be stored
    // in this public storage directory and will be accessible for every(!) app having external storage permissions!
    // Again, this is only for demo purposes, which allows us to easily fetch and check the generated files
    // via Android "adb" CLI tools, Android File Transfer app, Android Studio, etc.
    //
    // On iOS we use the "documentsDirectory" which is accessible via iTunes file sharing.
    //
    // For more details about the storage system of the Scanbot SDK Plugin please see our docs:
    // - https://scanbotsdk.github.io/documentation/cordova/
    //
    // For more details about the file system on Android and iOS we also recommend to check out:
    // - https://developer.android.com/guide/topics/data/data-storage
    // - https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html

    if (this.platform.is('android')) {
      return this.file.externalDataDirectory + '/my-custom-storage';
    } else if (this.platform.is('ios')) {
      return this.file.documentsDirectory + '/my-custom-storage';
    }
    return null;
  }
}
