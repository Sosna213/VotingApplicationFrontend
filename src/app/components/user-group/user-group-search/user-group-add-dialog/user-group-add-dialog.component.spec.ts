import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupAddDialogComponent } from './user-group-add-dialog.component';

describe('UserGroupAddDialogComponent', () => {
  let component: UserGroupAddDialogComponent;
  let fixture: ComponentFixture<UserGroupAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGroupAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
