import {Component} from '@angular/core';
import {BarcodeListService, BarcodesDetectionViewModel} from '../services/barcode-list.service';
import {ByteArrayUtils} from 'src/utils/byte-array-utils';
import {ImageResultsRepository} from '../services/image-results.repository';

@Component({
    selector: 'app-barcode-result-list',
    templateUrl: './barcode-result-list.page.html',
    styleUrls: ['./barcode-result-list.page.scss'],
})
export class BarcodeResultListPage {

    detectedBarcodes: BarcodesDetectionViewModel[];

    constructor(private imageResultsRepository: ImageResultsRepository,) {
        let detectedBarcodes = BarcodeListService.detectedBarcodes || [];

        detectedBarcodes = detectedBarcodes.map((item) => {
            if (item.snappedImage) {
                item.snappedImage = this.imageResultsRepository.sanitizeFileUri(item.snappedImage);
            }

            item.barcodes.forEach(element => {
                element.rawBytesString = ByteArrayUtils.toString(element.rawBytes);
            });
            return item;
        });

        this.detectedBarcodes = detectedBarcodes;
    }
}
