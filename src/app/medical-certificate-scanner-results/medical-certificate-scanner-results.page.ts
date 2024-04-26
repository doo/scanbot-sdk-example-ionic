import {Component, OnInit} from '@angular/core';
import {ScanResultSection, ScanResultSectionList} from '../section-list/section-list.component';
import {MedicalCertificateScannerResult} from 'cordova-plugin-scanbot-sdk';
import {ScannerResultsService} from '../services/scanner-results.service';
import {ImageResultsRepository} from '../services/image-results.repository';

type PatientDataKeys = keyof MedicalCertificateScannerResult['patientData'];
type DatesKeys = keyof MedicalCertificateScannerResult['dates'];
type CheckBoxKeys = keyof MedicalCertificateScannerResult['checkboxes'];

@Component({
    selector: 'app-medical-certificate-scanner-results',
    templateUrl: './medical-certificate-scanner-results.page.html',
    styleUrls: ['./medical-certificate-scanner-results.page.scss'],
})
export class MedicalCertificateScannerResultsPage implements OnInit {

    displayFields: ScanResultSectionList;
    medicalCertificateScannerResult: MedicalCertificateScannerResult;

    constructor(
        private imageResultsRepository: ImageResultsRepository,
    ) {
    }

    async ngOnInit() {
        this.medicalCertificateScannerResult = ScannerResultsService.medicalCertificateScannerResult;
        this.displayFields = await this.setupProperties();
    }

    private async setupProperties(): Promise<ScanResultSectionList> {
        const commonData: ScanResultSection = {
            title: 'Medical Certificate Result',
            data: [
                {
                    key: 'Form Type',
                    value: this.medicalCertificateScannerResult.formType
                },
            ],
        };

        if (this.medicalCertificateScannerResult.imageFileUri) {
            commonData.data.unshift({
                key: 'Snapped Image',
                image: this.imageResultsRepository.sanitizeFileUri(this.medicalCertificateScannerResult.imageFileUri),
            });
        }

        return [
            commonData,
            {
                title: 'Patient Data',
                data: this.transformPatientData(),
            },
            {
                title: 'Dates',
                data: this.transformDatesData(),
            },
            {
                title: 'Checkboxes',
                data: this.transformCheckboxesData(),
            },
        ];
    }

    transformPatientData() {
        if (!this.medicalCertificateScannerResult.patientData) {
            return [];
        }

        const displayTitleMap: Record<PatientDataKeys, string> = {
            firstName: 'First Name',
            lastName: 'Last Name',
            insuranceProvider: 'Insurance Provider',
            address1: 'Address #1',
            address2: 'Address #2',
            diagnose: 'Diagnose',
            healthInsuranceNumber: 'Health Insurance Number',
            insuredPersonNumber: 'Insured Person Number',
            status: 'Status',
            placeOfOperationNumber: 'Place of Operation Number',
            doctorNumber: 'Doctor\'s number',
            unknown: 'Unknown',
        };

        return Object.keys(displayTitleMap)
            .filter(
                mapKey =>
                    mapKey in this.medicalCertificateScannerResult.patientData &&
                    this.medicalCertificateScannerResult.patientData[mapKey as PatientDataKeys] != null,
            )
            .map(mapKey => ({
                key: displayTitleMap[mapKey as PatientDataKeys],
                value: `${
                    this.medicalCertificateScannerResult.patientData[mapKey as PatientDataKeys]!.value
                } (confidence: ${Math.round(
                    this.medicalCertificateScannerResult.patientData[mapKey as PatientDataKeys]!
                        .recognitionConfidence * 100,
                )} %)`,
            }));
    }

    transformDatesData = () => {
        if (!this.medicalCertificateScannerResult.dates) {
            return [];
        }

        const dates = this.medicalCertificateScannerResult.dates;

        const displayMap = {
            incapableOfWorkSince: 'Incapable of work since',
            incapableOfWorkUntil: 'Incapable of work until',
            diagnosedOn: 'Diagnosed on',
            childNeedsCareFrom: 'Child needs care from',
            childNeedsCareUntil: 'Child needs care until',
            birthDate: 'Patient birth date',
            documentDate: 'Document date',
            unknown: 'Unknown',
        };

        return Object.keys(dates).map(key => {
            const returnKey = key in displayMap ? displayMap[key as DatesKeys] : key;
            let confidence = dates[key as DatesKeys]?.recognitionConfidence ?? 0;
            confidence = Math.round(confidence * 100);
            const returnValue = this.medicalCertificateScannerResult.dates[key as DatesKeys]?.dateString ?? '';

            return {
                key: returnKey,
                value: `${returnValue} (confidence: ${confidence} %)`,
            };
        });
    };

    transformCheckboxesData = () => {
        const checkboxes = this.medicalCertificateScannerResult.checkboxes;
        if (!checkboxes) {
            return [];
        }
        const displayNames: Record<CheckBoxKeys, string> = {
            initialCertificate: 'Initial Certificate',
            renewedCertificate: 'Renewed Certificate',
            workAccident: 'Work Accident',
            assignedToAccidentInsuranceDoctor: 'Assigned to Accident Insurance Doctor',
            accidentYes: 'Accident box checked Yes?',
            accidentNo: 'Accident box checked No?',
            requiresCareYes: 'Child requires care checked Yes?',
            requiresCareNo: 'Child requires care checked No?',
            insuredPayCase: 'Insurance company has to pay?',
            finalCertificate: 'The certificate is final?',
            otherAccident: 'Other Accident?',
            entitlementToContinuedPaymentNo: '',
            entitlementToContinuedPaymentYes: '',
            sickPayWasClaimedNo: 'Claimed sick pay No?',
            sickPayWasClaimedYes: 'Claimed sick play Yes?',
            singleParentNo: 'Single parent No?',
            singleParentYes: 'Single parent Yes?',
            unknown: 'Unknown',
        };

        return Object.keys(checkboxes).flatMap(key => {
            const value = checkboxes[key as CheckBoxKeys]?.isChecked;
            let confidence = checkboxes[key as CheckBoxKeys]?.confidence ?? 0;
            confidence = Math.round(confidence * 100);
            const displayName =
                key in displayNames ? displayNames[key as CheckBoxKeys] : key;
            return {
                key: displayName,
                value: `${value ? 'YES' : 'NO'} (confidence: ${confidence}%)`,
            };
        });
    };
}
