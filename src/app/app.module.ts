import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AlertModule } from 'ng2-bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthenticationService } from './shared/authentication.service';
import { UUIDService } from './shared/uuid.service'
import { DatabaseService } from './shared/database.service';
import { SelectedPatientService } from './shared/selected-patient.service';
import { PatientsListService } from './shared/patients-list.service'

import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { FilterPatientListComponent } from './filter-patient-list/filter-patient-list.component';

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyDeOFifu78JOA1wmXxNIWT5BCKMIR6jBC4",
    authDomain: "medpatients-ecc63.firebaseapp.com",
    databaseURL: "https://medpatients-ecc63.firebaseio.com",
    storageBucket: "medpatients-ecc63.appspot.com",
    messagingSenderId: "302656355110"
};


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PatientListComponent,
    PatientDetailsComponent,
    FilterPatientListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AlertModule,
    CKEditorModule
  ],
  providers: [
    AuthenticationService,
    DatabaseService,
    SelectedPatientService,
    PatientsListService,
    UUIDService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
