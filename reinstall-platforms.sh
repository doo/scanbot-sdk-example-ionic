#!/bin/bash

#
# Helper script to reinstall platforms
#

# remove and reinstall the platforms:
ionic cordova platform remove ios
ionic cordova platform remove android

rm -rf platforms/
rm -rf node_modules/
rm -rf plugins/
npm cache clean --force

npm install

ionic cordova platform add ios@5.1.1
ionic cordova platform add android@8.1.0


