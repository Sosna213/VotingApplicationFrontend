import { Component, OnInit } from '@angular/core';
import {VotingInfo, VotingService} from "../../../services/voting/voting.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-voting-edit',
  templateUrl: './voting-edit.component.html',
  styleUrls: ['./voting-edit.component.css']
})
export class VotingEditComponent implements OnInit {

  votingInfo!: VotingInfo;

  constructor(private votingService: VotingService, private router: Router) { }

  ngOnInit(): void {
  }
  submitHandler(votingToEdit: VotingInfo){
    this.votingService.editVoting(votingToEdit).subscribe(data=>{
      console.log(data);
    });
    this.router.navigate(['/voting-search']);
  }


}
