import { Injectable } from '@angular/core';
import { BarcodeDocumentFormat } from 'cordova-plugin-scanbot-sdk';

@Injectable({
  providedIn: 'root',
})
export class BarcodeDocumentListService {

  public static isFilteringEnabled = false;

  public static list: Array<{ key: BarcodeDocumentFormat, value: boolean }> = [
    { key: "AAMVA", value: true },
    { key: "BOARDING_PASS", value: true },
    { key: "DE_MEDICAL_PLAN", value: true },
    { key: "MEDICAL_CERTIFICATE", value: true },
    { key: "ID_CARD_PDF_417", value: true },
    { key: "SEPA", value: true },
    { key: "SWISS_QR", value: true },
    { key: "VCARD", value: true },
    { key: "GS1", value: true },
  ];

  public static getAcceptedFormats(): BarcodeDocumentFormat[] {
    if (!BarcodeDocumentListService.isFilteringEnabled) {
      return [];
    }

    return BarcodeDocumentListService.list
      .filter(item => item.value)
      .map(item => item.key)
  }

  public static update(format: BarcodeDocumentFormat, isChecked: boolean) {
    const index = BarcodeDocumentListService.list.findIndex(item => item.key === format)
    if (index) {
      BarcodeDocumentListService.list[index].value = isChecked
    }
  }
}
