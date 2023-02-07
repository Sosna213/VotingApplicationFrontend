import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserGroupAddDialogComponent } from './user-group-add-dialog/user-group-add-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  UserGroupAdd,
  UserGroupEdit,
  UserGroupInfo,
} from '../user-group.types';
import {Observable} from "rxjs";
import {UserGroupService} from "../user-group.service";

@Component({
  selector: 'app-user-group-search',
  templateUrl: './user-group-search.component.html',
  styleUrls: ['./user-group-search.component.css'],
})
export class UserGroupSearchComponent implements OnInit {
  displayedColumns: string[] = ['id', 'userGroupName', 'operations'];
  userGroupInfos$!: Observable<UserGroupInfo[]>;
  userGroupToAdd!: UserGroupAdd;

  constructor(
    private userGroupService: UserGroupService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  deleteUserGroup(userGroupId: number) {
    this.userGroupService.deleteUserGroupById(userGroupId).subscribe({
      next: () => {
        location.reload();
      },
      error: (error) => {
        this.errorSnackBarOpen(error.error.error);
      },
    });
  }

  ngOnInit(): void {
    this.userGroupInfos$ = this.userGroupService.getUserGroupsForUser();
  }

  openCreateUserGroupDialog(): void {
    const dialogRef = this.dialog.open(UserGroupAddDialogComponent, {
      width: '700px',
      data: {
        usernames: this.userGroupToAdd,
        mode: 'create',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.userGroupToAdd = result;
      this.userGroupService.addUserGroup(this.userGroupToAdd).subscribe({
        next: () => {
          location.reload();
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  }

  openEditUserGroupDialog(userGroup: UserGroupInfo): void {
    const dialogRef = this.dialog.open(UserGroupAddDialogComponent, {
      width: '700px',
      data: {
        userGroupName: userGroup.userGroupName,
        usernames: userGroup.usernames,
        mode: 'edit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const userGroupEdit: UserGroupEdit = <UserGroupEdit>{};
      userGroupEdit.userGroupAddDTO = result;
      userGroupEdit.userGroupId = userGroup.userGroupId;
      this.userGroupService.editUserGroup(userGroupEdit).subscribe({
        next: () => {
          location.reload();
        },
        error: (error) => {
          this.errorSnackBarOpen(error.error.error);
        },
      });
    });
  }

  private errorSnackBarOpen(message: string) {
    this.snackBar.open(message, 'Zamknij', {
      duration: 3 * 1000,
      horizontalPosition: 'right',
    });
  }
}
