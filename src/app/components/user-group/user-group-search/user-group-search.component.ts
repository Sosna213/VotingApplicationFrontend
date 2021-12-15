import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UserGroupAddDialogComponent} from "./user-group-add-dialog/user-group-add-dialog.component";
import {UserGroupAdd, UserGroupInfo, UserGroupService} from "../../../services/user-group/user-group.service";


@Component({
  selector: 'app-user-group-search',
  templateUrl: './user-group-search.component.html',
  styleUrls: ['./user-group-search.component.css']
})
export class UserGroupSearchComponent implements OnInit {

  displayedColumns: string[] = ['id', 'userGroupName', 'operations'];
  public userGroupInfos!: UserGroupInfo[];
  userGroupToAdd!: UserGroupAdd;
  // result

  constructor(private userGroupService: UserGroupService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userGroupService.getUserGroupsForUser().subscribe(data => {
      this.userGroupInfos = data;
      console.log(this.userGroupInfos);
    });
  }

  openShareVotingDialog(): void {
    const dialogRef = this.dialog.open(UserGroupAddDialogComponent, {
      width: '700px',
      data: {usernames: this.userGroupToAdd}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userGroupToAdd = result;
      console.log(this.userGroupToAdd);
      this.userGroupService.addUserGroup(this.userGroupToAdd).subscribe(result=>{
        console.log(result);
      }, error => {
        console.log(error);
      })
    });
  }
}
