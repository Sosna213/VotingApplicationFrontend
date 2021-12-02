import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VotingAdd, VotingInfo, VotingService} from "../../../services/voting/voting.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenDecoderService} from "../../../services/token-decoder/token-decoder.service";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-voting-form',
  templateUrl: './voting-form.component.html',
  styleUrls: ['./voting-form.component.css']
})
export class VotingFormComponent implements OnInit {

  @Output() votingToAdd = new EventEmitter<VotingAdd>();
  @Output() votingToEdit = new EventEmitter<VotingInfo>();
  @Input() votingData!: VotingInfo;
  userId!: number;
  trybe: string = 'add';

  votingForm = this.formBuilder.group({
    votingName: [null, Validators.required],
    question: [null, Validators.required],
    limitedInTime: false,
    restricted: false,
    endTime: null,
    answers: this.formBuilder.array([])
  });

  constructor(private formBuilder: FormBuilder,
              private tokenDecode: TokenDecoderService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private votingService: VotingService) {
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.routeConfig?.path === 'edit-voting/:votingId') {
      let votingId: any;
      this.trybe = 'edit';
      votingId = this.activatedRoute.snapshot.paramMap.get('votingId');
      this.votingService.getVotingWithAnswers(votingId).subscribe(data => {
        this.votingData = data;
        this.votingForm.controls['votingName'].setValue(data.votingName);
        this.votingForm.controls['question'].setValue(data.question);
        data.answers.forEach(answer => {
          this.answers().push(this.newAnswerWithData(answer));
        })
      });
    } else {
      this.addAnswer();
      this.trybe = 'add'
    }
    this.userService.getActiveUserId().subscribe(res => {
      this.userId = res;
    });
  }

  answers(): FormArray {
    return this.votingForm.get("answers") as FormArray
  }

  newAnswer(): FormGroup {
    return this.formBuilder.group({
        answer: ''
      }
    )
  }

  addAnswer() {
    this.answers().push(this.newAnswer());
  }

  newAnswerWithData(answer: String): FormGroup {
    return this.formBuilder.group({
        answer: answer
      }
    )
  }

  removeAnswer(index: number) {
    this.answers().removeAt(index);
  }

  onSubmit() {
    if (this.votingForm.valid) {
      if (this.trybe === 'add') {
        let answers: string[] = this.votingForm.controls['answers'].value;
        const votingToSave: VotingAdd = {
          userId: this.userId,
          votingName: this.votingForm.controls['votingName'].value,
          question: this.votingForm.controls['question'].value,
          answers: answers,
        }
        this.votingToAdd.emit(votingToSave);
      } else if(this.trybe === 'edit'){
        let answers: string[] = this.votingForm.controls['answers'].value;
        const votingToEdit: VotingInfo = {
          votingId: this.votingData.votingId,
          votingName: this.votingForm.controls['votingName'].value,
          question: this.votingForm.controls['question'].value,
          answers: answers,
        }
        this.votingToEdit.emit(votingToEdit);
      }
    } else {
      alert("Dane są nie prawidłowe");
    }
  }
}
