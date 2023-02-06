import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { VotingService } from '../../../services/voting/voting.service';
import { ActivatedRoute } from '@angular/router';
import { TokenDecoderService } from '../../../services/token-decoder/token-decoder.service';
import { UserService } from '../../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Answer,
  VotingAdd,
  VotingInfo,
  VotingToSend,
} from '../voting.types';

@Component({
  selector: 'app-voting-form',
  templateUrl: './voting-form.component.html',
  styleUrls: ['./voting-form.component.css'],
})
export class VotingFormComponent implements OnInit {
  @ViewChild('picker') picker: unknown;

  @Output() votingToAdd = new EventEmitter<VotingAdd>();
  @Output() votingToEdit = new EventEmitter<VotingInfo>();
  @Input() votingData!: VotingInfo;
  userId!: number;
  tribe = 'add';

  votingForm = this.initForm();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private tokenDecode: TokenDecoderService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private votingService: VotingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (
      this.activatedRoute.snapshot.routeConfig?.path === 'edit-voting/:votingId'
    ) {
      this.tribe = 'edit';
      const votingId = this.activatedRoute.snapshot.paramMap.get('votingId');
      const votingIdNumber = votingId ? +votingId : NaN;
      this.votingService
        .getVotingWithAnswers(votingIdNumber)
        .subscribe({ next: (data) => this.setVotingData(data) });
    } else {
      this.addAnswer();
      this.tribe = 'add';
    }
    this.userService.getActiveUserId().subscribe((res) => {
      this.userId = res;
    });
    this.watchIsExplicitToSetRestriction();
  }

  getAnswers(): UntypedFormArray {
    return this.votingForm.get('answers') as UntypedFormArray;
  }

  newAnswer(): UntypedFormGroup {
    return this.formBuilder.group({
      answerId: null,
      answer: '',
    });
  }

  addAnswer() {
    this.getAnswers().push(this.newAnswer());
  }

  newAnswerWithData(answer: string): UntypedFormGroup {
    return this.formBuilder.group({
      answer: answer,
    });
  }

  removeAnswer(index: number) {
    this.getAnswers().removeAt(index);
  }

  onSubmit() {
    if (this.votingForm.valid) {
      const voting: VotingToSend = this.getDataFromForm();
      if (this.tribe === 'add') {
        this.addVoting(voting);
      } else if (this.tribe === 'edit') {
        this.editVoting(voting);
      }
    } else {
      this.errorSnackBarOpen('Dane są nie prawidłowe');
    }
  }

  private errorSnackBarOpen(message: string) {
    this.snackBar.open(message, 'Zamknij', {
      duration: 3 * 1000,
      horizontalPosition: 'right',
    });
  }

  private setVotingData(data: VotingInfo) {
    this.votingData = data;
    this.votingForm.controls['votingName'].setValue(data.votingName);
    this.votingForm.controls['restricted']?.setValue(data.restricted);
    const date = new Date(data.endDate);
    this.votingForm.controls['endDate']?.setValue(date);
    this.votingForm.controls['limitedInTime'].setValue(true);
    this.votingForm.controls['votingName'].setValue(data.votingName);
    this.votingForm.controls['explicit'].setValue(data.explicit);
    this.votingForm.controls['question'].setValue(data.question);
    data.answers.forEach((answer) => {
      this.getAnswers().push(this.newAnswerWithData(answer.answer));
    });
  }

  private getDataFromForm(): VotingToSend {
    return {
      votingName: this.votingForm.controls['votingName'].value,
      restricted: this.votingForm.controls['restricted'].value,
      explicit: this.votingForm.controls['explicit'].value,
      endDate: this.votingForm.get('endTime')?.value?.toDate(),
      question: this.votingForm.controls['question'].value,
    };
  }

  private addVoting(voting: VotingToSend) {
    const answers: string[] = this.votingForm.controls['answers'].value;
    const votingToSend: VotingAdd = {
      ...voting,
      userId: this.userId,
      answers: answers,
    };
    this.votingToAdd.emit(votingToSend);
  }

  private editVoting(voting: VotingToSend) {
    const answers: Answer[] = this.votingForm.controls['answers'].value;
    const votingToSend: VotingInfo = {
      ...voting,
      votingId: this.votingData.votingId,
      answers: answers,
      active: true,
    };
    this.votingToEdit.emit(votingToSend);
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      votingName: [null, Validators.required],
      question: [null, Validators.required],
      limitedInTime: false,
      restricted: false,
      explicit: false,
      endTime: new UntypedFormControl(null),
      answers: this.formBuilder.array([]),
    });
  }

  private watchIsExplicitToSetRestriction() {
    this.votingForm.controls['explicit'].valueChanges.subscribe((value) => {
      if (value) {
        this.votingForm.controls['restricted'].setValue(true);
        this.votingForm.controls['restricted'].disable();
      } else {
        this.votingForm.controls['restricted'].enable();
      }
    });
  }
}
