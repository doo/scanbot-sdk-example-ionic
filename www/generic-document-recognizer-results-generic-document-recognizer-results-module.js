(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["generic-document-recognizer-results-generic-document-recognizer-results-module"],{

/***/ "./src/app/generic-document-recognizer-results/generic-document-recognizer-results.module.ts":
/*!***************************************************************************************************!*\
  !*** ./src/app/generic-document-recognizer-results/generic-document-recognizer-results.module.ts ***!
  \***************************************************************************************************/
/*! exports provided: GenericDocumentRecognizerResultsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenericDocumentRecognizerResultsPageModule", function() { return GenericDocumentRecognizerResultsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _generic_document_recognizer_results_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./generic-document-recognizer-results.page */ "./src/app/generic-document-recognizer-results/generic-document-recognizer-results.page.ts");







var routes = [
    {
        path: '',
        component: _generic_document_recognizer_results_page__WEBPACK_IMPORTED_MODULE_6__["GenericDocumentRecognizerResultsPage"]
    }
];
var GenericDocumentRecognizerResultsPageModule = /** @class */ (function () {
    function GenericDocumentRecognizerResultsPageModule() {
    }
    GenericDocumentRecognizerResultsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_generic_document_recognizer_results_page__WEBPACK_IMPORTED_MODULE_6__["GenericDocumentRecognizerResultsPage"]]
        })
    ], GenericDocumentRecognizerResultsPageModule);
    return GenericDocumentRecognizerResultsPageModule;
}());



/***/ }),

/***/ "./src/app/generic-document-recognizer-results/generic-document-recognizer-results.page.html":
/*!***************************************************************************************************!*\
  !*** ./src/app/generic-document-recognizer-results/generic-document-recognizer-results.page.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n      <ion-buttons slot=\"start\">\n          <ion-back-button defaultHref=\"home\"></ion-back-button>\n      </ion-buttons>\n      <ion-title  *ngIf=\"documentType\" >\n        {{documentType}} Generic Document Recognizer Results \n      </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <div *ngIf=\"photoUri\" style=\"margin: 1%; width: 98%; height: 50%; text-align: center; background-color: rgb(245, 245, 245)\">\n    <img style=\"max-width:100%; max-height:100%; vertical-align: middle;\" [src]=\"photoUri\"/>\n  </div>\n\n  <li *ngFor=\"let item of displayFields | keyvalue\" style=\"list-style: none;\">\n      <ion-item style=\"display: block;\">\n          <ion-label style=\"margin-left: 0.5em; font-size: 0.8em; font-weight: 600;\">{{item.key}}</ion-label>\n          <ion-label style=\"margin-left: 0.5em; font-size: 0.8em; font-weight: 400; white-space: pre-wrap\">{{item.value}}</ion-label>\n      </ion-item>\n  </li>\n\n</ion-content>\n\n<ion-footer>\n\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/generic-document-recognizer-results/generic-document-recognizer-results.page.scss":
/*!***************************************************************************************************!*\
  !*** ./src/app/generic-document-recognizer-results/generic-document-recognizer-results.page.scss ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2dlbmVyaWMtZG9jdW1lbnQtcmVjb2duaXplci1yZXN1bHRzL2dlbmVyaWMtZG9jdW1lbnQtcmVjb2duaXplci1yZXN1bHRzLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/generic-document-recognizer-results/generic-document-recognizer-results.page.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/generic-document-recognizer-results/generic-document-recognizer-results.page.ts ***!
  \*************************************************************************************************/
/*! exports provided: GenericDocumentRecognizerResultsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenericDocumentRecognizerResultsPage", function() { return GenericDocumentRecognizerResultsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_generic_document_recognizer_results_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/generic-document-recognizer-results.service */ "./src/app/services/generic-document-recognizer-results.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");




var GenericDocumentRecognizerResultsPage = /** @class */ (function () {
    function GenericDocumentRecognizerResultsPage(sanitizer) {
        this.sanitizer = sanitizer;
        this.fields = _services_generic_document_recognizer_results_service__WEBPACK_IMPORTED_MODULE_2__["GenericDocumentRecognizerResultsService"].fields;
        this.documentType = _services_generic_document_recognizer_results_service__WEBPACK_IMPORTED_MODULE_2__["GenericDocumentRecognizerResultsService"].documentType;
        this.displayFields = {};
        this.setupProperties();
    }
    GenericDocumentRecognizerResultsPage.prototype.setupProperties = function () {
        var _this = this;
        // Setup Photo Image URI from result Fields
        var photoImageUri = this.fields.photoImageUri;
        if (photoImageUri) {
            this.photoUri = this.sanitizeFileUri(photoImageUri);
        }
        // Setup Key - Value entries from result Fields
        Object.keys(this.fields).forEach(function (key) {
            var value = _this.fields[key];
            var out;
            if (value["text"]) {
                out = value["text"];
                if (value["confidence"]) {
                    var percentage = Math.round(value["confidence"] * 100);
                    out += "\n(confidence: " + percentage + "%)";
                }
            }
            else if (typeof value === 'string' || value instanceof String) {
                out = value;
            }
            if (out) {
                _this.displayFields[key] = out;
            }
        });
    };
    GenericDocumentRecognizerResultsPage.prototype.sanitizeFileUri = function (fileUri) {
        // see https://ionicframework.com/docs/building/webview/#file-protocol
        var convertedUri = window.Ionic.WebView.convertFileSrc(fileUri);
        // see https://angular.io/guide/security#bypass-security-apis
        return this.sanitizer.bypassSecurityTrustUrl(convertedUri);
    };
    GenericDocumentRecognizerResultsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-generic-document-recognizer-results',
            template: __webpack_require__(/*! ./generic-document-recognizer-results.page.html */ "./src/app/generic-document-recognizer-results/generic-document-recognizer-results.page.html"),
            styles: [__webpack_require__(/*! ./generic-document-recognizer-results.page.scss */ "./src/app/generic-document-recognizer-results/generic-document-recognizer-results.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]])
    ], GenericDocumentRecognizerResultsPage);
    return GenericDocumentRecognizerResultsPage;
}());



/***/ })

}]);
//# sourceMappingURL=generic-document-recognizer-results-generic-document-recognizer-results-module.js.map