import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {UserService} from "../../../../services/user/user.service";


@Component({
  selector: 'app-share-to-user-dialog',
  templateUrl: './share-to-user-dialog.component.html',
  styleUrls: ['./share-to-user-dialog.component.css']
})
export class ShareToUserDialogComponent {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers!: Observable<string[]>;
  users: string[] = [];
  allUsers: string[] = [];

  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<ShareToUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public usernames: string[],
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

  remove(fruit: string): void {
    const index = this.users.indexOf(fruit);

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

    return this.allUsers.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  onSubmit(){
    this.usernames = this.users;
    this.dialogRef.close(this.usernames);
  }
}
