import { PatientBase } from './patient-base';

export class Patient extends PatientBase {
    constructor(public amka: string, public firstName: string, public lastName: string, public dob: Date) {
        super(amka);
    }
}
