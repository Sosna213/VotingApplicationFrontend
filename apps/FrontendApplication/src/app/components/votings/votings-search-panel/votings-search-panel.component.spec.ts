import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingsSearchPanelComponent } from './votings-search-panel.component';

describe('VotingsSearchPanelComponent', () => {
  let component: VotingsSearchPanelComponent;
  let fixture: ComponentFixture<VotingsSearchPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingsSearchPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingsSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
