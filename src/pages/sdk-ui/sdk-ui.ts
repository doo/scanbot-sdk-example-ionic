import { Component, ChangeDetectorRef } from '@angular/core';


declare var ScanbotSdkUi: any;
declare var ScanbotSdk: any;

const IMAGE_QUALITY = 70;

@Component({
  selector: 'page-sdk-ui',
  templateUrl: 'sdk-ui.html'
})
export class SdkUiPage {

  public currentDocumentImageUri: string = '';
  public currentOriginalImageUri: string = '';
  public pdfFileUri: string = '';
  public barcodeResult: string = '';

  constructor(private changeDetector: ChangeDetectorRef) { }

  public startCameraUi() {
    let options = {
      edgeColor: '#0000ff',
      quality: 70,
      sampleSize: 2 // change to 1 for full resolution images
    };
    ScanbotSdkUi.startCamera(
      (result) => {
        this.currentDocumentImageUri = result.imageFileUri;
        this.currentOriginalImageUri = result.originalImageFileUri;
        this.changeDetector.detectChanges();
      },
      this.callbackError, options
    );
  }

  private callbackError(error: string) {
    console.log('Error from Scanbot SDK Plugin: ' + error);
  }

  public startCroppingUi() {
    let options = {
      imageFileUri: this.currentOriginalImageUri,
      edgeColor: '#0000ff',
      quality: IMAGE_QUALITY
    };
    ScanbotSdkUi.startCropping(
      (result) => {
        this.currentDocumentImageUri = result.imageFileUri;
        this.changeDetector.detectChanges();
      },
      this.callbackError, options
    );
  }

  public roateImage() {
    let options = {
      imageFileUri: this.currentDocumentImageUri,
      degrees: -90,
      quality: IMAGE_QUALITY
    };
    ScanbotSdk.rotateImage(
      (result) => {
        this.currentDocumentImageUri = result.imageFileUri;
        this.changeDetector.detectChanges();
      },
      this.callbackError, options
    );
  }

  public createPdf() {
    let options = { images: [this.currentDocumentImageUri] };
    ScanbotSdk.createPdf(
      (result) => {
        this.pdfFileUri = result.pdfFileUri;
        this.changeDetector.detectChanges();
      },
      this.callbackError, options
    );
  }

  public startBarcodeScannerUi() {
    this.barcodeResult = '';

    let options = {
      flashEnabled: false,
      playTone: true,
      vibrate: true,
      //barcodeFormats: [ScanbotSdk.BarcodeFormat.EAN_8, ScanbotSdk.BarcodeFormat.EAN_13, ScanbotSdk.BarcodeFormat.CODE_128]
    };
    ScanbotSdkUi.startBarcodeScanner(
      (result) => {
        this.barcodeResult = 'Barcode format: ' + result.barcodeFormat + ', ' + 'Value: ' + result.textValue;
        this.changeDetector.detectChanges();
      },
      this.callbackError, options
    );
  }

}
