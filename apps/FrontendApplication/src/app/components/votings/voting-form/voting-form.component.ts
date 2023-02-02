import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  Answer,
  VotingAdd,
  VotingInfo,
  VotingService,
} from '../../../services/voting/voting.service';
import { ActivatedRoute } from '@angular/router';
import { TokenDecoderService } from '../../../services/token-decoder/token-decoder.service';
import { UserService } from '../../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-voting-form',
  templateUrl: './voting-form.component.html',
  styleUrls: ['./voting-form.component.css'],
})
export class VotingFormComponent implements OnInit {
  @ViewChild('picker') picker: any;

  @Output() votingToAdd = new EventEmitter<VotingAdd>();
  @Output() votingToEdit = new EventEmitter<VotingInfo>();
  @Input() votingData!: VotingInfo;
  userId!: number;
  tribe = 'add';

  votingForm = this.formBuilder.group({
    votingName: [null, Validators.required],
    question: [null, Validators.required],
    limitedInTime: false,
    restricted: false,
    explicit: false,
    endTime: new UntypedFormControl(null),
    answers: this.formBuilder.array([]),
  });

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
      this.votingService.getVotingWithAnswers(votingId).subscribe((data) => {
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
          this.answers().push(this.newAnswerWithData(answer.answer));
        });
      });
    } else {
      this.addAnswer();
      this.tribe = 'add';
    }
    this.userService.getActiveUserId().subscribe((res) => {
      this.userId = res;
    });
  }

  answers(): UntypedFormArray {
    return this.votingForm.get('answers') as UntypedFormArray;
  }

  newAnswer(): UntypedFormGroup {
    return this.formBuilder.group({
      answerId: null,
      answer: '',
    });
  }

  addAnswer() {
    this.answers().push(this.newAnswer());
  }

  newAnswerWithData(answer: string): UntypedFormGroup {
    return this.formBuilder.group({
      answer: answer,
    });
  }

  removeAnswer(index: number) {
    this.answers().removeAt(index);
  }

  onSubmit() {
    if (this.votingForm.valid) {
      if (this.tribe === 'add') {
        const answers: string[] = this.votingForm.controls['answers'].value;
        const votingToSave: VotingAdd = {
          userId: this.userId,
          votingName: this.votingForm.controls['votingName'].value,
          restricted: this.votingForm.controls['restricted'].value,
          explicit: this.votingForm.controls['explicit'].value,
          endDate: this.votingForm.get('endTime')?.value?.toDate(),
          question: this.votingForm.controls['question'].value,
          answers: answers,
        };
        this.votingToAdd.emit(votingToSave);
      } else if (this.tribe === 'edit') {
        const answers: Answer[] = this.votingForm.controls['answers'].value;
        const votingToEdit: VotingInfo = {
          votingId: this.votingData.votingId,
          votingName: this.votingForm.controls['votingName'].value,
          restricted: this.votingForm.controls['restricted'].value,
          explicit: this.votingForm.controls['explicit'].value,
          endDate: this.votingForm.get('endTime')?.value?.toDate(),
          active: true,
          question: this.votingForm.controls['question'].value,
          answers: answers,
        };
        this.votingToEdit.emit(votingToEdit);
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

  votingExplicitChange() {
    if (this.votingForm.controls['explicit'].value === true) {
      this.votingForm.controls['restricted'].setValue(true);
      return true;
    }
    return false;
  }
}
