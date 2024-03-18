import {Component, OnInit} from '@angular/core';
import {CheckRecognizerResult} from 'cordova-plugin-scanbot-sdk';
import {ScanResultSection, ScanResultSectionList} from '../section-list/section-list.component';
import {ScannerResultsService} from '../services/scanner-results.service';
import {GenericDocumentUtils} from '../../utils/gdr-utils';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
    selector: 'app-check-recognizer-results',
    templateUrl: './check-recognizer-results.page.html',
})
export class CheckRecognizerResultsPage implements OnInit {
    checkResult: CheckRecognizerResult;
    displayFields: ScanResultSectionList;

    constructor(
        private sanitizer: DomSanitizer,
    ) {
    }

    async ngOnInit() {
        this.checkResult = ScannerResultsService.checkRecognizerResult;
        this.displayFields = await this.setupProperties();
    }

    private async setupProperties(): Promise<ScanResultSectionList> {

        const commonSection: ScanResultSection = {
            title: 'Check Result',
            data: [
                {
                    key: 'Check Image',
                    image:  this.sanitizeFileUri(this.checkResult.imageFileUri),
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

    private sanitizeFileUri(fileUri: string): string {
        // see https://ionicframework.com/docs/building/webview/#file-protocol
        const convertedUri = (window as any).Ionic.WebView.convertFileSrc(fileUri);
        // see https://angular.io/guide/security#bypass-security-apis
        return this.sanitizer.bypassSecurityTrustUrl(convertedUri) as string;
    }
}
