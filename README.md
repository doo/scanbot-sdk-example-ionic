# Scanbot Barcode & Document Scanning Example App for Cordova with Ionic

This example app shows how to integrate the [Scanbot Barcode Scanner SDK](https://scanbot.io/developer/ionic-barcode-scanner/), [Scanbot Document Scanner SDK](https://scanbot.io/developer/ionic-document-scanner/), and [Scanbot Data Capture SDK](https://scanbot.io/developer/ionic-data-capture/) for Cordova.

The Scanbot SDK Cordova Plugin is available as [npm package](https://www.npmjs.com/package/cordova-plugin-scanbot-sdk).

For more details about the Plugin please see this [documentation](https://docs.scanbot.io/document-scanner-sdk/cordova/introduction/).

## What is the Scanbot SDK?

The Scanbot SDK lets you integrate barcode & document scanning, as well as data extraction functionalities, into your mobile apps and website. It contains different modules that are licensable for an annual fixed price. For more details, visit our website https://scanbot.io.


## Trial License

The Scanbot SDK will run without a license for one minute per session!

After the trial period has expired, all SDK functions and UI components will stop working. You have to restart the app to get another one-minute trial period.

To test the Scanbot SDK without crashing, you can get a free “no-strings-attached” trial license. Please submit the [Trial License Form](https://scanbot.io/trial/) on our website.

## Free Developer Support

We provide free "no-strings-attached" developer support for the implementation & testing of the Scanbot SDK.
If you encounter technical issues with integrating the Scanbot SDK or need advice on choosing the appropriate
framework or features, please visit our [Support Page](https://docs.scanbot.io/support/).

## Documentation
👉 [Scanbot SDK documentation](https://docs.scanbot.io/document-scanner-sdk/cordova/introduction/)

## How to run this app

### Requirements

- [NodeJS 16+](https://nodejs.org) (installation via [nvm](https://github.com/nvm-sh/nvm) recommended )
- [Cordova CLI](https://cordova.apache.org)
- [Ionic CLI](https://ionicframework.com)
- [native-run CLI](https://www.npmjs.com/package/native-run)
- [Android Studio](https://developer.android.com/studio) and [Xcode](https://developer.apple.com/xcode/)


Install node modules:

`npm install`

Install Cordova platforms and plugins (defined in the config.xml of this app):

`cordova prepare`

Check installed platforms and plugins:

`cordova platform ls`

`cordova plugin ls`

You should see *android* and *ios* as installed platforms and *cordova-plugin-scanbot-sdk* as installed plugins.

### Important
When using Node 17+ you might face this known Ionic issue: 

```
Error: error:0308010C:digital envelope routines::unsupported
```

Before proceeding, please execute this in your terminal to prevent the issue from happening:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

Finally, connect a device via USB and run the app:

**Android:**

`ionic cordova run android`

**iOS:**

`ionic cordova prepare ios`

Open the workspace `platforms/ios/Scanbot SDK Example Ionic.xcworkspace` in Xcode and adjust the *"Signing"* 
settings accordingly. Then build and run the app in Xcode.
