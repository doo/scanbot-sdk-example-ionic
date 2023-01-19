#!/bin/bash

#
# Helper script to reinstall platforms
#

DEFAULT_IOS_PLATFORM_VERSION=6.2.0
DEFAULT_ANDROID_PLATFORM_VERSION=11.0.0

read -p "iOS Platform Version (press ENTER for $DEFAULT_IOS_PLATFORM_VERSION): " ios_platform_version
read -p "Android Platform Version (press ENTER for $DEFAULT_ANDROID_PLATFORM_VERSION): " android_platform_version

if [ ! -n "$ios_platform_version" -a "$ios_platform_version" != " " ]; then
    ios_platform_version=$DEFAULT_IOS_PLATFORM_VERSION
fi

if [ ! -n "$android_platform_version" -a "$android_platform_version" != " " ]; then
    android_platform_version=$DEFAULT_ANDROID_PLATFORM_VERSION
fi

# Remove the platforms
ionic cordova platform remove ios
ionic cordova platform remove android

# Clean the cache
rm -rf platforms/
rm -rf node_modules/
rm -rf plugins/
npm cache clean --force
rm package-lock.json

# Reinstall node modules
npm install

# Reinstall the platforms
ionic cordova platform add ios@$ios_platform_version
ionic cordova platform add android@$android_platform_version