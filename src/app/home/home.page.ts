import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ActionSheetController} from '@ionic/angular';

import {
    BatchBarcodeScannerConfiguration,
    CheckRecognizerConfiguration,
    GenericDocumentRecognizerConfiguration,
    HealthInsuranceCardScannerConfiguration,
    LicensePlateScannerConfiguration,
    LicensePlateScanStrategy,
    MedicalCertificateRecognizerConfiguration,
    MrzScannerConfiguration,
    TextDataScannerConfiguration,
    VinScannerConfiguration
} from 'cordova-plugin-scanbot-sdk';

import {Camera, PictureSourceType} from '@ionic-native/camera';
import {BarcodeDocumentListService} from '../services/barcode-document-list.service';
import {BarcodeListService} from '../services/barcode-list.service';
import {DialogsService} from '../services/dialogs.service';
import {ImageResultsRepository} from '../services/image-results.repository';
import {ScanbotSdkDemoService} from '../services/scanbot-sdk-demo.service';
import {ScannerResultsService} from '../services/scanner-results.service';
import {IMAGE_FILTER_LIST} from '../../utils/image-filters';

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
        private actionSheetController: ActionSheetController,
        private router: Router
    ) {
    }

    async startDocumentScanner() {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const configs = this.scanbotService.globalDocScannerConfigs();
            const result = await this.scanbotService.SDK.UI.startDocumentScanner({uiConfigs: configs});

            if (result.status === 'CANCELED') {
                // user has canceled the scanning operation
                return;
            }

            await this.imageResultsRepository.addPages(result.pages);
            await this.gotoImageResults();
        } catch (e) {
            await this.dialogsService.showAlert(e.message);
        }
    }

    async startFinderDocumentScanner() {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const configs = this.scanbotService.globalFinderDocScannerConfigs();
            const result = await this.scanbotService.SDK.UI.startFinderDocumentScanner({uiConfigs: configs});

            if (result.status === 'CANCELED') {
                // user has canceled the scanning operation
                return;
            }

            await this.imageResultsRepository.updatePage(result.pages[0]);
            await this.gotoImageResults();
        } catch (e) {
            await this.dialogsService.showAlert(e.message);
        }
    }

    async pickImageFromPhotoLibrary() {
        // Import an image from Photo Library and run auto document detection on it.

        const imageFileUri = await Camera.getPicture({
            sourceType: PictureSourceType.PHOTOLIBRARY
        });

        if (!(await this.scanbotService.checkLicense())) {
            return;
        }

        const loading = await this.dialogsService.createLoading('Auto-detecting and cropping...');
        try {
            await loading.present();

            // First create a new SDK page with the selected original image file:
            const createResult = await this.scanbotService.SDK.createPage({originalImageFileUri: imageFileUri});
            // and then run auto document detection and cropping on this new page:
            const docResult = await this.scanbotService.SDK.detectDocumentOnPage({page: createResult});

            await this.imageResultsRepository.addPages([docResult]);
            await this.gotoImageResults();
        } catch (e: any) {
            console.error('Unable to process selected image.', e);
            await this.dialogsService.showAlert(e.message, 'ERROR', 'Unable to process selected image.');
        } finally {
            await loading.dismiss();
        }
    }

    async detectDocumentOnImage() {
        const imageFileUri = await Camera.getPicture({
            sourceType: PictureSourceType.PHOTOLIBRARY
        });

        if (!(await this.scanbotService.checkLicense())) {
            return;
        }

        const loading = await this.dialogsService.createLoading('Detecting...');
        try {
            await loading.present();

            // Detect document on selected image
            const result = await this.scanbotService.SDK.detectDocument({imageFileUri});
            // Analyze document quality on selected image
            const quality = await this.scanbotService.SDK.documentQualityAnalyzer({imageFileUri});

            await this.dialogsService.showAlert(`Detected Document result: ${JSON.stringify(result, null, 2)}\n` +
                `Document Quality result: ${JSON.stringify(quality, null, 2)}`, 'Document detection');

        } catch (e: any) {
            console.error('Unable to process selected image.', e);
            await this.dialogsService.showAlert(e.message, 'ERROR', 'Unable to process selected image.');
        } finally {
            await loading.dismiss();
        }
    }

    async gotoImageResults() {
        await this.router.navigateByUrl('/image-results');
    }

    async startBarcodeScanner() {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const result = await this.scanbotService.SDK.UI.startBarcodeScanner({
                uiConfigs: {
                    // Customize colors, text resources, behavior, etc..
                    finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.',
                    barcodeFormats: BarcodeListService.getAcceptedTypes(),
                    acceptedDocumentFormats: BarcodeDocumentListService.getAcceptedFormats(),
                    finderLineColor: '#0000ff',
                    finderAspectRatio: {width: 2, height: 1},
                    topBarBackgroundColor: '#c8193c',
                    useButtonsAllCaps: false,
                    // msiPlesseyChecksumAlgorithm: 'Mod1110NCR',
                    // see further configs ...
                }
            });

            if (result.status === 'OK') {
                BarcodeListService.detectedBarcodes = [{
                    barcodes: result.barcodes || [],
                }];
                await this.router.navigateByUrl('/barcode-result-list');
            }
        } catch (e) {
            await this.dialogsService.showAlert(e.message);
        }
    }

    async startBatchBarcodeScanner() {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const configs: BatchBarcodeScannerConfiguration = {
                // Customize colors, text resources, behavior, etc..
                finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.',
                barcodeFormats: BarcodeListService.getAcceptedTypes(),
                acceptedDocumentFormats: BarcodeDocumentListService.getAcceptedFormats(),
                finderAspectRatio: {width: 1, height: 1},
                orientationLockMode: 'NONE',
                useButtonsAllCaps: false,
                // msiPlesseyChecksumAlgorithm: 'Mod1110NCR',
                // see further configs ...
            };

            const result = await this.scanbotService.SDK.UI.startBatchBarcodeScanner({uiConfigs: configs});

            if (result.status === 'OK') {
                BarcodeListService.detectedBarcodes = [{
                    barcodes: result.barcodes || [],
                }];
                await this.router.navigateByUrl('/barcode-result-list');
            }
        } catch (e) {
            await this.dialogsService.showAlert(e.message);
        }
    }

    async startGenericDocumentRecognizer() {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const config: GenericDocumentRecognizerConfiguration = {
                finderLineColor: '#ff0000',
            };
            const result = await this.scanbotService.SDK.UI.startGenericDocumentRecognizer({uiConfigs: config});

            console.log(JSON.stringify(result));

            if (result.status === 'OK') {
                ScannerResultsService.genericDocumentRecognizerResult = result;
                await this.router.navigateByUrl('/generic-document-recognizer-results');
            }
        } catch (e) {
            await this.dialogsService.showAlert(e.message);
        }
    }

    async startCheckRecognizer() {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const config: CheckRecognizerConfiguration = {};
            const result = await this.scanbotService.SDK.UI.startCheckRecognizer({uiConfigs: config});

            console.log(JSON.stringify(result));

            if (result.status === 'OK') {
                ScannerResultsService.checkRecognizerResult = result;
                await this.router.navigateByUrl('/check-recognizer-results');
            } else {
                await this.dialogsService.showAlert(result.status, 'Check Recognition Failed');
            }
        } catch (e) {
            await this.dialogsService.showAlert(e.message);
        }
    }

    async startMrzScanner() {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const config: MrzScannerConfiguration = {
                // Customize colors, text resources, etc..
                finderTextHint: 'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.',
                orientationLockMode: 'PORTRAIT',
                // see further configs ...
            };

            const result = await this.scanbotService.SDK.UI.startMrzScanner({uiConfigs: config});
            if (result.status === 'OK') {
                ScannerResultsService.mrzScannerResult = result;
                await this.router.navigateByUrl('/mrz-scanner-results');
            }
        } catch (e) {
            await this.dialogsService.showAlert(e.message);
        }
    }

    async startEHICScanner() {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const config: HealthInsuranceCardScannerConfiguration = {
                finderTextHint: 'Please hold your phone over the back of your Health Insurance Card.',
                orientationLockMode: 'PORTRAIT',
                // see further configs ...
            };
            const result = await this.scanbotService.SDK.UI.startEHICScanner({uiConfigs: config});
            if (result.status === 'OK') {
                const fields = result.fields.map(f => `<div>${f.type}: ${f.value} (${f.confidence.toFixed(2)})</div>`);
                await this.dialogsService.showAlert(fields.join(''), 'EHIC Result');
            }
        } catch (e) {
            await this.dialogsService.showAlert(e.message);
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
        await this.dialogsService.showAlert(JSON.stringify(result), 'License Info');
    }

    async viewOcrConfigs() {
        const result = await this.scanbotService.SDK.getOcrConfigs();
        await this.dialogsService.showAlert(JSON.stringify(result), 'OCR Configs');
    }

    async importAndDetectBarcodes() {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const imageFileUri = await Camera.getPicture({
                sourceType: PictureSourceType.PHOTOLIBRARY
            });

            const loading = await this.dialogsService.createLoading('Detecting barcodes...');
            await loading.present();
            const result = await this.scanbotService.SDK.detectBarcodesOnImage({
                imageFileUri,
                barcodeFormats: BarcodeListService.getAcceptedTypes()
            });

            if (result.status !== 'OK') {
                await loading.dismiss();
                await this.dialogsService.showAlert('ERROR', '');
            }

            BarcodeListService.detectedBarcodes = [{
                barcodes: result.barcodes || [],
                snappedImage: imageFileUri
            }];

            await loading.dismiss();
            await this.router.navigateByUrl('/barcode-result-list');
        } catch (e) {
            await this.dialogsService.showAlert(e.message);
        }
    }

    async importAndRecognizeCheck() {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const imageFileUri = await Camera.getPicture({
                sourceType: PictureSourceType.PHOTOLIBRARY
            });

            const loading = await this.dialogsService.createLoading('Recognizing check...');
            await loading.present();
            const result = await this.scanbotService.SDK.recognizeCheckOnImage({
                imageFileUri,
            });

            await loading.dismiss();

            if (result.status === 'OK') {
                ScannerResultsService.checkRecognizerResult = result;
                await this.router.navigateByUrl('/check-recognizer-results');
            } else {
                await this.dialogsService.showAlert(result.status, 'Check Recognition Failed');
            }
        } catch (e) {
            await this.dialogsService.showAlert(e.message);
        }
    }

    async startLicensePlateScanner(mode: LicensePlateScanStrategy) {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const config: LicensePlateScannerConfiguration = {
                scanStrategy: mode,
                topBarBackgroundColor: '#c8193c',
                topBarButtonsActiveColor: '#ffffff',
                cancelButtonTitle: 'Cancel',
                finderLineColor: '#c8193c',
                finderLineWidth: 5,
                finderTextHint: 'Place the whole license plate in the frame to scan it',
                orientationLockMode: 'PORTRAIT',
                confirmationDialogConfirmButtonFilled: true,
                // see further configs...
            };

            const result = await this.scanbotService.SDK.UI.startLicensePlateScanner({uiConfigs: config});

            if (result.status === 'OK') {
                await this.dialogsService.showAlert(
                    `Country Code: ${result.countryCode}<br>` +
                    `License Plate: ${result.licensePlate}<br><br>` +
                    `Confidence: ${result.confidence}<br>` +
                    'License Plate Result');
            }
        } catch (e) {
            await this.dialogsService.showAlert(e.message);
        }
    }

    async startTextDataScanner() {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const uiConfigs: TextDataScannerConfiguration = {
                cancelButtonTitle: 'Cancel',
                topBarBackgroundColor: '#c8193c',
                topBarButtonsActiveColor: '#ffffff',
                finderLineColor: '#c8193c',
                orientationLockMode: 'PORTRAIT',
                // see further configs...
            };

            const result = await this.scanbotService.SDK.UI.startTextDataScanner({uiConfigs});

            if (result.status === 'OK') {
                await this.dialogsService.showAlert(`Value: ${result.result?.text}`, 'Scanner Result');
            }
        } catch (e) {
            await this.dialogsService.showAlert(e.message);
        }
    }

    async startMedicalCertificateScanner() {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const config: MedicalCertificateRecognizerConfiguration = {
                topBarBackgroundColor: '#c8193c',
                userGuidanceStrings: {
                    capturing: 'Capturing',
                    scanning: 'Recognizing',
                    processing: 'Processing',
                    startScanning: 'Scanning Started',
                    paused: 'Paused',
                    energySaving: 'Energy Saving',
                },
                errorDialogMessage: 'Oops, something went wrong! Please, try again.',
                errorDialogOkButton: 'OK',
                errorDialogTitle: 'ERROR',
                cancelButtonHidden: false,
                recognizePatientInfo: true,
            };
            const result = await this.scanbotService.SDK.UI.startMedicalCertificateRecognizer({uiConfigs: config});

            if (result.status === 'OK') {
                ScannerResultsService.medicalCertificateScannerResult = result;
                await this.router.navigateByUrl('/medical-certificate-scanner-results');
            }

        } catch (e: any) {
            await this.dialogsService.showAlert(e.message || 'An unexpected error has occurred', 'Error');
        }
    }

    async startVINScanner() {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const config: VinScannerConfiguration = {
                topBarBackgroundColor: '#c8193c',
            };
            const result = await this.scanbotService.SDK.UI.startVinScanner({uiConfigs: config});

            if (result.status === 'OK') {
                const message = [
                    `- Raw Text: ${result.rawText}`,
                    result.confidenceValue &&
                    `- Confidence: ${(result.confidenceValue * 100).toFixed(0)}%`,
                    `- Validation: ${
                        result.validationSuccessful ? 'SUCCESSFUL' : 'NOT SUCCESSFUL'
                    }`,
                ].join('\n\n');
                await this.dialogsService.showAlert(message, 'VIN Scanner Result');
            }
        } catch (e: any) {
            await this.dialogsService.showAlert(e.message || 'An unexpected error has occurred', 'Error');
        }
    }

    async applyImageFilter() {
        try {
            if (!(await this.scanbotService.checkLicense())) {
                return;
            }

            const imageFileUri = await Camera.getPicture({
                sourceType: PictureSourceType.PHOTOLIBRARY
            });

            const buttons = IMAGE_FILTER_LIST.map(imageFilter => ({
                text: imageFilter,
                handler: async () => {
                    const result = await this.scanbotService.SDK.applyImageFilter({imageFileUri, imageFilter});
                    if (result.imageFileUri) {
                        const page = await this.scanbotService.SDK.createPage({originalImageFileUri: result.imageFileUri});
                        const documentPage = await this.scanbotService.SDK.detectDocumentOnPage({page});
                        await this.imageResultsRepository.addPages([documentPage]);
                        await this.router.navigate(['/image-view', documentPage.pageId]);
                    }
                }
            }));

            const actionSheet = await this.actionSheetController.create({
                header: 'Image Filters',
                buttons: buttons
            });
            await actionSheet.present();
        } catch (e) {
            await this.dialogsService.showAlert(e.message);
        }
    }

}
