#!/bin/bash

# 25.05 2020 (Aare): I have no idea what this script used to do, but, considering the name,
# it now syncs the files from your working directory (you're supposed to be implementing and
# testing out new features in the scanbot-sdk-example-react-native directory) to this folder

# Copies Scanbot Android SDK from scanbot-sdk-example-react-native
IOS_SRC="../../platforms/ios/Scanbot SDK Example Ionic/Plugins/cordova-plugin-scanbot-example-ui/"
IOS_DEST="./src/ios"
rsync -rluv "$IOS_SRC" "$IOS_DEST"

# Copies Scanbot iOS SDK from scanbot-sdk-example-react-native
ANDROID_SRC="../../platforms/android/app/src/main/java/io/scanbot/cordova/exampleui/"
ANDROID_DEST="src/android"
rsync -rluv "$ANDROID_SRC" "$ANDROID_DEST"

