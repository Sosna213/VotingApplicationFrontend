import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareToUserGroupComponent } from './share-to-user-group.component';

describe('ShareToUserGroupComponent', () => {
  let component: ShareToUserGroupComponent;
  let fixture: ComponentFixture<ShareToUserGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareToUserGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareToUserGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
