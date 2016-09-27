import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { CKEditorModule } from 'ng2-ckeditor';

import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdButtonModule } from '@angular2-material/button';
import { MdInputModule } from '@angular2-material/input';
import { MdListModule } from '@angular2-material/list';
import { MdCardModule } from '@angular2-material/card';

import { routing,
         appRoutingProviders }  from './app.routing';

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
import { InputIconComponent } from './patient-details-edit/input-icon/input-icon.component';

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
    ListViewComponent, InputIconComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    CKEditorModule,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdInputModule,
    MdListModule,
    MdCardModule,
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
