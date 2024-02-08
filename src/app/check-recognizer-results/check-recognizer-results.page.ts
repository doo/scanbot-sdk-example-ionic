import {Component, OnInit} from '@angular/core';
import {CheckRecognizerResult} from 'cordova-plugin-scanbot-sdk';
import {ScanResultSection, ScanResultSectionList} from '../section-list/section-list.component';
import {ScannerResultsService} from '../services/scanner-results.service';
import {ScanbotSdkDemoService} from '../services/scanbot-sdk-demo.service';
import {ImageResultsRepository} from '../services/image-results.repository';
import {GenericDocumentUtils} from '../../utils/gdr-utils';


@Component({
    selector: 'app-check-recognizer-results',
    templateUrl: './check-recognizer-results.page.html',
})
export class CheckRecognizerResultsPage implements OnInit {
    checkResult: CheckRecognizerResult;
    displayFields: ScanResultSectionList;

    constructor(
        private scanbotService: ScanbotSdkDemoService,
        private imageResultsRepository: ImageResultsRepository,
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
                    image: await this.sanitizeImage(this.checkResult.imageFileUri),
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

    private async sanitizeImage(imageUri: string) {
        const data = await this.scanbotService.fetchDataFromUri(imageUri);
        return this.imageResultsRepository.sanitizeBase64(data);
    }
}
