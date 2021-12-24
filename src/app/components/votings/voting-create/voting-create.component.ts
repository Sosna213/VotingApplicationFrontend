import {Component, OnInit} from '@angular/core';
import {VotingAdd, VotingInfo, VotingService} from "../../../services/voting/voting.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TokenDecoderService} from "../../../services/token-decoder/token-decoder.service";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-voting-create',
  templateUrl: './voting-create.component.html',
  styleUrls: ['./voting-create.component.css']
})
export class VotingCreateComponent implements OnInit {

  constructor(private votingService: VotingService, private router: Router) {
  }

  ngOnInit(): void { }

  submitHandler(votingToAdd: VotingAdd){
    this.votingService.saveVoting(votingToAdd).subscribe(data => {

      this.router.navigate(['/voting-search']);
    }, error => {
      console.log(error);
    });

  }
}
