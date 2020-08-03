import {Component, NgZone, OnInit} from '@angular/core';
import ScanbotHTMLCamera from 'cordova-plugin-scanbot-sdk/camera';
import {ScanbotSdkDemoService} from '../services/scanbot-sdk-demo.service';
import {DialogsService} from '../services/dialogs.service';
import {BarcodeListService} from '../services/barcode-list.service';
// For plugin development/debugging, reference camera directly:
// import ScanbotHTMLCamera from '../../../plugins/cordova-plugin-scanbot-sdk/camera';

@Component({
  selector: 'app-html5-camera',
  templateUrl: './html5-camera.page.html',
  styleUrls: ['./html5-camera.page.scss'],
})
export class Html5CameraPage implements OnInit {

  public barcodeFormat: string;
  public barcodeText: string;
  public container: HTMLElement;
  public camera: ScanbotHTMLCamera;

  constructor(private sdk: ScanbotSdkDemoService, private alert: DialogsService, private _ngZone: NgZone) {
      this.showDetectionResult();
  }

  async ngOnInit() {
    // 'requestCameraPermission' is a helper function, not required by ScanbotHTMLCamera.
    // If already have your own logic (e.g. another plugin) to request permission, feel free to do that
    const permissionResult = await this.sdk.SDK.requestCameraPermission();
    if (permissionResult.status !== 'OK') {
      await this._ngZone.run(async () => {
        await this.alert.showAlert('Camera permission is required to capture video stream', 'Oops!');
      });
      return;
    }

    this.container = document.getElementById('container');
  }

  async initialize() {
    this.camera = await ScanbotHTMLCamera.create(this.container);


    this.camera.addViewFinder({
      // backgroundColor: "blue",
      // width: 300,
      // height: 200,
      // border: "5px solid red",
      // borderRadius: 0
    });

    this.camera.startBarcodeDetector(BarcodeListService.getAcceptedTypes(), async result => {
      const info = await this.sdk.SDK.getLicenseInfo();
      if (!info.info.isLicenseValid) {
        this.camera.stopBarcodeDetector();
        this.showDetectionResult('License expired', 'Barcode detection stopped');
        return;
      }

      if (result.barcodes.length === 0) {
        this.showDetectionResult();
        return;
      }
      // The scan result can contain multiple barcodes,
      // this example just conveniently displays the first one
      const barcode = result.barcodes[0];
      this.showDetectionResult(barcode.type, barcode.text);
    });
  }

  dispose() {
    this.camera.dispose();
  }

  showDetectionResult(format = '-', text = '-') {
    this._ngZone.run(() => {
      this.barcodeFormat = format;
      this.barcodeText = text;
    });
  }
}
