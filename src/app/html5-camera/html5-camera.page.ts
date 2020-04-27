import { Component, OnInit } from '@angular/core';
import {ScanbotHTMLCamera} from '../../../plugins/cordova-plugin-scanbot-sdk/camera';

@Component({
  selector: 'app-html5-camera',
  templateUrl: './html5-camera.page.html',
  styleUrls: ['./html5-camera.page.scss'],
})
export class Html5CameraPage implements OnInit {

  constructor() { }

  async ngOnInit() {

    const container = document.getElementById('cameraContainer');
    const camera = await ScanbotHTMLCamera.create(container);
    
    camera.startBarcodeDetector(result => {
      console.log('Result:', result);
    });
  }

}
