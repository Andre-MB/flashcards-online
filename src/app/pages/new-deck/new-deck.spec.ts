import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeck } from './new-deck';

describe('NewDeck', () => {
  let component: NewDeck;
  let fixture: ComponentFixture<NewDeck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDeck],
    }).compileComponents();

    fixture = TestBed.createComponent(NewDeck);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
