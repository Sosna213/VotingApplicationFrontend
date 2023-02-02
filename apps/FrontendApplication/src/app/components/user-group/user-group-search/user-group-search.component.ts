import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UserGroupAddDialogComponent} from "./user-group-add-dialog/user-group-add-dialog.component";
import {
  UserGroupAdd,
  UserGroupEdit,
  UserGroupInfo,
  UserGroupService
} from "../../../services/user-group/user-group.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-user-group-search',
  templateUrl: './user-group-search.component.html',
  styleUrls: ['./user-group-search.component.css']
})
export class UserGroupSearchComponent implements OnInit {

  displayedColumns: string[] = ['id', 'userGroupName', 'operations'];
  userGroupInfos!: UserGroupInfo[];
  userGroupToAdd!: UserGroupAdd;


  constructor(private userGroupService: UserGroupService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userGroupService.getUserGroupsForUser().subscribe(data => {
      this.userGroupInfos = data;
    }, error => {
      console.log(error);
    });
  }

  openCreateUserGroupDialog(): void {
    const dialogRef = this.dialog.open(UserGroupAddDialogComponent, {
      width: '700px',
      data: {
        usernames: this.userGroupToAdd,
        mode: "create"
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      this.userGroupToAdd = result;
      this.userGroupService.addUserGroup(this.userGroupToAdd).subscribe(result=>{
        location.reload();
      }, error => {
        console.log(error);
      })
    });
  }

  openEditUserGroupDialog(userGroupId: number): void {
    let usernames;
    let userGroupName;
    this.userGroupInfos.filter(userGroup => userGroup.userGroupId === userGroupId).forEach(userGroup => {
      usernames = userGroup.usernames;
      userGroupName = userGroup.userGroupName;
    })
    const dialogRef = this.dialog.open(UserGroupAddDialogComponent, {
      width: '700px',
      data: {
        userGroupName: userGroupName,
        usernames: usernames,
        mode: "edit"
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      const userGroupEdit: UserGroupEdit = <UserGroupEdit>{};
      userGroupEdit.userGroupAddDTO = result;
      userGroupEdit.userGroupId = userGroupId;
      this.userGroupService.editUserGroup(userGroupEdit).subscribe(result=>{
        location.reload();
      }, error => {
        this.errorSnackBarOpen(error.error.error)
      })
    });
  }
  deleteUserGroup(userGroupId: number) {
    this.userGroupService.deleteUserGroupById(userGroupId).subscribe(response => {
      location.reload();
    }, error => {
      this.errorSnackBarOpen(error.error.error)
    })
  }
  private errorSnackBarOpen(message: string) {
    this.snackBar.open(message, "Zamknij", {
      duration: 3 * 1000,
      horizontalPosition: "right"
    });
  }
}