import {Component, OnInit} from '@angular/core';
import {CheckRecognizerResult} from 'cordova-plugin-scanbot-sdk';
import {ScanResultSection, ScanResultSectionList} from '../section-list/section-list.component';
import {ScannerResultsService} from '../services/scanner-results.service';
import {GenericDocumentUtils} from '../../utils/gdr-utils';
import {ImageResultsRepository} from '../services/image-results.repository';


@Component({
    selector: 'app-check-recognizer-results',
    templateUrl: './check-recognizer-results.page.html',
})
export class CheckRecognizerResultsPage implements OnInit {
    checkResult: CheckRecognizerResult;
    displayFields: ScanResultSectionList;

    constructor(
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

        if (this.checkResult.imageFileUri) {
            commonSection.data.unshift({
                key: 'Check Image',
                image: this.imageResultsRepository.sanitizeFileUri(this.checkResult.imageFileUri),
            });
        }

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
