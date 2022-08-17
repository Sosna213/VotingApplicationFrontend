import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVotingModalComponent } from './delete-voting-modal.component';

describe('DeleteVotingModalComponent', () => {
  let component: DeleteVotingModalComponent;
  let fixture: ComponentFixture<DeleteVotingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteVotingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteVotingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
