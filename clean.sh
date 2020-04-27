rm -rf node_modules/
rm -rf plugins/
ionic cordova platform remove android
ionic cordova platform remove ios
npm install
ionic cordova platform add android
ionic cordova platform add ios