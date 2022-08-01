(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["html5-camera-html5-camera-module"],{

/***/ "./node_modules/cordova-plugin-scanbot-sdk/camera.js":
/*!***********************************************************!*\
  !*** ./node_modules/cordova-plugin-scanbot-sdk/camera.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ScanbotHTMLFinderConfiguration = /** @class */ (function () {
    function ScanbotHTMLFinderConfiguration() {
    }
    return ScanbotHTMLFinderConfiguration;
}());
exports.ScanbotHTMLFinderConfiguration = ScanbotHTMLFinderConfiguration;
var ScanbotHTMLCamera = /** @class */ (function () {
    function ScanbotHTMLCamera() {
        this.isDetecting = false;
    }
    // @ts-ignore
    ScanbotHTMLCamera.prototype.initialize = function (container) {
        return __awaiter(this, void 0, void 0, function () {
            var constraints, stream;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isiOS()) {
                            throw new Error('ScanbotSDK HTML5 Camera is an Android-only feature');
                        }
                        this.container = container;
                        this.video = document.createElement("video");
                        this.video.defaultMuted = true;
                        this.video.autoplay = true;
                        this.video.setAttribute("playsInline", "");
                        this.video.setAttribute("webkit-playsinline", "");
                        this.video.style.width = "100%";
                        this.video.style.height = "100%";
                        this.video.style.objectFit = "cover";
                        container.appendChild(this.video);
                        constraints = { video: { facingMode: "environment" } };
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia(constraints)];
                    case 1:
                        stream = _a.sent();
                        // @ts-ignore
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.video.onloadedmetadata = resolve;
                                _this.video.srcObject = stream;
                                _this.video.width = container.offsetWidth;
                                _this.video.height = container.offsetHeight;
                            })];
                    case 2:
                        // @ts-ignore
                        _a.sent();
                        this.canvas = document.createElement('canvas');
                        this.canvas.width = this.video.videoWidth;
                        this.canvas.height = this.video.videoHeight;
                        this.canvas.style.display = 'none';
                        this.video.parentElement.appendChild(this.canvas);
                        this.canvasContext = this.canvas.getContext('2d');
                        return [2 /*return*/];
                }
            });
        });
    };
    ScanbotHTMLCamera.prototype.addViewFinder = function (configuration) {
        // Give video absolute position and size to draw viewfinder on top of it
        this.video.style.width = this.container.style.width;
        this.video.style.height = this.container.style.height;
        this.video.style.position = "absolute";
        this.viewFinderBackground = document.createElement('div');
        this.viewFinderBackground.className = "scanbot-camera-overlay";
        this.viewFinderBackground.style.backgroundColor = configuration.backgroundColor ? configuration.backgroundColor : "black";
        this.viewFinderBackground.style.opacity = "0.7";
        this.viewFinderBackground.style.position = "absolute";
        this.viewFinderBackground.style.width = this.video.width + "px";
        this.viewFinderBackground.style.height = this.video.height + "px";
        // @ts-ignore
        this.viewFinderBackground.style.mixBlendMode = "hard-light";
        this.container.appendChild(this.viewFinderBackground);
        var height = configuration.height ? configuration.height : this.video.height / 3 * 2;
        var width = configuration.width ? configuration.width : height;
        var x = configuration.marginLeft ? configuration.marginLeft : this.video.width / 2 - width / 2;
        var y = configuration.marginTop ? configuration.marginTop : this.video.height / 2 - height / 2;
        this.viewFinderHole = document.createElement('div');
        this.viewFinderHole.className = "scanbot-camera-viewfinder";
        this.viewFinderHole.style.width = width + "px";
        this.viewFinderHole.style.height = height + "px";
        this.viewFinderHole.style.marginLeft = x + "px";
        this.viewFinderHole.style.marginTop = y + "px";
        this.viewFinderHole.style.border = configuration.border ? configuration.border : "solid 2px white";
        // Check for undefined, because 0 is falsey, but it's an allowed value
        this.viewFinderHole.style.borderRadius = ((configuration.borderRadius !== undefined) ? configuration.borderRadius : 10) + "px";
        this.viewFinderHole.style.backgroundColor = "gray";
        this.viewFinderBackground.appendChild(this.viewFinderHole);
        return this.viewFinderHole;
    };
    /**
     * Public functions
     */
    ScanbotHTMLCamera.prototype.dispose = function () {
        if (!this.video) {
            return;
        }
        this.stopBarcodeDetector();
        this.video.pause();
        this.video.removeAttribute('src'); // empty source
        this.video.removeAttribute('playsInline');
        this.video.removeAttribute('webkit-playsinline');
        this.video.load();
        this.container.removeChild(this.video);
        this.container.removeChild(this.viewFinderBackground);
    };
    ScanbotHTMLCamera.prototype.startBarcodeDetector = function (formats, callback) {
        var _this = this;
        this.formats = formats;
        requestAnimationFrame(function (animCB) {
            _this.isDetecting = true;
            _this.sendImageData(callback).then(function (r) {
                // Nothing to resolve, carry on
            });
        });
    };
    ScanbotHTMLCamera.prototype.stopBarcodeDetector = function () {
        this.isDetecting = false;
    };
    /**
     * Static object creator
     */
    // @ts-ignore
    ScanbotHTMLCamera.create = function (container) {
        return __awaiter(this, void 0, void 0, function () {
            var camera;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        camera = new ScanbotHTMLCamera();
                        return [4 /*yield*/, camera.initialize(container)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, camera];
                }
            });
        });
    };
    /**
     * Internal private functions
     */
    ScanbotHTMLCamera.prototype.createImageData = function (canvasContext, imageOrVideoElement) {
        canvasContext.drawImage(imageOrVideoElement, 0, 0, this.video.videoWidth, this.video.videoHeight);
        var width = this.container.offsetWidth * 1.5;
        var height = this.container.offsetHeight * 1.5;
        var x = this.video.videoWidth / 2 - width / 2;
        var y = this.video.videoHeight / 2 - height / 2;
        if (this.viewFinderHole) {
            x += this.domPixelSizeToInt(this.viewFinderHole.style.marginLeft) * 1.5;
            y += this.domPixelSizeToInt(this.viewFinderHole.style.marginTop) * 1.5;
            width = this.domPixelSizeToInt(this.viewFinderHole.style.width) * 1.5;
            height = this.domPixelSizeToInt(this.viewFinderHole.style.height) * 1.5;
        }
        return canvasContext.getImageData(x, y, width, height);
    };
    ScanbotHTMLCamera.prototype.domPixelSizeToInt = function (size) {
        return parseInt(size.replace("px", ""), 10);
    };
    // @ts-ignore
    ScanbotHTMLCamera.prototype.sendImageData = function (result) {
        return __awaiter(this, void 0, void 0, function () {
            var data, imageData, octet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isDetecting) {
                            return [2 /*return*/];
                        }
                        data = this.createImageData(this.canvasContext, this.video);
                        if (!this.isiOS()) return [3 /*break*/, 1];
                        imageData = data.data.buffer;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.Uint8ToStringViaReader(new Uint8Array(data.data))];
                    case 2:
                        octet = _a.sent();
                        imageData = octet;
                        _a.label = 3;
                    case 3:
                        // Uncomment for web debugging
                        // requestAnimationFrame(() => this.sendImageData(result));
                        // TODON'T: Do not follow the suggested Add 'import {cordova} from "@ionic-native/core"'
                        // The ionic core import is not correct, we want to use the "cordova native" function
                        // @ts-ignore
                        cordova.exec(function (success) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                requestAnimationFrame(function () { return _this.sendImageData(result); });
                                result(success);
                                return [2 /*return*/];
                            });
                        }); }, function (err) {
                            requestAnimationFrame(function () { return _this.sendImageData(result); });
                        }, "ScanbotSdk", "detectBarcodesFromBytes", [data.width, data.height, imageData, this.formats]);
                        return [2 /*return*/];
                }
            });
        });
    };
    ScanbotHTMLCamera.prototype.Uint8ToStringViaReader = function (u8a) {
        // @ts-ignore
        return new Promise(function (resolve) {
            var r = new FileReader();
            r.onload = function (ev) { resolve(r.result); };
            r.readAsBinaryString(new Blob([u8a], { type: "binary/octet-stream" }));
        });
    };
    ScanbotHTMLCamera.prototype.isiOS = function () {
        // @ts-ignore
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    };
    return ScanbotHTMLCamera;
}());
exports["default"] = ScanbotHTMLCamera;
// @ts-ignore
module.exports = ScanbotHTMLCamera;


/***/ }),

/***/ "./src/app/html5-camera/html5-camera.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/html5-camera/html5-camera.module.ts ***!
  \*****************************************************/
/*! exports provided: Html5CameraPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Html5CameraPageModule", function() { return Html5CameraPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _html5_camera_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./html5-camera.page */ "./src/app/html5-camera/html5-camera.page.ts");







var routes = [
    {
        path: '',
        component: _html5_camera_page__WEBPACK_IMPORTED_MODULE_6__["Html5CameraPage"]
    }
];
var Html5CameraPageModule = /** @class */ (function () {
    function Html5CameraPageModule() {
    }
    Html5CameraPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_html5_camera_page__WEBPACK_IMPORTED_MODULE_6__["Html5CameraPage"]]
        })
    ], Html5CameraPageModule);
    return Html5CameraPageModule;
}());



/***/ }),

/***/ "./src/app/html5-camera/html5-camera.page.html":
/*!*****************************************************!*\
  !*** ./src/app/html5-camera/html5-camera.page.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"home\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>html5-camera</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div id=\"buttonContainer\" text-center>\n    <ion-button color=\"success\" style=\"margin-right: 20px\" (click)=\"initialize()\">INITIALIZE</ion-button>\n    <ion-button color=\"danger\"  style=\"margin-left: 20px\" (click)=\"dispose()\"    >DISPOSE   </ion-button>\n  </div>\n\n  <div id=\"container\"></div>\n\n  <div id=\"foundBarcodeHeader\">Found the following barcode:</div>\n  <div id=\"barcodeFormat\">{{barcodeFormat}}</div>\n  <div id=\"barcodeText\">{{barcodeText}}</div>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/html5-camera/html5-camera.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/html5-camera/html5-camera.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#container {\n  width: 96%;\n  height: 200px;\n  margin-left: 2%;\n  margin-top: 10%;\n  border: 1px solid gray;\n  border-radius: 5px;\n}\n\n#foundBarcodeHeader {\n  margin-top: 20px;\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zYXJianlvdGNoYWhhbC9TY2FuYm90L3NjYW5ib3Qtc2RrLWV4YW1wbGUtaW9uaWMvc3JjL2FwcC9odG1sNS1jYW1lcmEvaHRtbDUtY2FtZXJhLnBhZ2Uuc2NzcyIsInNyYy9hcHAvaHRtbDUtY2FtZXJhL2h0bWw1LWNhbWVyYS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxVQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQ0FGOztBREdBO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtBQ0FGIiwiZmlsZSI6InNyYy9hcHAvaHRtbDUtY2FtZXJhL2h0bWw1LWNhbWVyYS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbiNjb250YWluZXIge1xuICB3aWR0aDogOTYlO1xuICBoZWlnaHQ6IDIwMHB4O1xuICBtYXJnaW4tbGVmdDogMiU7XG4gIG1hcmdpbi10b3A6IDEwJTtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4jZm91bmRCYXJjb2RlSGVhZGVyIHtcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4iLCIjY29udGFpbmVyIHtcbiAgd2lkdGg6IDk2JTtcbiAgaGVpZ2h0OiAyMDBweDtcbiAgbWFyZ2luLWxlZnQ6IDIlO1xuICBtYXJnaW4tdG9wOiAxMCU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuI2ZvdW5kQmFyY29kZUhlYWRlciB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/html5-camera/html5-camera.page.ts":
/*!***************************************************!*\
  !*** ./src/app/html5-camera/html5-camera.page.ts ***!
  \***************************************************/
/*! exports provided: Html5CameraPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Html5CameraPage", function() { return Html5CameraPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var cordova_plugin_scanbot_sdk_camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cordova-plugin-scanbot-sdk/camera */ "./node_modules/cordova-plugin-scanbot-sdk/camera.js");
/* harmony import */ var cordova_plugin_scanbot_sdk_camera__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cordova_plugin_scanbot_sdk_camera__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_scanbot_sdk_demo_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/scanbot-sdk-demo.service */ "./src/app/services/scanbot-sdk-demo.service.ts");
/* harmony import */ var _services_dialogs_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/dialogs.service */ "./src/app/services/dialogs.service.ts");
/* harmony import */ var _services_barcode_list_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/barcode-list.service */ "./src/app/services/barcode-list.service.ts");






// For plugin development/debugging, reference camera directly:
// import ScanbotHTMLCamera from '../../../plugins/cordova-plugin-scanbot-sdk/camera';
var Html5CameraPage = /** @class */ (function () {
    function Html5CameraPage(sdk, alert, _ngZone) {
        this.sdk = sdk;
        this.alert = alert;
        this._ngZone = _ngZone;
        this.showDetectionResult();
    }
    Html5CameraPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var permissionResult;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sdk.SDK.requestCameraPermission()];
                    case 1:
                        permissionResult = _a.sent();
                        if (!(permissionResult.status !== 'OK')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._ngZone.run(function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.alert.showAlert('Camera permission is required to capture video stream', 'Oops!')];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        this.container = document.getElementById('container');
                        return [2 /*return*/];
                }
            });
        });
    };
    Html5CameraPage.prototype.initialize = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, cordova_plugin_scanbot_sdk_camera__WEBPACK_IMPORTED_MODULE_2___default.a.create(this.container)];
                    case 1:
                        _a.camera = _b.sent();
                        this.camera.addViewFinder({
                        // backgroundColor: "blue",
                        // width: 300,
                        // height: 200,
                        // border: "5px solid red",
                        // borderRadius: 0
                        });
                        this.camera.startBarcodeDetector(_services_barcode_list_service__WEBPACK_IMPORTED_MODULE_5__["BarcodeListService"].getAcceptedTypes(), function (result) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            var info, barcode;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.sdk.SDK.getLicenseInfo()];
                                    case 1:
                                        info = _a.sent();
                                        if (!info.info.isLicenseValid) {
                                            this.camera.stopBarcodeDetector();
                                            this.showDetectionResult('License expired', 'Barcode detection stopped');
                                            return [2 /*return*/];
                                        }
                                        if (result.barcodes.length === 0) {
                                            this.showDetectionResult();
                                            return [2 /*return*/];
                                        }
                                        barcode = result.barcodes[0];
                                        this.showDetectionResult(barcode.type, barcode.text);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    Html5CameraPage.prototype.dispose = function () {
        this.camera.dispose();
    };
    Html5CameraPage.prototype.showDetectionResult = function (format, text) {
        var _this = this;
        if (format === void 0) { format = '-'; }
        if (text === void 0) { text = '-'; }
        this._ngZone.run(function () {
            _this.barcodeFormat = format;
            _this.barcodeText = text;
        });
    };
    Html5CameraPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-html5-camera',
            template: __webpack_require__(/*! ./html5-camera.page.html */ "./src/app/html5-camera/html5-camera.page.html"),
            styles: [__webpack_require__(/*! ./html5-camera.page.scss */ "./src/app/html5-camera/html5-camera.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_scanbot_sdk_demo_service__WEBPACK_IMPORTED_MODULE_3__["ScanbotSdkDemoService"], _services_dialogs_service__WEBPACK_IMPORTED_MODULE_4__["DialogsService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], Html5CameraPage);
    return Html5CameraPage;
}());



/***/ })

}]);
//# sourceMappingURL=html5-camera-html5-camera-module.js.map