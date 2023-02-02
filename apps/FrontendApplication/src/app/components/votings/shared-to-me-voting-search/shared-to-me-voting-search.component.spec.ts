import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedToMeVotingSearchComponent } from './shared-to-me-voting-search.component';

describe('SharedToMeVotingSearchComponent', () => {
  let component: SharedToMeVotingSearchComponent;
  let fixture: ComponentFixture<SharedToMeVotingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharedToMeVotingSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedToMeVotingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
