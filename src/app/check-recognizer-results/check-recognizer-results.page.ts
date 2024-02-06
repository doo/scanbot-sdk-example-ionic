import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {CheckRecognizerResult} from 'cordova-plugin-scanbot-sdk';
import {GenericDocumentUtils} from 'src/utils/gdr-utils';
import {ScanResultSection, ScanResultSectionList} from '../section-list/section-list.component';
import {sanitizeFileUri} from '../../utils/sanitizeFileUri';
import {ScannerResultsService} from '../services/scanner-results.service';


@Component({
    selector: 'app-check-recognizer-results',
    templateUrl: './check-recognizer-results.page.html',
})
export class CheckRecognizerResultsPage {
    checkResult: CheckRecognizerResult;
    displayFields: ScanResultSectionList;

    constructor(public sanitizer: DomSanitizer,) {
        this.checkResult = ScannerResultsService.checkRecognizerResult;
        this.displayFields = this.setupProperties();
    }

    private setupProperties(): ScanResultSectionList {

        const commonSection: ScanResultSection = {
            title: 'Check Result',
            data: [
                {
                    key: 'Check Image',
                    image: sanitizeFileUri(this.checkResult.imageFileUri, this.sanitizer),
                },
                {
                    key: 'Recognition Status',
                    value: this.checkResult.checkStatus,
                },
                {
                    key: 'Check Type',
                    value: this.checkResult.checkType,
                },
                {
                    key: 'Recognition confidence',
                    value: this.checkResult.check.confidence.toString(),
                },
            ]
        };

        const checkFieldsSection: ScanResultSection = {
            title: this.checkResult.check.type.name,
            data: GenericDocumentUtils.gdrFields(this.checkResult.check)
        };

        return [
            commonSection,
            checkFieldsSection
        ];
    }
}
