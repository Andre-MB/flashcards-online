import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  templateUrl: './flashcard.html',
  styleUrls: ['./flashcard.css'],
})
export class FlashcardComponent implements OnChanges {
  @Input() question!: string;
  @Input() answer!: string;

  @Output() answered = new EventEmitter<'correct' | 'wrong'>();

  flipped = false;

  // swipe
  isDragging = false;
  startX = 0;
  currentX = 0;

  transform = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['question']) {
      this.flipped = false;
      this.transform = '';
    }
  }

  flip() {
    this.flipped = !this.flipped;
  }

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;

    this.currentX = event.clientX - this.startX;

    this.transform = `translateX(${this.currentX}px) rotate(${this.currentX / 10}deg)`;
  }

  endDrag() {
    if (!this.isDragging) return;

    this.isDragging = false;

    if (this.currentX > 100) {
      this.answered.emit('correct');
    } else if (this.currentX < -100) {
      this.answered.emit('wrong');
    }

    this.transform = '';
    this.currentX = 0;
  }
}
