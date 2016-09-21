import { PatientBase } from './patient-base';

export class PatientNotes extends PatientBase {
    constructor(public amka: string, public notes: string) {
        super( amka );
    }
}
