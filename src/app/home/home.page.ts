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
    IdCardScannerConfiguration,
    BatchBarcodeScannerConfiguration
} from 'cordova-plugin-scanbot-sdk';

import { DialogsService } from '../services/dialogs.service';
import { ScanbotSdkDemoService } from '../services/scanbot-sdk-demo.service';
import { ImageResultsRepository } from '../services/image-results.repository';
import { BarcodeListService } from '../services/barcode-list.service';
import { IdCardScanResultsService } from '../services/idcard-scan-results.service';
import { BarcodeDocumentListService } from '../services/barcode-document-list.service';
import ScanbotImagePicker, { ScanbotImagePickerSingleConfiguration } from 'cordova-plugin-scanbot-image-picker'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    
    constructor(private scanbotService: ScanbotSdkDemoService,
        private imageResultsRepository: ImageResultsRepository,
        private dialogsService: DialogsService,
        private platform: Platform,
        private router: Router
    ) {        
        document.addEventListener('deviceready', function() {
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
                console.log('Feature ' + feature + ' is not available because license is ' + status);
            });
        });
    }
        
    async startDocumentScanner() {
        
        if (!(await this.scanbotService.checkLicense())) { return; }
        
        const configs = this.scanbotService.globalDocScannerConfigs();
        const result = await this.scanbotService.SDK.UI.startDocumentScanner({uiConfigs: configs});
        
        if (result.status === 'CANCELED') {
            // user has canceled the scanning operation
            return;
        }
        
        await this.imageResultsRepository.addPages(result.pages);
        await this.gotoImageResults();
    }
    
    async pickImageFromPhotoLibrary() {
        // Import an image from Photo Library and run auto document detection on it.
        
        const result = await ScanbotImagePicker.pickImage();
        if (result.status != "OK" || !result.imageFileUri) {
            return;
        }

        const originalImageFileUri = result.imageFileUri;
        
        if (!(await this.scanbotService.checkLicense())) { return; }
        
        const loading = await this.dialogsService.createLoading('Auto-detecting and cropping...');
        try {
            await loading.present();
            
            // First create a new SDK page with the selected original image file:
            const createResult = await this.scanbotService.SDK.createPage({originalImageFileUri});
            // and then run auto document detection and cropping on this new page:
            const docResult = await this.scanbotService.SDK.detectDocumentOnPage({page: createResult.page});
            
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
                barcodeImageGenerationType: 'VIDEO_FRAME',
                orientationLockMode: 'PORTRAIT',
                finderLineColor: '#0000ff',
                finderAspectRatio: { width: 2, height: 1 },
                topBarBackgroundColor: '#c8193c',
                useButtonsAllCaps: false,
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
            orientationLockMode: 'PORTRAIT',
            useButtonsAllCaps: false,
            
            // see further configs ...
        }
        
        const result = await this.scanbotService.SDK.UI.startBatchBarcodeScanner({uiConfigs: configs});
        
        if (result.status === 'OK') {
            BarcodeListService.detectedBarcodes = [{
                barcodes: result.barcodes || [],
                snappedImage: result.imageFileUri
            }];
            await this.router.navigateByUrl('/barcode-result-list');
        }
    }
    
    async startIdCardScanner() {
        if (!(await this.scanbotService.checkLicense())) { return; }
        
        const config: IdCardScannerConfiguration = {
            shouldSavePhotoImageInStorage: true
        };
        const result = await this.scanbotService.SDK.UI.startIdCardScanner({uiConfigs: config});
        
        if (result.status === 'OK') {
            IdCardScanResultsService.fields = result.fields;
            await this.router.navigateByUrl('/idcard-scan-results');
        }
    }
    
    async startMrzScanner() {
        
        if (!(await this.scanbotService.checkLicense())) { return; }
        
        const config: MrzScannerConfiguration = {
            // Customize colors, text resources, etc..
            finderTextHint: 'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.',
            orientationLockMode: 'PORTRAIT',
            // see further configs ...
        };
        
        if (this.platform.is('ios')) {
            const widthPx = window.screen.width;
            config.finderWidth = widthPx * 0.9;
            config.finderHeight = widthPx * 0.18;
        }
        
        const result = await this.scanbotService.SDK.UI.startMrzScanner({uiConfigs: config});
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
            orientationLockMode: 'PORTRAIT',
            // see further configs ...
        };
        const result = await this.scanbotService.SDK.UI.startEHICScanner({uiConfigs: config});
        if (result.status === 'OK') {
            const fields = result.ehicResult.fields.map(f => `<div>${f.type}: ${f.value} (${f.confidence.toFixed(2)})</div>`);
            await this.dialogsService.showAlert(fields.join(''), 'EHIC Result');
        }
    }
    
    async setAcceptedBarcodeFormats() {
        await this.router.navigateByUrl('/barcode-list');
    }
    
    async setAcceptedBarcodeDocumentFormats() {
        await this.router.navigateByUrl('/barcode-document-list')
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

        const pickerResult = await ScanbotImagePicker.pickImage({
            imageQuality: 70
        });
        
        if (pickerResult.status != "OK" || !pickerResult.imageFileUri) {
            return;
        }
        
        const imageUri = pickerResult.imageFileUri as string;
        
        if (!(await this.scanbotService.checkLicense())) { return; }
        
        const loading = await this.dialogsService.createLoading('Detecting barcodes...');
        await loading.present();
        const result = await this.scanbotService.SDK.detectBarcodesOnImage(
            { imageFileUri: imageUri, barcodeFormats: BarcodeListService.getAcceptedTypes() }
            );
            
            BarcodeListService.detectedBarcodes = [{
                barcodes: result.barcodes || [],
                snappedImage: imageUri
            }]
            
            await loading.dismiss();
            await this.router.navigateByUrl('/barcode-result-list');
        }
        
    async importImagesAndDetectBarcodes() {
        if (!(await this.scanbotService.checkLicense())) { return; }
        
        // Shows Image Picker and retrieves Image URI(s)
        const pickerLoading = await this.dialogsService.createLoading("");
        await pickerLoading.present();
        var result = await ScanbotImagePicker.pickImages({
            maxImages: 10,
            imageQuality: 90
        })
        await pickerLoading.dismiss();
        
        if (!result || result.status != "OK") {
            return;
        }
        
        // Detects Barcodes on the given images
        const loading = await this.dialogsService.createLoading('Detecting barcodes...');
        await loading.present();
        const scanResult = await this.scanbotService.SDK.detectBarcodesOnImages({
            imageFilesUris: result.imageFilesUris,
            barcodeFormats: BarcodeListService.getAcceptedTypes()
        })
        await loading.dismiss();
        
        let results = scanResult.results;
        if(!results) {
            await this.dialogsService.showAlert("No barcodes detected", "Results");
            return;
        }
        
        BarcodeListService.detectedBarcodes = [];
        
        for(let i=0; i<results.length; ++i) {
            let result = results[i];
            
            BarcodeListService.detectedBarcodes.push({
                snappedImage: result.imageFileUri,
                barcodes: result.barcodeResults.map ((item) => { return { type: item.type, text: item.text }})
            });
            
        }
        
        await this.router.navigateByUrl('/barcode-result-list');
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
            orientationLockMode: 'PORTRAIT',
            confirmationDialogConfirmButtonFilled: true,
            // see further configs...
        };
        
        const result = await this.scanbotService.SDK.UI.startLicensePlateScanner({uiConfigs: config});
        
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
            orientationLockMode: 'PORTRAIT',
            // see further configs...
        };
        
        const scannerStep: TextDataScannerStep = {
            guidanceText: 'Place the LC display in the frame to scan it',
            textFilterStrategy: 'LC_DOT_MATRIX_DISPLAY',
        };
        
        const result = await this.scanbotService.SDK.UI.startDataScanner({uiConfigs, scannerStep});
        if (result.status === 'OK') {
            await this.dialogsService.showAlert(`Value: ${result.dataResult.textValue}`, 'Scanner Result');
        }
    }
            
}
        