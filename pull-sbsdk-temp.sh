#!/bin/bash

adb pull /storage/emulated/0/Android/data/io.scanbot.example.sdk.ionic2/cache/sbsdk-temp
adb shell rm '/storage/emulated/0/Android/data/io.scanbot.example.sdk.ionic2/cache/sbsdk-temp/*'