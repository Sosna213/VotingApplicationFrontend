import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, map, startWith} from "rxjs";
import {UserService} from "../../../../../services/user/user.service";
import {UserGroupInfo, UserGroupService} from "../../../../../services/user-group/user-group.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {UntypedFormControl} from "@angular/forms";

@Component({
  selector: 'app-share-to-user-group',
  templateUrl: './share-to-user-group.component.html',
  styleUrls: ['./share-to-user-group.component.css']
})
export class ShareToUserGroupComponent implements OnInit {

  @Output() usernamesFromGroup = new EventEmitter<string[]>();
  @Output() dialogClose = new EventEmitter();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new UntypedFormControl();
  filteredUserGroups!: Observable<string[]>;
  userGroups: string[] = [];
  allUserGroupsInfo: UserGroupInfo[] = [];
  allUserGroups: string[] = [];
  userGroupControl = new UntypedFormControl();

  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.userGroupControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  constructor(
    public userService: UserService,
    public userGroupService: UserGroupService
  ) {
    this.filteredUserGroups = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => (user ? this._filter(user) : this.userGroups.slice())),
    );
    this.userGroupService.getUserGroupsForUser().subscribe(result => {
      this.allUserGroupsInfo = result;
      result.forEach(userGroup=>{
        this.allUserGroups.push(userGroup.userGroupName);
      })
    })
  }

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (this.allUserGroups.includes(value)) {
      this.userGroups.push(value);
    }

    event.chipInput?.clear();

    this.userCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.userGroups.indexOf(fruit);

    if (index >= 0) {
      this.userGroups.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.userGroups.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allUserGroups.filter(userGroup => userGroup.toLowerCase().includes(filterValue));
  }
  onSubmit(){
    let usernames: string[] = [];
    this.allUserGroupsInfo.forEach(userGroup => {
      if(this.userGroups.includes(userGroup.userGroupName.trim())){
        usernames = usernames.concat(userGroup.usernames);
      }
    });

    this.usernamesFromGroup.emit(usernames);
  }
  onNoClick(){
    this.dialogClose.emit();
  }

}
