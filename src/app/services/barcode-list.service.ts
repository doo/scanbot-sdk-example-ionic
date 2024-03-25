import { Injectable } from '@angular/core';
import { BarcodeFormat } from 'cordova-plugin-scanbot-sdk';

export interface BarcodesDetectionViewModel {
    snappedImage?: string;
    barcodes: {
        text: string,
        type: string,
        rawBytes: number[]
        rawBytesString?: string
    }[];
}

@Injectable({
    providedIn: 'root',
})
export class BarcodeListService {

    public static detectedBarcodes: BarcodesDetectionViewModel[] = [];

    public static items: Array<{ key: BarcodeFormat, value: boolean }> = [
        { key: "AZTEC", value: true },
        { key: "CODABAR", value: true },
        { key: "CODE_25", value: true },
        { key: "CODE_39", value: true },
        { key: "CODE_93", value: true },
        { key: "CODE_128", value: true },
        { key: "DATA_MATRIX", value: true },
        { key: "EAN_8", value: true },
        { key: "EAN_13", value: true },
        { key: "ITF", value: true },
        { key: "PDF_417", value: true },
        { key: "QR_CODE", value: true },
        { key: "RSS_14", value: true },
        { key: "RSS_EXPANDED", value: true },
        { key: "UPC_A", value: true },
        { key: "UPC_E", value: true },
        { key: "MSI_PLESSEY", value: true },
        { key: "IATA_2_OF_5", value: true },
        { key: "INDUSTRIAL_2_OF_5", value: true },
        { key: "MICRO_QR_CODE", value: true },
        { key: "USPS_INTELLIGENT_MAIL", value: true },
        { key: "ROYAL_MAIL", value: true },
        { key: "ROYAL_TNT_POST", value: true },
        { key: "JAPAN_POST", value: true },
        { key: "AUSTRALIA_POST", value: true },
        { key: "DATABAR_LIMITED", value: true },
        { key: "GS1_COMPOSITE", value: true },
    ];

    public static update(format: BarcodeFormat, isChecked: boolean) {
        const index = BarcodeListService.items.findIndex(item => item.key === format)
        if (index) {
            BarcodeListService.items[index].value = isChecked
        }
    }

    public static getAcceptedTypes() {
        return BarcodeListService.items
            .filter(item => item.value)
            .map(item => item.key)
    }
}
