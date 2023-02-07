import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareByLinkDialogComponent } from './share-by-link-dialog.component';

describe('ShareByLinkDialogComponent', () => {
  let component: ShareByLinkDialogComponent;
  let fixture: ComponentFixture<ShareByLinkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareByLinkDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareByLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
