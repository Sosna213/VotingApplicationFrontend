import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingSearchPanelComponent } from './votings-search-panel.component';

describe('VotingsSearchPanelComponent', () => {
  let component: VotingSearchPanelComponent;
  let fixture: ComponentFixture<VotingSearchPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VotingSearchPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
