import {Injectable} from '@angular/core';
import {
    CheckRecognizerResult,
    GenericDocumentRecognizerResult,
    MedicalCertificateScannerResult,
    MrzScannerResult
} from 'cordova-plugin-scanbot-sdk';

@Injectable({
    providedIn: 'root',
})
export class ScannerResultsService {
    public static genericDocumentRecognizerResult: GenericDocumentRecognizerResult | undefined;
    public static checkRecognizerResult: CheckRecognizerResult | undefined = undefined;
    public static mrzScannerResult: MrzScannerResult | undefined = undefined;
    public static medicalCertificateScannerResult: MedicalCertificateScannerResult | undefined = undefined;
}
