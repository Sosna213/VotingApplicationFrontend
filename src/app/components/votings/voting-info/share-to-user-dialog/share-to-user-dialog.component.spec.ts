import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareToUserDialogComponent } from './share-to-user-dialog.component';

describe('ShareToUserDialogComponent', () => {
  let component: ShareToUserDialogComponent;
  let fixture: ComponentFixture<ShareToUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareToUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareToUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
