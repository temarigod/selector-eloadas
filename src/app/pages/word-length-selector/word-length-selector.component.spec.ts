import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordLengthSelectorComponent } from './word-length-selector.component';

describe('WordLengthSelectorComponent', () => {
  let component: WordLengthSelectorComponent;
  let fixture: ComponentFixture<WordLengthSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordLengthSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordLengthSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
