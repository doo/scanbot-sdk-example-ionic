import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable()
export class DialogsService {

    constructor(private alertController: AlertController,
                private loadingController: LoadingController) { }

    public async showAlert(message: string, header: string = 'Info', subHeader: string = '') {
        const alert = await this.alertController.create({
            header: header,
            subHeader: subHeader,
            message: message,
            buttons: ['OK']
        });

        await alert.present();
    }

    public async createLoading(message: string) {
        return await this.loadingController.create({
            message: message,
        });
    }
}
