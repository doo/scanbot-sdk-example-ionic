(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["barcode-document-list-barcode-document-list-module"],{

/***/ "./src/app/barcode-document-list/barcode-document-list.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/barcode-document-list/barcode-document-list.module.ts ***!
  \***********************************************************************/
/*! exports provided: BarcodeDocumentListModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarcodeDocumentListModule", function() { return BarcodeDocumentListModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _barcode_document_list_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./barcode-document-list.page */ "./src/app/barcode-document-list/barcode-document-list.page.ts");







var BarcodeDocumentListModule = /** @class */ (function () {
    function BarcodeDocumentListModule() {
    }
    BarcodeDocumentListModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _barcode_document_list_page__WEBPACK_IMPORTED_MODULE_6__["BarcodeDocumentListPage"]
                    }
                ])
            ],
            declarations: [_barcode_document_list_page__WEBPACK_IMPORTED_MODULE_6__["BarcodeDocumentListPage"]]
        })
    ], BarcodeDocumentListModule);
    return BarcodeDocumentListModule;
}());



/***/ }),

/***/ "./src/app/barcode-document-list/barcode-document-list.page.html":
/*!***********************************************************************!*\
  !*** ./src/app/barcode-document-list/barcode-document-list.page.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <ion-back-button defaultHref=\"home\"></ion-back-button>\n        </ion-buttons>\n        <ion-title>\n            Accepted Documents\n        </ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n    <ion-item style=\"display: block;\" lines=\"none\" class=\"ion-padding\">\n        <ion-label>Enable Document Filters</ion-label>\n        <ion-toggle value=\"{{isFilteringEnabled}}\" checked=\"{{isFilteringEnabled}}\" (ionChange)=\"onEnabledChange($event)\"></ion-toggle>\n    </ion-item>\n\n    <ion-item-divider>\n        <ion-label>Filters</ion-label>\n    </ion-item-divider>\n    <li *ngFor=\"let documentType of documentTypes\" style=\"list-style: none; padding-bottom: 32px;\" class=\"ion-padding\">\n        <ion-item style=\"display: block;\">\n            <ion-label>{{documentType.key}}</ion-label>\n            <ion-toggle value=\"{{documentType.key}}\" disabled=\"{{!isFilteringEnabled}}\" checked=\"{{documentType.value}}\" (ionChange)=\"onChange($event)\"></ion-toggle>\n        </ion-item>\n    </li>\n\n</ion-content>\n\n<ion-footer>\n\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/barcode-document-list/barcode-document-list.page.ts":
/*!*********************************************************************!*\
  !*** ./src/app/barcode-document-list/barcode-document-list.page.ts ***!
  \*********************************************************************/
/*! exports provided: BarcodeDocumentListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarcodeDocumentListPage", function() { return BarcodeDocumentListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_barcode_document_list_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/barcode-document-list.service */ "./src/app/services/barcode-document-list.service.ts");



var BarcodeDocumentListPage = /** @class */ (function () {
    function BarcodeDocumentListPage(ngZone) {
        this.ngZone = ngZone;
        this.documentTypes = [];
        this.documentTypes = _services_barcode_document_list_service__WEBPACK_IMPORTED_MODULE_2__["BarcodeDocumentListService"].list;
        this.isFilteringEnabled = _services_barcode_document_list_service__WEBPACK_IMPORTED_MODULE_2__["BarcodeDocumentListService"].isFilteringEnabled;
    }
    BarcodeDocumentListPage.prototype.onChange = function ($event) {
        var key = $event.detail.value;
        var value = $event.detail.checked;
        _services_barcode_document_list_service__WEBPACK_IMPORTED_MODULE_2__["BarcodeDocumentListService"].update({
            key: key,
            value: value
        });
    };
    BarcodeDocumentListPage.prototype.onEnabledChange = function ($event) {
        var _this = this;
        var value = $event.detail.checked;
        _services_barcode_document_list_service__WEBPACK_IMPORTED_MODULE_2__["BarcodeDocumentListService"].isFilteringEnabled = value;
        this.ngZone.run(function () {
            _this.isFilteringEnabled = _services_barcode_document_list_service__WEBPACK_IMPORTED_MODULE_2__["BarcodeDocumentListService"].isFilteringEnabled;
        });
    };
    BarcodeDocumentListPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-barcode-document-list',
            template: __webpack_require__(/*! ./barcode-document-list.page.html */ "./src/app/barcode-document-list/barcode-document-list.page.html"),
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], BarcodeDocumentListPage);
    return BarcodeDocumentListPage;
}());



/***/ })

}]);
//# sourceMappingURL=barcode-document-list-barcode-document-list-module.js.map