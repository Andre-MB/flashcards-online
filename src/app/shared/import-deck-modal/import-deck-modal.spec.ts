import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDeckModal } from './import-deck-modal';

describe('ImportDeckModal', () => {
  let component: ImportDeckModal;
  let fixture: ComponentFixture<ImportDeckModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportDeckModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportDeckModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
