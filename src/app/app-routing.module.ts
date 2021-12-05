import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {VotingsSearchPanelComponent} from "./components/votings/votings-search-panel/votings-search-panel.component";
import {VotingInfoComponent} from "./components/votings/voting-info/voting-info.component";
import {VotingCreateComponent} from "./components/votings/voting-create/voting-create.component";
import {VotingEditComponent} from "./components/votings/voting-edit/voting-edit.component";
import {SharedToMeVotingSearchComponent} from "./components/votings/shared-to-me-voting-search/shared-to-me-voting-search.component";
import {VoteComponent} from "./components/votings/vote/vote.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'voting-search',
    component: VotingsSearchPanelComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
