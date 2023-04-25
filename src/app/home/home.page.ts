import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

import ScanbotSdk, {
    DataScannerConfiguration,
    HealthInsuranceCardScannerConfiguration,
    LicensePlateDetectorMode,
    LicensePlateScannerConfiguration,
    MrzScannerConfiguration,
    TextDataScannerStep,
    GenericDocumentRecognizerConfiguration,
    BatchBarcodeScannerConfiguration,
    CheckRecognizerConfiguration
} from 'cordova-plugin-scanbot-sdk';

import { DialogsService } from '../services/dialogs.service';
import { ScanbotSdkDemoService } from '../services/scanbot-sdk-demo.service';
import { ImageResultsRepository } from '../services/image-results.repository';
import { BarcodeListService } from '../services/barcode-list.service';
import { GenericDocumentRecognizerResultsService } from '../services/generic-document-recognizer-results.service';
import { BarcodeDocumentListService } from '../services/barcode-document-list.service';
import ScanbotImagePicker from 'cordova-plugin-scanbot-image-picker';
import { CheckRecognizerResultsService } from '../services/check-recognizer-results.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(
        private scanbotService: ScanbotSdkDemoService,
        private imageResultsRepository: ImageResultsRepository,
        private dialogsService: DialogsService,
        private platform: Platform,
        private router: Router
    ) {
        document.addEventListener('deviceready', function () {
            /*
            * Register a vanilla javascript callback, as setLicenseFailure registers a continuous callback
            * that does not adhere to the standards of promisified API.
            * All other Scanbot features are also a part of the normal, non-promisified API
            *
            * Note that, as is, license failure handler is never called, because in this example
            * we always check license validity before calling any Scanbot API.
            */
            ScanbotSdk.setLicenseFailureHandler(async callback => {
                const status = callback.licenseStatus;
                const feature = callback.licenseFeature;
                const errorMessage = callback.licenseErrorMessage;
                console.log('Feature ' + feature + ' is not available because license is ' + status + ' \n' + errorMessage);
            });
        });
    }

    async startDocumentScanner() {
        if (!(await this.scanbotService.checkLicense())) { return; }

        const configs = this.scanbotService.globalDocScannerConfigs();
        const result = await this.scanbotService.SDK.UI.startDocumentScanner({ uiConfigs: configs });

        if (result.status === 'CANCELED') {
            // user has canceled the scanning operation
            return;
        }

        await this.imageResultsRepository.addPages(result.pages);
        await this.gotoImageResults();
    }

    async startFinderDocumentScanner() {
        if (!(await this.scanbotService.checkLicense())) { return; }

        const configs = this.scanbotService.globalFinderDocScannerConfigs();
        const result = await this.scanbotService.SDK.UI.startFinderDocumentScanner({ uiConfigs: configs });

        if (result.status === 'CANCELED') {
            // user has canceled the scanning operation
            return;
        }

        await this.imageResultsRepository.updatePage(result.page);
        await this.gotoImageResults();
    }

    async pickImageFromPhotoLibrary() {
        // Import an image from Photo Library and run auto document detection on it.

        const result = await ScanbotImagePicker.pickImage();
        if (result.status !== 'OK' || !result.imageFileUri) {
            return;
        }

        const originalImageFileUri = result.imageFileUri;

        if (!(await this.scanbotService.checkLicense())) { return; }

        const loading = await this.dialogsService.createLoading('Auto-detecting and cropping...');
        try {
            await loading.present();

            // First create a new SDK page with the selected original image file:
            const createResult = await this.scanbotService.SDK.createPage({ originalImageFileUri });
            // and then run auto document detection and cropping on this new page:
            const docResult = await this.scanbotService.SDK.detectDocumentOnPage({ page: createResult.page });

            await this.imageResultsRepository.addPages([docResult.page]);
            await this.gotoImageResults();
        } catch (e) {
            console.error('Unable to process selected image.', e);
            await this.dialogsService.showAlert(e.message, 'ERROR', 'Unable to process selected image.');
        }
        finally {
            await loading.dismiss();
        }
    }

    async gotoImageResults() {
        await this.router.navigateByUrl('/image-results');
    }

    async startBarcodeScanner() {
        if (!(await this.scanbotService.checkLicense())) { return; }

        const result = await this.scanbotService.SDK.UI.startBarcodeScanner({
            uiConfigs: {
                // Customize colors, text resources, behavior, etc..
                finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.',
                barcodeFormats: BarcodeListService.getAcceptedTypes(),
                acceptedDocumentFormats: BarcodeDocumentListService.getAcceptedFormats(),
                barcodeImageGenerationType: 'NONE',
                finderLineColor: '#0000ff',
                finderAspectRatio: { width: 2, height: 1 },
                topBarBackgroundColor: '#c8193c',
                useButtonsAllCaps: false,
                // msiPlesseyChecksumAlgorithm: 'Mod1110NCR',
                // see further configs ...
            }
        });

        if (result.status === 'OK') {
            BarcodeListService.detectedBarcodes = [{
                barcodes: result.barcodes || [],
                snappedImage: result.imageFileUri
            }];
            await this.router.navigateByUrl('/barcode-result-list');
        }
    }

    async startBatchBarcodeScanner() {
        if (!(await this.scanbotService.checkLicense())) { return; }

        const configs: BatchBarcodeScannerConfiguration = {
            // Customize colors, text resources, behavior, etc..
            finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.',
            barcodeFormats: BarcodeListService.getAcceptedTypes(),
            acceptedDocumentFormats: BarcodeDocumentListService.getAcceptedFormats(),
            finderAspectRatio: { width: 1, height: 1 },
            interfaceOrientation: 'ALL',
            useButtonsAllCaps: false,
            // msiPlesseyChecksumAlgorithm: 'Mod1110NCR',
            // see further configs ...
        };

        const result = await this.scanbotService.SDK.UI.startBatchBarcodeScanner({ uiConfigs: configs });

        if (result.status === 'OK') {
            BarcodeListService.detectedBarcodes = [{
                barcodes: result.barcodes || [],
                snappedImage: result.imageFileUri
            }];
            await this.router.navigateByUrl('/barcode-result-list');
        }
    }

    async startGenericDocumentRecognizer() {
        if (!(await this.scanbotService.checkLicense())) { return; }

        const config: GenericDocumentRecognizerConfiguration = {
            shouldSavePhotoImageInStorage: true,
            detailsFieldConfiguration: {
                fieldLicenseCategoriesTitle: "NEW TITLE"
            }
        };
        const result = await this.scanbotService.SDK.UI.startGenericDocumentRecognizer({ uiConfigs: config });

        console.log(JSON.stringify(result));

        if (result.status === 'OK') {
            GenericDocumentRecognizerResultsService.fields = result.fields;
            GenericDocumentRecognizerResultsService.documentType = result.documentType;
            await this.router.navigateByUrl('/generic-document-recognizer-results');
        }
    }

    async startCheckRecognizer() {
        if (!(await this.scanbotService.checkLicense())) { return; }

        const config: CheckRecognizerConfiguration = {
        };
        const result = await this.scanbotService.SDK.UI.startCheckRecognizer({ uiConfigs: config });

        console.log(JSON.stringify(result));

        if (result.status === 'SUCCESS') {
            CheckRecognizerResultsService.checkRecognizerResult = result;
            await this.router.navigateByUrl('/check-recognizer-results');
        } else {
            await this.dialogsService.showAlert(result.status, 'Check Recognition Failed');
        }
    }

    async startMrzScanner() {
        if (!(await this.scanbotService.checkLicense())) { return; }

        const config: MrzScannerConfiguration = {
            // Customize colors, text resources, etc..
            finderTextHint: 'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.',
            interfaceOrientation: 'PORTRAIT',
            // see further configs ...
        };

        if (this.platform.is('ios')) {
            const widthPx = window.screen.width;
            config.finderWidth = widthPx * 0.9;
            config.finderHeight = widthPx * 0.18;
        }

        const result = await this.scanbotService.SDK.UI.startMrzScanner({ uiConfigs: config });
        if (result.status === 'OK') {
            const fields = result.mrzResult.fields.map(f => `<div>${f.name}: ${f.value} (${f.confidence.toFixed(2)})</div>`);
            await this.dialogsService.showAlert(fields.join(''), 'MRZ Result');
        }
    }

    async startEHICScanner() {

        if (!(await this.scanbotService.checkLicense())) {
            return;
        }

        const config: HealthInsuranceCardScannerConfiguration = {
            finderTextHint: 'Please hold your phone over the back of your Health Insurance Card.',
            interfaceOrientation: 'PORTRAIT',
            // see further configs ...
        };
        const result = await this.scanbotService.SDK.UI.startEHICScanner({ uiConfigs: config });
        if (result.status === 'OK') {
            const fields = result.ehicResult.fields.map(f => `<div>${f.type}: ${f.value} (${f.confidence.toFixed(2)})</div>`);
            await this.dialogsService.showAlert(fields.join(''), 'EHIC Result');
        }
    }

    async setAcceptedBarcodeFormats() {
        await this.router.navigateByUrl('/barcode-list');
    }

    async setAcceptedBarcodeDocumentFormats() {
        await this.router.navigateByUrl('/barcode-document-list');
    }

    async viewLicenseInfo() {
        const result = await this.scanbotService.SDK.getLicenseInfo();
        await this.dialogsService.showAlert(JSON.stringify(result.info), 'License Info');
    }

    async viewOcrConfigs() {
        const result = await this.scanbotService.SDK.getOcrConfigs();
        await this.dialogsService.showAlert(JSON.stringify(result), 'OCR Configs');
    }

    async openHTMLCameraPage() {
        if (this.platform.is('ios')) {
            await this.dialogsService.showAlert('HTML5 Camera is an Android-only feature');
            return;
        }

        await this.router.navigateByUrl('/html5-camera');
    }

    async importAndDetectBarcodes() {

        if (!(await this.scanbotService.checkLicense())) { return; }

        const pickerResult = await ScanbotImagePicker.pickImage({
            imageQuality: 85
        });

        if (pickerResult.status !== 'OK' || !pickerResult.imageFileUri) {
            var errorMessage = 'Unexpected error while loading the chosen image';
            if (pickerResult.message && pickerResult.message.length > 0) {
                errorMessage = pickerResult.message;
            }
            await this.dialogsService.showAlert(errorMessage);
            return;
        }

        const imageUri = pickerResult.imageFileUri as string;
        const loading = await this.dialogsService.createLoading('Detecting barcodes...');
        await loading.present();
        const result = await this.scanbotService.SDK.detectBarcodesOnImage({
            imageFileUri: imageUri,
            barcodeFormats: BarcodeListService.getAcceptedTypes()
        });

        if (result.status !== 'OK') {
            await loading.dismiss();
            await this.dialogsService.showAlert('ERROR: ' + result.message, 'ERROR');
        }

        BarcodeListService.detectedBarcodes = [{
            barcodes: result.barcodes || [],
            snappedImage: imageUri
        }];

        await loading.dismiss();
        await this.router.navigateByUrl('/barcode-result-list');
    }

    async importAndRecognizeCheck() {

        if (!(await this.scanbotService.checkLicense())) { return; }

        const pickerResult = await ScanbotImagePicker.pickImage({
            imageQuality: 85
        });

        if (pickerResult.status !== 'OK' || !pickerResult.imageFileUri) {
            var errorMessage = 'Unexpected error while loading the chosen image';
            if (pickerResult.message && pickerResult.message.length > 0) {
                errorMessage = pickerResult.message;
            }
            await this.dialogsService.showAlert(errorMessage);
            return;
        }

        const imageUri = pickerResult.imageFileUri as string;
        const loading = await this.dialogsService.createLoading('Recognizing check...');
        await loading.present();
        const result = await this.scanbotService.SDK.recognizeCheckOnImage({
            imageFileUri: imageUri
        });

        await loading.dismiss();

        if (result.status === 'SUCCESS') {
            CheckRecognizerResultsService.checkRecognizerResult = result;
            await this.router.navigateByUrl('/check-recognizer-results');
        } else {
            await this.dialogsService.showAlert(result.status, 'Check Recognition Failed');
        }
    }

    hasHtml5CameraSupport() {
        return this.platform.is('android');
    }

    async startLicensePlateScanner(mode: LicensePlateDetectorMode) {
        if (!(await this.scanbotService.checkLicense())) { return; }

        const config: LicensePlateScannerConfiguration = {
            detectorMode: mode,
            topBarBackgroundColor: '#c8193c',
            topBarButtonsColor: '#ffffff',
            cancelButtonTitle: 'Cancel',
            finderLineColor: '#c8193c',
            finderLineWidth: 5,
            guidanceText: 'Place the whole license plate in the frame to scan it',
            interfaceOrientation: 'PORTRAIT',
            confirmationDialogConfirmButtonFilled: true,
            // see further configs...
        };

        const result = await this.scanbotService.SDK.UI.startLicensePlateScanner({ uiConfigs: config });

        if (result.status === 'OK') {
            await this.dialogsService.showAlert(
                `Country Code: ${result.licensePlateResult.countryCode}<br>` +
                `License Plate: ${result.licensePlateResult.licensePlate}<br><br>` +
                `Confidence: ${result.licensePlateResult.confidence}<br>` +
                `Raw Text: ${result.licensePlateResult.rawText}`,
                'License Plate Result');
        }
    }

    async startLcDisplayScanner() {
        if (!(await this.scanbotService.checkLicense())) { return; }

        const uiConfigs: DataScannerConfiguration = {
            cancelButtonTitle: 'Cancel',
            topBarBackgroundColor: '#c8193c',
            topBarButtonsColor: '#ffffff',
            finderLineColor: '#c8193c',
            interfaceOrientation: 'PORTRAIT',
            // see further configs...
        };

        const scannerStep: TextDataScannerStep = {
            guidanceText: 'Place the LC display in the frame to scan it',
            textFilterStrategy: 'LC_DOT_MATRIX_DISPLAY',
        };

        const result = await this.scanbotService.SDK.UI.startDataScanner({ uiConfigs, scannerStep });
        if (result.status === 'OK') {
            await this.dialogsService.showAlert(`Value: ${result.dataResult.textValue}`, 'Scanner Result');
        }
    }
}
