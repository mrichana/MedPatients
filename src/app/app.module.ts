import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { routing,
         appRoutingProviders }  from './app.routing';


import { AlertModule } from 'ng2-bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthenticationService } from './shared/services/authentication.service';
import { UUIDService } from './shared/services/uuid.service'
import { DatabaseService } from './shared/services/database.service';
import { SelectedPatientService } from './shared/services/selected-patient.service';
import { PatientsListService } from './shared/services/patients-list.service';
import { CreatePatientService} from './shared/services/create-patient.service';

import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsEditComponent } from './patient-details-edit/patient-details-edit.component';
import { FilterPatientListComponent } from './filter-patient-list/filter-patient-list.component';
import { PatientDetailsViewComponent } from './patient-details-view/patient-details-view.component';
import { ListViewComponent } from './list-view/list-view.component';

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
    PatientDetailsEditComponent,
    FilterPatientListComponent,
    PatientDetailsViewComponent,
    ListViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AlertModule,
    CKEditorModule,
    routing
  ],
  providers: [
    AuthenticationService,
    DatabaseService,
    SelectedPatientService,
    PatientsListService,
    CreatePatientService,
    UUIDService,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
