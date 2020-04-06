# MRZ, barcode and QR code reader and a mobile document scanner with text recognition

## Scanbot SDK example app for Ionic

This example app shows how to integrate the Scanbot SDK Cordova Plugin with [Ionic Framework](https://ionicframework.com). 

The Scanbot SDK Cordova Plugin is available as [npm package](https://www.npmjs.com/package/cordova-plugin-scanbot-sdk).

For more details about the Plugin please see this [documentation](https://scanbotsdk.github.io/documentation/cordova/).


## What is Scanbot SDK?

The Scanbot SDK brings scanning and document creation capabilities to your mobile apps. 
It contains modules which are individually licensable as license packages. 
For more details visit our website https://scanbot.io


## How to run this app

Install the latest versions of [Cordova](https://cordova.apache.org) and [Ionic](https://ionicframework.com). 
Fetch this repository and navigate to the project directory.

`cd scanbot-sdk-example-ionic/`

Install node modules:

`npm install`

Install Cordova platforms and plugins (defined in the config.xml of this app):

`cordova prepare`

Check installed platforms and plugins:

`cordova platform ls`

`cordova plugin ls`

You should see *android* and *ios* as installed platforms and *cordova-plugin-scanbot-sdk* as installed plugins. 


Connect a device via USB and run the app.

**Android:**

`ionic cordova run android`

**iOS:**

`ionic cordova prepare ios`

Open the project `platforms/ios/Scanbot SDK Example Ionic.xcodeproj` in Xcode and check/adjust the following settings: 
- *Provisioning* and *Code Signing* - see [Cordova docs](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html) 
- Make sure the `ScanbotSDK.framework` was properly added as **Embedded Binary** - see our [Plugin docs](https://scanbotsdk.github.io/documentation/cordova/)

Then build and run the app in Xcode.


## Please note

The Scanbot SDK will run without a license for one minute per session!

After the trial period is over all Scanbot SDK functions as well as the UI components (like Document Scanner UI) will stop working or may be terminated.
You have to restart the app to get another trial period.

To get an unrestricted "no-strings-attached" 30 day trial license, please submit the [Trial License Form](https://scanbot.io/en/sdk/demo/trial) on our website.
