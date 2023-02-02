import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingEditComponent } from './voting-edit.component';

describe('VotingEditComponent', () => {
  let component: VotingEditComponent;
  let fixture: ComponentFixture<VotingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VotingEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
