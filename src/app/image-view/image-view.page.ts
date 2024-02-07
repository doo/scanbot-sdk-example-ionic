import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ImageFilterType, Page } from 'cordova-plugin-scanbot-sdk';

import { DialogsService } from '../services/dialogs.service';
import { ImageResultsRepository } from '../services/image-results.repository';
import { ScanbotSdkDemoService } from '../services/scanbot-sdk-demo.service';

@Component({
    selector: 'app-image-view',
    templateUrl: 'image-view.page.html',
})
export class ImageViewPage implements OnInit {

    public page: Page | undefined;
    public sanitizedPreviewImage: string | undefined;

    private imageFilterList: ImageFilterType[] = [
        'BACKGROUND_CLEAN',
        'BINARIZED',
        'BLACK_AND_WHITE',
        'COLOR',
        'COLOR_DOCUMENT',
        'DEEP_BINARIZATION',
        'EDGE_HIGHLIGHT',
        'GRAYSCALE',
        'LOW_LIGHT_BINARIZATION',
        'LOW_LIGHT_BINARIZATION_2',
        'NONE',
        'OTSU_BINARIZATION',
        'PURE_BINARIZED',
        'PURE_GRAY',
    ];

    constructor(private scanbotService: ScanbotSdkDemoService,
        private imageResultsRepository: ImageResultsRepository,
        private dialogsService: DialogsService,
        private router: Router,
        private route: ActivatedRoute,
        private actionSheetController: ActionSheetController) { }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => of(params.get('pageId')))
        ).subscribe(pageId => {
            if (pageId) {
                this.page = this.imageResultsRepository.getPageById(pageId);
            }
            this.sanitizePreviewImage();
        });
    }

    private async sanitizePreviewImage() {
        if (this.page && this.page.documentPreviewImageFileUri) {
            const data = await this.scanbotService.fetchDataFromUri(this.page.documentPreviewImageFileUri);
            this.sanitizedPreviewImage = this.imageResultsRepository.sanitizeBase64(data);
        }
    }

    async startCroppingScreen() {
        if (!(await this.scanbotService.checkLicense()) || this.page === undefined) { return; }

        const result = await this.scanbotService.SDK.UI.startCroppingScreen({
            page: this.page,
            uiConfigs: {
                // Customize colors, text resources, behavior, etc..
                doneButtonTitle: 'Save',
                orientationLockMode: 'PORTRAIT',
                topBarBackgroundColor: '#c8193c',
                bottomBarBackgroundColor: '#c8193c',
                hintTitle: 'Custom hint:\nDrag the dots to the document edges.',
                hintTitleColor: '#0000ff'
                // ...
            }
        });

        if (result.status === 'CANCELED' || result.page === undefined) { return; }

        await this.updatePage(result.page);
    }

    async deletePage() {
        if (this.page) {
            await this.scanbotService.SDK.removePage({ page: this.page });
            await this.imageResultsRepository.removePage(this.page);
            await this.router.navigate(['/image-results']);
        }
    }

    private async updatePage(page: Page) {
        await this.imageResultsRepository.updatePage(page);
        this.page = page;
        this.sanitizePreviewImage();
    }

    async showFilterSelection() {
        const buttons = [];
        this.imageFilterList.forEach(f => {
            buttons.push({
                text: f,
                handler: () => { this.applyImageFilter(f); }
            });
        });

        buttons.push({
            text: 'Cancel',
            role: 'cancel',
            handler: () => { }
        });

        const actionSheet = await this.actionSheetController.create({
            header: 'Select an Image Filter',
            buttons: buttons,
            cssClass: "image-filters-action-sheet"
        });
        await actionSheet.present();
    }

    private async applyImageFilter(filter: ImageFilterType) {
        if (!(await this.scanbotService.checkLicense()) || this.page === undefined) { return; }

        const loading = await this.dialogsService.createLoading('Applying image filter ...');
        try {
            await loading.present();
            const result = await this.scanbotService.SDK.applyImageFilterOnPage({ page: this.page, imageFilter: filter });
            await this.updatePage(result);
        }
        finally {
            await loading.dismiss();
        }
    }

    async documentQualityAnalyzer() {
        if (!(await this.scanbotService.checkLicense())) { return; }

        const loading = await this.dialogsService.createLoading('Analyzing document ...');
        try {
            await loading.present();

            const scanResult = await this.scanbotService.SDK.documentQualityAnalyzer({imageFileUri: this.page.documentImageFileUri});
            await this.dialogsService.showAlert('Document Quality Analyzer result ' + scanResult.result);
        }
        finally {
            await loading.dismiss();
        }
    }
}
