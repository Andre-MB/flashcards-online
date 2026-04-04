import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeModal } from './mode-modal';

describe('ModeModal', () => {
  let component: ModeModal;
  let fixture: ComponentFixture<ModeModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ModeModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
