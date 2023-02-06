export type UserGroupAdd = {
  ownerUsername: string;
  userGroupName: string;
  usernames: string[];
}
export type UserGroupEdit = {
  userGroupAddDTO: UserGroupAdd,
  userGroupId: number;
}

export type UserGroupInfo = {
  userGroupId: number;
  userGroupName: string;
  usernames: string[];
}
