import {Component, NgZone, OnInit} from '@angular/core';
import {ScanbotHTMLCamera} from '../../../plugins/cordova-plugin-scanbot-sdk/camera';

@Component({
  selector: 'app-html5-camera',
  templateUrl: './html5-camera.page.html',
  styleUrls: ['./html5-camera.page.scss'],
})
export class Html5CameraPage implements OnInit {

  public barcodeFormat: string;
  public barcodeText: string;

  constructor(private _ngZone: NgZone) {
    this.barcodeFormat = '-';
    this.barcodeText = '-';
  }

  async ngOnInit() {
    const container = document.getElementById('container');
    const camera = await ScanbotHTMLCamera.create(container);

    camera.startBarcodeDetector(result => {
      if (result.barcodes.length === 0) {
        return;
      }

      const barcode = result.barcodes[0];
      // Is ngZone supposed to be like the main thread?
      this._ngZone.run(() => {
        this.barcodeFormat = barcode.type;
        this.barcodeText = barcode.text;
      });
    });
  }
}
