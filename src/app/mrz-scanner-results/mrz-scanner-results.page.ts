import {Component} from '@angular/core';
import {ScanResultSection, ScanResultSectionList} from '../section-list/section-list.component';
import {DomSanitizer} from '@angular/platform-browser';
import {ScannerResultsService} from '../services/scanner-results.service';
import {GenericDocumentUtils} from '../../utils/gdr-utils';
import {MrzScannerResult} from 'cordova-plugin-scanbot-sdk';

@Component({
    selector: 'app-mrz-scanner-results',
    templateUrl: './mrz-scanner-results.page.html',
    styleUrls: ['./mrz-scanner-results.page.scss'],
})
export class MrzScannerResultsPage {

    mrzScannerResult: MrzScannerResult;
    displayFields: ScanResultSectionList;

    constructor(public sanitizer: DomSanitizer,) {
        this.mrzScannerResult = ScannerResultsService.mrzScannerResult;
        this.displayFields = this.setupProperties();
    }

    private setupProperties(): ScanResultSectionList {

        const commonSection: ScanResultSection = {
            title: 'MRZ Result',
            data: [
                GenericDocumentUtils.sectionValueItem('Document Type', this.mrzScannerResult.documentType),
                GenericDocumentUtils.sectionValueItem('Raw MRZ String', this.mrzScannerResult.rawString),
                GenericDocumentUtils.sectionValueItem(
                    'Recognition Successful',
                    this.mrzScannerResult.recognitionSuccessful ? 'YES' : 'NO',
                ),
                GenericDocumentUtils.sectionValueItem(
                    'Check digits count',
                    this.mrzScannerResult.checkDigitsCount.toString(),
                ),
                GenericDocumentUtils.sectionValueItem(
                    'Valid check digits count',
                    this.mrzScannerResult.validCheckDigitsCount.toString(),
                ),
                ...GenericDocumentUtils.gdrCommonFields(this.mrzScannerResult.mrz),
            ]
        };

        const checkFieldsSection: ScanResultSection = {
            title: 'MRZ Document',
            data: GenericDocumentUtils.gdrFields(this.mrzScannerResult.mrz),
        };

        return [
            commonSection,
            checkFieldsSection
        ];
    }
}
