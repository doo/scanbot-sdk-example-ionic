(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/cordova-plugin-scanbot-image-picker/www/scanbot-image-picker.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/cordova-plugin-scanbot-image-picker/www/scanbot-image-picker.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
    Scanbot Image Picker Cordova Plugin
    Copyright (c) 2021 doo GmbH

    This code is licensed under MIT license (see LICENSE for details)

    Created by Marco Saia on 07.05.2021
*/

const DEFAULT_MODULE = "ScanbotImagePicker"

function createCordovaFunction(actionName, module = DEFAULT_MODULE) {
  return (successCallback, errorCallback, options) => {
    console.log(
      "===\n \n" +
      "[INFO] ScanbotImagePicker - Calling Plugin" +
      `\n• Action: ${actionName}` +
      "\n• Options:"+
      `\n${JSON.stringify(options, null, 2)}\n  \n  `
    );

    cordova.exec(successCallback, errorCallback, module, actionName, (options ? [options] : []));
  };
}
  
function createCordovaPromise(actionName, module = DEFAULT_MODULE) {
  const cordovaFunction = createCordovaFunction(actionName, module)
  return (options) => {
    return new Promise((resolve, reject) => cordovaFunction(resolve, reject, options))
  }
}

var API = {
  pickImage: createCordovaPromise("pickImage"),
  pickImages: createCordovaPromise("pickImages")
};

module.exports = API;

/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");







var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
                    }
                ])
            ],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]]
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/home/home.page.html":
/*!*************************************!*\
  !*** ./src/app/home/home.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>\n      Scanbot SDK Ionic Example\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <div padding>\n    <ion-list>\n      <ion-list-header>\n        <ion-label text-uppercase>Document Scanner</ion-label>\n      </ion-list-header>\n      <ion-item (click)=\"startDocumentScanner()\">\n        <ion-label>Scan Document</ion-label>\n      </ion-item>\n      <ion-item (click)=\"pickImageFromPhotoLibrary()\">\n        <ion-label>Import Image & Detect Document</ion-label>\n      </ion-item>\n      <ion-item (click)=\"gotoImageResults()\" detail>\n        <ion-label>View Image Results</ion-label>\n      </ion-item>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header>\n        <ion-label text-uppercase>Barcode Detector</ion-label>\n      </ion-list-header>\n      <ion-item (click)=\"startBarcodeScanner()\">\n        <ion-label>Scan QR-/Barcode</ion-label>\n      </ion-item>\n      <ion-item (click)=\"startBatchBarcodeScanner()\">\n        <ion-label>Scan a Batch of Barcodes</ion-label>\n      </ion-item>\n      <ion-item (click)=\"importAndDetectBarcodes()\">\n        <ion-label>Import Image & Detect Barcodes</ion-label>\n      </ion-item>\n      <ion-item (click)=\"importImagesAndDetectBarcodes()\">\n        <ion-label>Import Images & Detect Barcodes</ion-label>\n      </ion-item>\n      <ion-item (click)=\"setAcceptedBarcodeFormats()\">\n        <ion-label>Set Barcode Formats Filter</ion-label>\n      </ion-item>\n      <ion-item (click)=\"setAcceptedBarcodeDocumentFormats()\">\n        <ion-label>Set Barcode Document Formats Filter</ion-label>\n      </ion-item>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header>\n        <ion-label text-uppercase>Data Detectors</ion-label>\n      </ion-list-header>\n      <ion-item (click)=\"startMrzScanner()\">\n        <ion-label>Scan MRZ on ID Card</ion-label>\n      </ion-item>\n      <ion-item (click)=\"startEHICScanner()\">\n        <ion-label>Scan Health Insurance Card</ion-label>\n      </ion-item>\n      <ion-item (click)=\"startLicensePlateScanner('ML_BASED')\">\n        <ion-label>Scan License Plate (ML)</ion-label>\n      </ion-item>\n      <ion-item (click)=\"startLicensePlateScanner('CLASSIC')\">\n        <ion-label>Scan License Plate (CLASSIC)</ion-label>\n      </ion-item>\n      <ion-item (click)=\"startLcDisplayScanner()\">\n        <ion-label>Scan LC Dot-Matrix Display</ion-label>\n      </ion-item>\n      <ion-item (click)=\"startGenericDocumentRecognizer()\">\n        <ion-label>Scan Generic Documents</ion-label>\n      </ion-item>\n    </ion-list>\n\n    <ion-list>\n      <ion-list-header>\n        <ion-label text-uppercase>Miscellaneous</ion-label>\n      </ion-list-header>\n      <ion-item *ngIf=\"hasHtml5CameraSupport()\" (click)=\"openHTMLCameraPage()\">\n        <ion-label>HTML5 Camera</ion-label>\n      </ion-item>\n      <ion-item (click)=\"viewLicenseInfo()\">\n        <ion-label>View License Info</ion-label>\n      </ion-item>\n      <ion-item (click)=\"viewOcrConfigs()\">\n        <ion-label>View OCR Configs</ion-label>\n      </ion-item>\n      <ion-item>\n        <a ion-item href=\"https://scanbot.io\" target=\"_blank\" rel=\"noopener\">\n          Learn More About the Scanbot SDK\n        </a>\n      </ion-item>\n    </ion-list>\n\n  </div>\n\n  <div class=\"copyright-label\">\n    Copyright (c) 2020 doo GmbH. All rights reserved.\n  </div>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".copyright-label {\n  width: 100%;\n  text-align: center;\n  font-size: 0.6em;\n  color: #8c8c8c;\n  margin-bottom: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zYXJianlvdGNoYWhhbC9TY2FuYm90L3NjYW5ib3Qtc2RrLWV4YW1wbGUtaW9uaWMvc3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7QUNBRiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi5jb3B5cmlnaHQtbGFiZWwge1xuICB3aWR0aDogMTAwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDAuNjBlbTtcbiAgY29sb3I6ICM4YzhjOGM7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG59XG4iLCIuY29weXJpZ2h0LWxhYmVsIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAwLjZlbTtcbiAgY29sb3I6ICM4YzhjOGM7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var cordova_plugin_scanbot_sdk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cordova-plugin-scanbot-sdk */ "./node_modules/cordova-plugin-scanbot-sdk/www/ScanbotSdk.js");
/* harmony import */ var cordova_plugin_scanbot_sdk__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cordova_plugin_scanbot_sdk__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _services_dialogs_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/dialogs.service */ "./src/app/services/dialogs.service.ts");
/* harmony import */ var _services_scanbot_sdk_demo_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/scanbot-sdk-demo.service */ "./src/app/services/scanbot-sdk-demo.service.ts");
/* harmony import */ var _services_image_results_repository__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/image-results.repository */ "./src/app/services/image-results.repository.ts");
/* harmony import */ var _services_barcode_list_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/barcode-list.service */ "./src/app/services/barcode-list.service.ts");
/* harmony import */ var _services_generic_document_recognizer_results_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/generic-document-recognizer-results.service */ "./src/app/services/generic-document-recognizer-results.service.ts");
/* harmony import */ var _services_barcode_document_list_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/barcode-document-list.service */ "./src/app/services/barcode-document-list.service.ts");
/* harmony import */ var cordova_plugin_scanbot_image_picker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! cordova-plugin-scanbot-image-picker */ "./node_modules/cordova-plugin-scanbot-image-picker/www/scanbot-image-picker.js");
/* harmony import */ var cordova_plugin_scanbot_image_picker__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(cordova_plugin_scanbot_image_picker__WEBPACK_IMPORTED_MODULE_11__);












var HomePage = /** @class */ (function () {
    function HomePage(scanbotService, imageResultsRepository, dialogsService, platform, router) {
        this.scanbotService = scanbotService;
        this.imageResultsRepository = imageResultsRepository;
        this.dialogsService = dialogsService;
        this.platform = platform;
        this.router = router;
        document.addEventListener('deviceready', function () {
            var _this = this;
            /*
            * Register a vanilla javascript callback, as setLicenseFailure registers a continuous callback
            * that does not adhere to the standards of promisified API.
            * All other Scanbot features are also a part of the normal, non-promisified API
            *
            * Note that, as is, license failure handler is never called, because in this example
            * we always check license validity before calling any Scanbot API.
            */
            cordova_plugin_scanbot_sdk__WEBPACK_IMPORTED_MODULE_4___default.a.setLicenseFailureHandler(function (callback) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                var status, feature, errorMessage;
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                    status = callback.licenseStatus;
                    feature = callback.licenseFeature;
                    errorMessage = callback.licenseErrorMessage;
                    console.log('Feature ' + feature + ' is not available because license is ' + status + ' \n' + errorMessage);
                    return [2 /*return*/];
                });
            }); });
        });
    }
    HomePage.prototype.startDocumentScanner = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var configs, result;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.checkLicense()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        configs = this.scanbotService.globalDocScannerConfigs();
                        return [4 /*yield*/, this.scanbotService.SDK.UI.startDocumentScanner({ uiConfigs: configs })];
                    case 2:
                        result = _a.sent();
                        if (result.status === 'CANCELED') {
                            // user has canceled the scanning operation
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.imageResultsRepository.addPages(result.pages)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.gotoImageResults()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.pickImageFromPhotoLibrary = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var result, originalImageFileUri, loading, createResult, docResult, e_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cordova_plugin_scanbot_image_picker__WEBPACK_IMPORTED_MODULE_11___default.a.pickImage()];
                    case 1:
                        result = _a.sent();
                        if (result.status !== 'OK' || !result.imageFileUri) {
                            return [2 /*return*/];
                        }
                        originalImageFileUri = result.imageFileUri;
                        return [4 /*yield*/, this.scanbotService.checkLicense()];
                    case 2:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.dialogsService.createLoading('Auto-detecting and cropping...')];
                    case 3:
                        loading = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 10, 12, 14]);
                        return [4 /*yield*/, loading.present()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.scanbotService.SDK.createPage({ originalImageFileUri: originalImageFileUri })];
                    case 6:
                        createResult = _a.sent();
                        return [4 /*yield*/, this.scanbotService.SDK.detectDocumentOnPage({ page: createResult.page })];
                    case 7:
                        docResult = _a.sent();
                        return [4 /*yield*/, this.imageResultsRepository.addPages([docResult.page])];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.gotoImageResults()];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 10:
                        e_1 = _a.sent();
                        console.error('Unable to process selected image.', e_1);
                        return [4 /*yield*/, this.dialogsService.showAlert(e_1.message, 'ERROR', 'Unable to process selected image.')];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, loading.dismiss()];
                    case 13:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.gotoImageResults = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.router.navigateByUrl('/image-results')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.startBarcodeScanner = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var result;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.checkLicense()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.scanbotService.SDK.UI.startBarcodeScanner({
                                uiConfigs: {
                                    // Customize colors, text resources, behavior, etc..
                                    finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.',
                                    barcodeFormats: _services_barcode_list_service__WEBPACK_IMPORTED_MODULE_8__["BarcodeListService"].getAcceptedTypes(),
                                    acceptedDocumentFormats: _services_barcode_document_list_service__WEBPACK_IMPORTED_MODULE_10__["BarcodeDocumentListService"].getAcceptedFormats(),
                                    barcodeImageGenerationType: 'VIDEO_FRAME',
                                    orientationLockMode: 'PORTRAIT',
                                    finderLineColor: '#0000ff',
                                    finderAspectRatio: { width: 2, height: 1 },
                                    topBarBackgroundColor: '#c8193c',
                                    useButtonsAllCaps: false,
                                }
                            })];
                    case 2:
                        result = _a.sent();
                        if (!(result.status === 'OK')) return [3 /*break*/, 4];
                        _services_barcode_list_service__WEBPACK_IMPORTED_MODULE_8__["BarcodeListService"].detectedBarcodes = [{
                                barcodes: result.barcodes || [],
                                snappedImage: result.imageFileUri
                            }];
                        return [4 /*yield*/, this.router.navigateByUrl('/barcode-result-list')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.startBatchBarcodeScanner = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var configs, result;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.checkLicense()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        configs = {
                            // Customize colors, text resources, behavior, etc..
                            finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.',
                            barcodeFormats: _services_barcode_list_service__WEBPACK_IMPORTED_MODULE_8__["BarcodeListService"].getAcceptedTypes(),
                            acceptedDocumentFormats: _services_barcode_document_list_service__WEBPACK_IMPORTED_MODULE_10__["BarcodeDocumentListService"].getAcceptedFormats(),
                            finderAspectRatio: { width: 1, height: 1 },
                            orientationLockMode: 'PORTRAIT',
                            useButtonsAllCaps: false,
                        };
                        return [4 /*yield*/, this.scanbotService.SDK.UI.startBatchBarcodeScanner({ uiConfigs: configs })];
                    case 2:
                        result = _a.sent();
                        if (!(result.status === 'OK')) return [3 /*break*/, 4];
                        _services_barcode_list_service__WEBPACK_IMPORTED_MODULE_8__["BarcodeListService"].detectedBarcodes = [{
                                barcodes: result.barcodes || [],
                                snappedImage: result.imageFileUri
                            }];
                        return [4 /*yield*/, this.router.navigateByUrl('/barcode-result-list')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.startGenericDocumentRecognizer = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var config, result;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.checkLicense()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        config = {
                            shouldSavePhotoImageInStorage: true,
                            detailsFieldConfiguration: {
                                fieldLicenseCategoriesTitle: "NEW TITLE"
                            }
                        };
                        return [4 /*yield*/, this.scanbotService.SDK.UI.startGenericDocumentRecognizer({ uiConfigs: config })];
                    case 2:
                        result = _a.sent();
                        console.log(JSON.stringify(result));
                        if (!(result.status === 'OK')) return [3 /*break*/, 4];
                        _services_generic_document_recognizer_results_service__WEBPACK_IMPORTED_MODULE_9__["GenericDocumentRecognizerResultsService"].fields = result.fields;
                        _services_generic_document_recognizer_results_service__WEBPACK_IMPORTED_MODULE_9__["GenericDocumentRecognizerResultsService"].documentType = result.documentType;
                        return [4 /*yield*/, this.router.navigateByUrl('/generic-document-recognizer-results')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.startMrzScanner = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var config, widthPx, result, fields;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.checkLicense()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        config = {
                            // Customize colors, text resources, etc..
                            finderTextHint: 'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.',
                            orientationLockMode: 'PORTRAIT',
                        };
                        if (this.platform.is('ios')) {
                            widthPx = window.screen.width;
                            config.finderWidth = widthPx * 0.9;
                            config.finderHeight = widthPx * 0.18;
                        }
                        return [4 /*yield*/, this.scanbotService.SDK.UI.startMrzScanner({ uiConfigs: config })];
                    case 2:
                        result = _a.sent();
                        if (!(result.status === 'OK')) return [3 /*break*/, 4];
                        fields = result.mrzResult.fields.map(function (f) { return "<div>" + f.name + ": " + f.value + " (" + f.confidence.toFixed(2) + ")</div>"; });
                        return [4 /*yield*/, this.dialogsService.showAlert(fields.join(''), 'MRZ Result')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.startEHICScanner = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var config, result, fields;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.checkLicense()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        config = {
                            finderTextHint: 'Please hold your phone over the back of your Health Insurance Card.',
                            orientationLockMode: 'PORTRAIT',
                        };
                        return [4 /*yield*/, this.scanbotService.SDK.UI.startEHICScanner({ uiConfigs: config })];
                    case 2:
                        result = _a.sent();
                        if (!(result.status === 'OK')) return [3 /*break*/, 4];
                        fields = result.ehicResult.fields.map(function (f) { return "<div>" + f.type + ": " + f.value + " (" + f.confidence.toFixed(2) + ")</div>"; });
                        return [4 /*yield*/, this.dialogsService.showAlert(fields.join(''), 'EHIC Result')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.setAcceptedBarcodeFormats = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.router.navigateByUrl('/barcode-list')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.setAcceptedBarcodeDocumentFormats = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.router.navigateByUrl('/barcode-document-list')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.viewLicenseInfo = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var result;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.SDK.getLicenseInfo()];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.dialogsService.showAlert(JSON.stringify(result.info), 'License Info')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.viewOcrConfigs = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var result;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.SDK.getOcrConfigs()];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.dialogsService.showAlert(JSON.stringify(result), 'OCR Configs')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.openHTMLCameraPage = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('ios')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.dialogsService.showAlert('HTML5 Camera is an Android-only feature')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.router.navigateByUrl('/html5-camera')];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.importAndDetectBarcodes = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var pickerResult, imageUri, loading, result;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cordova_plugin_scanbot_image_picker__WEBPACK_IMPORTED_MODULE_11___default.a.pickImage({
                            imageQuality: 85
                        })];
                    case 1:
                        pickerResult = _a.sent();
                        console.log('Picker Result: ' + pickerResult);
                        if (!(pickerResult.status !== 'OK' || !pickerResult.imageFileUri)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.dialogsService.showAlert('Unexpected error while loading the chosen image')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        imageUri = pickerResult.imageFileUri;
                        return [4 /*yield*/, this.scanbotService.checkLicense()];
                    case 4:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.dialogsService.createLoading('Detecting barcodes...')];
                    case 5:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.scanbotService.SDK.detectBarcodesOnImage({
                                imageFileUri: imageUri,
                                barcodeFormats: _services_barcode_list_service__WEBPACK_IMPORTED_MODULE_8__["BarcodeListService"].getAcceptedTypes()
                            })];
                    case 7:
                        result = _a.sent();
                        if (!(result.status !== 'OK')) return [3 /*break*/, 10];
                        return [4 /*yield*/, loading.dismiss()];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.dialogsService.showAlert('ERROR: ' + result.message, 'ERROR')];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        _services_barcode_list_service__WEBPACK_IMPORTED_MODULE_8__["BarcodeListService"].detectedBarcodes = [{
                                barcodes: result.barcodes || [],
                                snappedImage: imageUri
                            }];
                        return [4 /*yield*/, loading.dismiss()];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, this.router.navigateByUrl('/barcode-result-list')];
                    case 12:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.importImagesAndDetectBarcodes = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var pickerLoading, result, loading, scanResult, results, i, barcodeResult;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.checkLicense()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.dialogsService.createLoading('')];
                    case 2:
                        pickerLoading = _a.sent();
                        return [4 /*yield*/, pickerLoading.present()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, cordova_plugin_scanbot_image_picker__WEBPACK_IMPORTED_MODULE_11___default.a.pickImages({
                                maxImages: 10,
                                imageQuality: 85
                            })];
                    case 4:
                        result = _a.sent();
                        return [4 /*yield*/, pickerLoading.dismiss()];
                    case 5:
                        _a.sent();
                        if (!result || result.status !== 'OK') {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.dialogsService.createLoading('Detecting barcodes...')];
                    case 6:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.scanbotService.SDK.detectBarcodesOnImages({
                                imageFilesUris: result.imageFilesUris,
                                barcodeFormats: _services_barcode_list_service__WEBPACK_IMPORTED_MODULE_8__["BarcodeListService"].getAcceptedTypes()
                            })];
                    case 8:
                        scanResult = _a.sent();
                        return [4 /*yield*/, loading.dismiss()];
                    case 9:
                        _a.sent();
                        results = scanResult.results;
                        if (!!results) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.dialogsService.showAlert('No barcodes detected', 'Results')];
                    case 10:
                        _a.sent();
                        return [2 /*return*/];
                    case 11:
                        _services_barcode_list_service__WEBPACK_IMPORTED_MODULE_8__["BarcodeListService"].detectedBarcodes = [];
                        for (i = 0; i < results.length; ++i) {
                            barcodeResult = results[i];
                            _services_barcode_list_service__WEBPACK_IMPORTED_MODULE_8__["BarcodeListService"].detectedBarcodes.push({
                                snappedImage: barcodeResult.imageFileUri,
                                barcodes: barcodeResult.barcodeResults.map(function (item) { return ({ type: item.type, text: item.text }); })
                            });
                        }
                        return [4 /*yield*/, this.router.navigateByUrl('/barcode-result-list')];
                    case 12:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.hasHtml5CameraSupport = function () {
        return this.platform.is('android');
    };
    HomePage.prototype.startLicensePlateScanner = function (mode) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var config, result;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.checkLicense()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        config = {
                            detectorMode: mode,
                            topBarBackgroundColor: '#c8193c',
                            topBarButtonsColor: '#ffffff',
                            cancelButtonTitle: 'Cancel',
                            finderLineColor: '#c8193c',
                            finderLineWidth: 5,
                            guidanceText: 'Place the whole license plate in the frame to scan it',
                            orientationLockMode: 'PORTRAIT',
                            confirmationDialogConfirmButtonFilled: true,
                        };
                        return [4 /*yield*/, this.scanbotService.SDK.UI.startLicensePlateScanner({ uiConfigs: config })];
                    case 2:
                        result = _a.sent();
                        if (!(result.status === 'OK')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.dialogsService.showAlert("Country Code: " + result.licensePlateResult.countryCode + "<br>" +
                                ("License Plate: " + result.licensePlateResult.licensePlate + "<br><br>") +
                                ("Confidence: " + result.licensePlateResult.confidence + "<br>") +
                                ("Raw Text: " + result.licensePlateResult.rawText), 'License Plate Result')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.startLcDisplayScanner = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var uiConfigs, scannerStep, result;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.checkLicense()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        uiConfigs = {
                            cancelButtonTitle: 'Cancel',
                            topBarBackgroundColor: '#c8193c',
                            topBarButtonsColor: '#ffffff',
                            finderLineColor: '#c8193c',
                            orientationLockMode: 'PORTRAIT',
                        };
                        scannerStep = {
                            guidanceText: 'Place the LC display in the frame to scan it',
                            textFilterStrategy: 'LC_DOT_MATRIX_DISPLAY',
                        };
                        return [4 /*yield*/, this.scanbotService.SDK.UI.startDataScanner({ uiConfigs: uiConfigs, scannerStep: scannerStep })];
                    case 2:
                        result = _a.sent();
                        if (!(result.status === 'OK')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.dialogsService.showAlert("Value: " + result.dataResult.textValue, 'Scanner Result')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.page.html */ "./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_scanbot_sdk_demo_service__WEBPACK_IMPORTED_MODULE_6__["ScanbotSdkDemoService"],
            _services_image_results_repository__WEBPACK_IMPORTED_MODULE_7__["ImageResultsRepository"],
            _services_dialogs_service__WEBPACK_IMPORTED_MODULE_5__["DialogsService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module.js.map