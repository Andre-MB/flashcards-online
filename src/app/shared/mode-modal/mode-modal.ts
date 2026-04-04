import { Component, EventEmitter, Output } from '@angular/core';
import { StudyMode } from '../../types/study-mode';

@Component({
  selector: 'app-mode-modal',
  standalone: true,
  templateUrl: './mode-modal.html',
  styleUrls: ['./mode-modal.css'],
})
export class ModeModal {
  @Output() selected = new EventEmitter<StudyMode>();

  choose(mode: StudyMode) {
    this.selected.emit(mode);
  }
}
