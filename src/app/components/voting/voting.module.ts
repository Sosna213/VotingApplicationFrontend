import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotingSearchPanelComponent } from './voting-search-panel/votings-search-panel.component';
import { SharedToMeVotingSearchComponent } from './shared-to-me-voting-search/shared-to-me-voting-search.component';
import { VotingCreateComponent } from './voting-create/voting-create.component';
import { VotingInfoComponent } from './voting-info/voting-info.component';
import { VotingFormComponent } from './voting-form/voting-form.component';
import { ShareToUserDialogComponent } from './voting-info/share-to-user-dialog/share-to-user-dialog.component';
import { VotingEditComponent } from './voting-edit/voting-edit.component';
import { DeleteVotingModalComponent } from './voting-info/delete-voting-modal/delete-voting-modal.component';
import { ShareToUserGroupComponent } from './voting-info/share-to-user-dialog/share-to-user-group/share-to-user-group.component';
import { ShareByLinkDialogComponent } from './voting-info/share-by-link-dialog/share-by-link-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { PieChartModule } from '@swimlane/ngx-charts';
import { RouterModule } from '@angular/router';
import { VoteComponent } from './vote/vote.component';

const votingRouting = [
  {
    path: 'voting-search',
    component: VotingSearchPanelComponent,
  },
  {
    path: 'voting/:votingId',
    component: VotingInfoComponent,
  },
  {
    path: 'create-voting',
    component: VotingCreateComponent,
  },
  {
    path: 'edit-voting/:votingId',
    component: VotingEditComponent,
  },
  {
    path: 'voting-shared-to-me',
    component: SharedToMeVotingSearchComponent,
  },
  {
    path: 'vote/:votingId',
    component: VoteComponent,
  },
  {
    path: 'vote/token/:token',
    component: VoteComponent,
  },
];

@NgModule({
  declarations: [
    VotingSearchPanelComponent,
    SharedToMeVotingSearchComponent,
    VotingCreateComponent,
    VotingSearchPanelComponent,
    VotingInfoComponent,
    VotingEditComponent,
    VotingFormComponent,
    ShareToUserDialogComponent,
    SharedToMeVotingSearchComponent,
    VoteComponent,
    DeleteVotingModalComponent,
    ShareToUserGroupComponent,
    ShareByLinkDialogComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDialogModule,
    PieChartModule,
    RouterModule.forChild(votingRouting),
  ],
})
export class VotingModule {}
