import { Component, ChangeDetectorRef } from '@angular/core';


declare var ScanbotSdkUi: any;

@Component({
  selector: 'page-sdk-ui',
  templateUrl: 'sdk-ui.html'
})
export class SdkUiPage {

  public currentDocumentImageUri: string = '';
  public currentOriginalImageUri: string = '';

  constructor(private changeDetector: ChangeDetectorRef) { }

  public startCameraUi() {
    let options = {
      edgeColor: '#0000ff',
      quality: 70
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
      quality: 70
    };
    ScanbotSdkUi.startCropping(
      (result) => {
        this.currentDocumentImageUri = result.imageFileUri;
        this.changeDetector.detectChanges();
      },
      this.callbackError, options
    );
  }

}
