import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { ImageFilter, Page } from 'cordova-plugin-scanbot-sdk';

import { DialogsService } from '../services/dialogs.service';
import { ScanbotSdkDemoService } from '../services/scanbot-sdk-demo.service';
import { ImageResultsRepository, SanitizedPage } from '../services/image-results.repository';

@Component({
    selector: 'app-image-view',
    templateUrl: 'image-view.page.html',
})
export class ImageViewPage implements OnInit {

    public page: SanitizedPage;

    private imageFilterList: ImageFilter[] = [
        'NONE',
        'COLOR_ENHANCED',
        'GRAYSCALE',
        'BINARIZED',
        'COLOR_DOCUMENT',
        'PURE_BINARIZED',
        'BACKGROUND_CLEAN',
        'BLACK_AND_WHITE'
    ];

    constructor(private scanbotService: ScanbotSdkDemoService,
                private imageResultsRepository: ImageResultsRepository,
                private dialogsService: DialogsService,
                private router: Router,
                private route: ActivatedRoute,
                private actionSheetController: ActionSheetController) { }

    ngOnInit() {
        const pageId = this.route.params['value'].pageId;
        this.page = this.imageResultsRepository.getPageById(pageId);
    }

    async startCroppingScreen() {
        if (!(await this.scanbotService.checkLicense())) { return; }

        const result = await this.scanbotService.SDK.UI.startCroppingScreen({
            page: this.page as Page,
            uiConfigs: {
                // Customize colors, text resources, behavior, etc..
                doneButtonTitle: 'Save',
                orientationLockMode: 'PORTRAIT'
                // ...
            }
        });

        if (result.status === 'CANCELED') { return; }

        this.updatePage(result.page);
    }

    async deletePage() {
        await this.scanbotService.SDK.removePage({page: this.page as Page});
        this.imageResultsRepository.removePage(this.page);
        await this.router.navigate(['/image-results']);
    }

    private updatePage(page: Page) {
        this.page = this.imageResultsRepository.updatePage(page);
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
            buttons: buttons
        });
        await actionSheet.present();
    }

    private async applyImageFilter(filter: ImageFilter) {
        if (!(await this.scanbotService.checkLicense())) { return; }

        const loading = await this.dialogsService.createLoading('Applying image filter ...');
        try {
            loading.present();

            const result = await this.scanbotService.SDK.applyImageFilterOnPage({page: this.page as Page, imageFilter: filter});
            this.updatePage(result.page);
        }
        finally {
            await loading.dismiss();
        }
    }
}
