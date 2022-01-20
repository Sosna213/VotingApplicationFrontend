import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RouterModule } from '@angular/router';

import { GaugeModule } from 'angular-gauge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from "@angular/material/button";
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import {MatSliderModule} from "@angular/material/slider";
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {TokenInterceptorService} from "./services/token-interceptor/token-interceptor.service";
import {VotingCreateComponent} from "./components/votings/voting-create/voting-create.component";
import { VotingsSearchPanelComponent } from './components/votings/votings-search-panel/votings-search-panel.component';
import {MatTableModule} from "@angular/material/table";
import { VotingInfoComponent } from './components/votings/voting-info/voting-info.component';
import { VotingEditComponent } from './components/votings/voting-edit/voting-edit.component';
import { VotingFormComponent } from './components/votings/voting-form/voting-form.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";
import {NgxMatDatetimePickerModule, NgxMatTimepickerModule} from "@angular-material-components/datetime-picker";
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { ShareToUserDialogComponent } from './components/votings/voting-info/share-to-user-dialog/share-to-user-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { SharedToMeVotingSearchComponent } from './components/votings/shared-to-me-voting-search/shared-to-me-voting-search.component';
import { VoteComponent } from './components/votings/vote/vote.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {UserGroupSearchComponent} from "./components/user-group/user-group-search/user-group-search.component";
import { UserGroupAddDialogComponent } from './components/user-group/user-group-search/user-group-add-dialog/user-group-add-dialog.component';
import {NgxEchartsModule} from "ngx-echarts";
import {PieChartModule} from "@swimlane/ngx-charts";
import {MatExpansionModule} from "@angular/material/expansion";
import { DeleteVotingModalComponent } from './components/votings/voting-info/delete-voting-modal/delete-voting-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ShareToUserGroupComponent } from './components/votings/voting-info/share-to-user-dialog/share-to-user-group/share-to-user-group.component';
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    VotingCreateComponent,
    VotingsSearchPanelComponent,
    VotingInfoComponent,
    VotingEditComponent,
    VotingFormComponent,
    ShareToUserDialogComponent,
    SharedToMeVotingSearchComponent,
    VoteComponent,
    UserGroupSearchComponent,
    UserGroupAddDialogComponent,
    DeleteVotingModalComponent,
    ShareToUserGroupComponent
  ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        GaugeModule.forRoot(),
        HttpClientModule,
        FormsModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatSliderModule,
        MatInputModule,
        MatRadioModule,
        MatTableModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatListModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatMomentModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatChipsModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        PieChartModule,
        MatExpansionModule,
        MatGridListModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
