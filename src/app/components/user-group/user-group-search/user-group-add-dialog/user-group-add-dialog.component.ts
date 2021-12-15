import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {UserService} from "../../../../services/user/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {UserGroupAdd} from "../../../../services/user-group/user-group.service";

@Component({
  selector: 'app-user-group-add-dialog',
  templateUrl: './user-group-add-dialog.component.html',
  styleUrls: ['./user-group-add-dialog.component.css']
})
export class UserGroupAddDialogComponent {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers!: Observable<string[]>;
  users: string[] = [];
  allUsers: string[] = [];

  userGroupForm = this.formBuilder.group({
    userGroupName: [null, Validators.required]
  });

  constructor(
    public userService: UserService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserGroupAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userGroupAdd: UserGroupAdd,
  ) {
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => (user ? this._filter(user) : this.allUsers.slice())),
    );
    this.userService.getUsernames().subscribe(result => {
      this.allUsers = result
    })
  }

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (this.allUsers.includes(value)) {
      this.users.push(value);
    }

    event.chipInput!.clear();

    this.userCtrl.setValue(null);
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allUsers.filter(user => user.toLowerCase().includes(filterValue));
  }
  onSubmit(){
    this.userGroupAdd.usernames = this.users;
    this.userGroupAdd.userGroupName = this.userGroupForm.controls['userGroupName'].value;
    this.dialogRef.close(this.userGroupAdd);
  }
}
