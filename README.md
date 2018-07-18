# Example App for Scanbot SDK Cordova Plugin with Ionic 2+ Framework

This example app shows how to integrate the Scanbot SDK Cordova Plugin with [Ionic 2+ Framework](https://ionicframework.com). 

The Scanbot SDK Cordova Plugin is available as [npm package](https://www.npmjs.com/package/cordova-plugin-scanbot-sdk).

For more details about the Plugin please see this [documentation](https://scanbotsdk.github.io/documentation/cordova/).


## What is Scanbot SDK?
The Scanbot SDK brings scanning and document creation capabilities to your mobile apps. 
It contains modules which are individually licensable as license packages. 
For more details visit our website [https://scanbot.io/sdk.html](https://scanbot.io/sdk.html)


## How to run this app

Install [Cordova](https://cordova.apache.org) and [Ionic](https://ionicframework.com). 
Fetch this repository and navigate to the project directory.

`cd scanbot-sdk-example-ionic2`

Install node modules:

`npm install`

Install Cordova platforms and plugins (defined in the config.xml of this app):

`ionic cordova prepare`

Check installed platforms and plugins:

`ionic cordova platform ls`

`ionic cordova plugin ls`

You should see *android* and *ios* as installed platforms and *cordova-plugin-scanbot-sdk* as installed plugins. 


Connect a device via USB and run the app.

Android:

`ionic cordova run android`

iOS:

To run this example app on an iOS device you have to adjust some settings in Xcode: 
- *Provisioning* and *Code Signing* settings - see [Cordova docs](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html) 
- Make sure *ScanbotSDK.framework* was added as **Embedded Binary** - see our [Plugin docs](https://scanbotsdk.github.io/documentation/cordova/)

Then you can start the App in Xcode or via `ionic cordova run ios`.



## Please note

The Scanbot SDK will run without a license for one minute per session!

After the trial period is over all Scanbot SDK functions as well as the UI components (like Document Scanner UI) will stop working or may be terminated.
You have to restart the app to get another trial period.

To get an unrestricted "no-strings-attached" 30 day trial license, please submit the [Trial License Form](https://scanbot.io/sdk/trial.html) on our website.
