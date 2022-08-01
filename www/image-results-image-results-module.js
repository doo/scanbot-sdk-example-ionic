(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["image-results-image-results-module"],{

/***/ "./src/app/image-results/image-results.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/image-results/image-results.module.ts ***!
  \*******************************************************/
/*! exports provided: ImageResultsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageResultsPageModule", function() { return ImageResultsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _image_results_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./image-results.page */ "./src/app/image-results/image-results.page.ts");







var ImageResultsPageModule = /** @class */ (function () {
    function ImageResultsPageModule() {
    }
    ImageResultsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _image_results_page__WEBPACK_IMPORTED_MODULE_6__["ImageResultsPage"]
                    }
                ])
            ],
            declarations: [_image_results_page__WEBPACK_IMPORTED_MODULE_6__["ImageResultsPage"]]
        })
    ], ImageResultsPageModule);
    return ImageResultsPageModule;
}());



/***/ }),

/***/ "./src/app/image-results/image-results.page.html":
/*!*******************************************************!*\
  !*** ./src/app/image-results/image-results.page.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <ion-back-button defaultHref=\"home\"></ion-back-button>\n        </ion-buttons>\n        <ion-title>\n            Image Results\n        </ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-grid>\n        <ion-row *ngFor=\"let row of rows\">\n            <ng-container *ngFor=\"let page of row.pages\">\n                <ion-col size=\"4\" (click)=\"gotoImageView(page)\">\n                    <img [src]=\"sanitizedPreviewImages.get(page.pageId)\" />\n                </ion-col>\n            </ng-container>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <ion-button (click)=\"addScan()\">\n                <ion-icon slot=\"start\" name=\"add-circle\"></ion-icon>\n                Add\n            </ion-button>\n            <ion-button (click)=\"showSaveSelection()\">\n                <ion-icon slot=\"start\" name=\"document\"></ion-icon>\n                Save\n            </ion-button>\n        </ion-buttons>\n        <ion-buttons slot=\"end\">\n            <ion-button (click)=\"removeAll()\">\n                <ion-icon slot=\"start\" name=\"trash\"></ion-icon>\n                Delete All\n            </ion-button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/image-results/image-results.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/image-results/image-results.page.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ltYWdlLXJlc3VsdHMvaW1hZ2UtcmVzdWx0cy5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/image-results/image-results.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/image-results/image-results.page.ts ***!
  \*****************************************************/
/*! exports provided: ImageResultsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageResultsPage", function() { return ImageResultsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_dialogs_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/dialogs.service */ "./src/app/services/dialogs.service.ts");
/* harmony import */ var _services_scanbot_sdk_demo_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/scanbot-sdk-demo.service */ "./src/app/services/scanbot-sdk-demo.service.ts");
/* harmony import */ var _services_image_results_repository__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/image-results.repository */ "./src/app/services/image-results.repository.ts");







var ImageResultsPage = /** @class */ (function () {
    function ImageResultsPage(scanbotService, imageResultsRepository, dialogsService, platform, router, actionSheetController) {
        this.scanbotService = scanbotService;
        this.imageResultsRepository = imageResultsRepository;
        this.dialogsService = dialogsService;
        this.platform = platform;
        this.router = router;
        this.actionSheetController = actionSheetController;
        this.pages = [];
        this.rows = [];
        this.sanitizedPreviewImages = new Map();
    }
    ImageResultsPage.prototype.ionViewWillEnter = function () {
        this.reloadPages();
    };
    ImageResultsPage.prototype.reloadPages = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _i, _a, page, data, i;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.pages = this.imageResultsRepository.getPages();
                        _i = 0, _a = this.pages;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        page = _a[_i];
                        return [4 /*yield*/, this.scanbotService.fetchDataFromUri(page.documentPreviewImageFileUri)];
                    case 2:
                        data = _b.sent();
                        this.sanitizedPreviewImages.set(page.pageId, this.imageResultsRepository.sanitizeBase64(data));
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        // build rows
                        this.rows = [];
                        for (i = 0; i < this.pages.length; i += 3) {
                            this.rows.push({ pages: this.pages.slice(i, i + 3) });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageResultsPage.prototype.gotoImageView = function (page) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.router.navigate(['/image-view', page.pageId])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageResultsPage.prototype.saveAsPdf = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var loading, result, e_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.checkLicense()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        if (!this.checkImages()) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.dialogsService.createLoading('Creating PDF ...')];
                    case 2:
                        loading = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, 9, 11]);
                        return [4 /*yield*/, loading.present()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.scanbotService.SDK.createPdf({
                                images: this.pages.map(function (p) { return p.documentImageFileUri; }),
                                pageSize: 'FIXED_A4'
                            })];
                    case 5:
                        result = _a.sent();
                        return [4 /*yield*/, this.dialogsService.showAlert(result.pdfFileUri, 'PDF created')];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 7:
                        e_1 = _a.sent();
                        console.error('Unable to create PDF.', e_1);
                        return [4 /*yield*/, this.dialogsService.showAlert(e_1.message, 'ERROR')];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, loading.dismiss()];
                    case 10:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ImageResultsPage.prototype.saveAsPdfWithOcr = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var loading, result, e_2;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.checkLicense()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        if (!this.checkImages()) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.dialogsService.createLoading('Performing OCR and creating PDF ...')];
                    case 2:
                        loading = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, 9, 11]);
                        return [4 /*yield*/, loading.present()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.scanbotService.SDK.performOcr({
                                images: this.pages.map(function (p) { return p.documentImageFileUri; }),
                                languages: ['en'],
                                outputFormat: 'FULL_OCR_RESULT',
                            })];
                    case 5:
                        result = _a.sent();
                        return [4 /*yield*/, this.dialogsService.showAlert(result.pdfFileUri, 'PDF with OCR created')];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 7:
                        e_2 = _a.sent();
                        console.error('Unable to perform OCR.', e_2);
                        return [4 /*yield*/, this.dialogsService.showAlert(e_2.message, 'ERROR')];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, loading.dismiss()];
                    case 10:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ImageResultsPage.prototype.saveAsBinarizedTiff = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var loading, result, e_3;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.checkLicense()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        if (!this.checkImages()) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.dialogsService.createLoading('Creating TIFF ...')];
                    case 2:
                        loading = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, 9, 11]);
                        return [4 /*yield*/, loading.present()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.scanbotService.SDK.writeTiff({
                                images: this.pages.map(function (p) { return p.documentImageFileUri; }),
                                oneBitEncoded: true,
                                dpi: 300,
                            })];
                    case 5:
                        result = _a.sent();
                        return [4 /*yield*/, this.dialogsService.showAlert(result.tiffFileUri, 'TIFF file created')];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 7:
                        e_3 = _a.sent();
                        console.error('Unable to create TIFF.', e_3);
                        return [4 /*yield*/, this.dialogsService.showAlert(e_3.message, 'ERROR')];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, loading.dismiss()];
                    case 10:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ImageResultsPage.prototype.showSaveSelection = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: 'Save Images as',
                            buttons: [
                                {
                                    text: 'PDF',
                                    icon: 'document',
                                    handler: function () { _this.saveAsPdf(); }
                                },
                                {
                                    text: 'PDF with OCR',
                                    icon: 'document',
                                    handler: function () { _this.saveAsPdfWithOcr(); }
                                },
                                {
                                    text: 'TIFF (1-bit b&w)',
                                    icon: 'document',
                                    handler: function () { _this.saveAsBinarizedTiff(); }
                                },
                                {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () { }
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageResultsPage.prototype.checkImages = function () {
        if (this.pages.length > 0) {
            return true;
        }
        this.dialogsService.showAlert('Please scan some images via Document Scanner or import from Photo Library.', 'Images Required');
        return false;
    };
    ImageResultsPage.prototype.addScan = function () {
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
                        // for demo purposes we want to add only one page here.
                        configs.multiPageEnabled = false;
                        configs.multiPageButtonHidden = true;
                        return [4 /*yield*/, this.scanbotService.SDK.UI.startDocumentScanner({ uiConfigs: configs })];
                    case 2:
                        result = _a.sent();
                        if (result.status === 'CANCELED') {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.imageResultsRepository.addPages(result.pages)];
                    case 3:
                        _a.sent();
                        this.reloadPages();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageResultsPage.prototype.removeAll = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.scanbotService.SDK.cleanup()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.imageResultsRepository.removeAllPages()];
                    case 2:
                        _a.sent();
                        this.reloadPages();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageResultsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-image-results',
            template: __webpack_require__(/*! ./image-results.page.html */ "./src/app/image-results/image-results.page.html"),
            styles: [__webpack_require__(/*! ./image-results.page.scss */ "./src/app/image-results/image-results.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_scanbot_sdk_demo_service__WEBPACK_IMPORTED_MODULE_5__["ScanbotSdkDemoService"],
            _services_image_results_repository__WEBPACK_IMPORTED_MODULE_6__["ImageResultsRepository"],
            _services_dialogs_service__WEBPACK_IMPORTED_MODULE_4__["DialogsService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"]])
    ], ImageResultsPage);
    return ImageResultsPage;
}());



/***/ })

}]);
//# sourceMappingURL=image-results-image-results-module.js.map