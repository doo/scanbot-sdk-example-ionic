# Example App for Scanbot SDK Cordova Plugin with Ionic 2 Framework

This example app shows how to integrate the Scanbot SDK Cordova Plugin with [Ionic 2 Framework](https://ionicframework.com). 

The Scanbot SDK Cordova Plugin is available as [npm package](https://www.npmjs.com/package/cordova-plugin-scanbot-sdk).

The app demonstrates only a few features of the plugin. For more details please see this [documentation](https://scanbotsdk.github.io/documentation/cordova/).


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

Install platforms and plugins (defined in the config.xml of this app):

`ionic prepare`

Check installed platforms and plugins:

`ionic platform ls`

`ionic plugin ls`

You should see *android* and *ios* as installed platforms and *cordova-plugin-scanbot-sdk* as installed plugins. 


Connect a device via USB and run the app.

Android:

`ionic run android`

iOS:

To run this example app on an iOS device you have to adjust some settings in Xcode: 
- *Provisioning* and *Code Signing* settings - see [Cordova docs](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html) 
- Add *ScanbotSDK.framework* as Embedded Binary  - see our [plugin docs](https://scanbotsdk.github.io/documentation/cordova/)

Then you can start the App in Xcode or via `ionic run ios`.



## Please note

This example app doesn't contain a Scanbot SDK license key and runs in a **trial mode (trial period of 1 minute)**!  
After the trial period is over the Scanbot SDK functions will stop working. 
The UI parts (like Camera UI) will stop working or may be terminated.
You have to restart the app to get another trial period.
