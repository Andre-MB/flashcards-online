import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardComponent } from '../../components/flashcard/flashcard';

interface Card {
  id: number;
  question: string;
  answer: string;
  level: number;
  nextReview: number;
}

@Component({
  selector: 'app-deck',
  standalone: true,
  templateUrl: './deck.html',
  styleUrls: ['./deck.css'],
  imports: [FlashcardComponent],
})
export class Deck {
  deckId: string | null = null;

  flashcards: Card[] = [
    { id: 1, question: 'A', answer: 'Resposta A', level: 0, nextReview: 0 },
    { id: 2, question: 'B', answer: 'Resposta B', level: 0, nextReview: 0 },
    { id: 3, question: 'C', answer: 'Resposta C', level: 0, nextReview: 0 },
  ];

  studyQueue: Card[] = [];
  reviewQueue: Card[] = [];
  intervalId: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.deckId = this.route.snapshot.paramMap.get('id');
    this.studyQueue = [...this.flashcards];
    this.startReviewLoop();
  }

  get currentCard(): Card | null {
    return this.studyQueue.length > 0 ? this.studyQueue[0] : null;
  }

  getWrongDelay() {
    return 5000;
  }

  getCorrectDelay(level: number) {
    const delays = [10000, 30000, 60000, 300000];
    return delays[level] || 300000;
  }

  markWrong() {
    const card = this.currentCard;
    if (!card) return;

    card.level = 0;
    card.nextReview = Date.now() + this.getWrongDelay();

    this.studyQueue.shift();
    this.studyQueue.push(card);

    if (!this.reviewQueue.find((c) => c.id === card.id)) {
      this.reviewQueue.push(card);
    }
  }

  markCorrect() {
    const card = this.currentCard;
    if (!card) return;

    card.level++;
    card.nextReview = Date.now() + this.getCorrectDelay(card.level);

    this.studyQueue.shift();

    if (!this.reviewQueue.find((c) => c.id === card.id)) {
      this.reviewQueue.push(card);
    }
  }

  startReviewLoop() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      this.checkReviewQueue();
    }, 300);
  }

  checkReviewQueue() {
    const now = Date.now();

    for (let i = 0; i < this.reviewQueue.length; i++) {
      const card = this.reviewQueue[i];

      if (card.nextReview <= now) {
        this.studyQueue = this.studyQueue.filter((c) => c.id !== card.id);
        this.studyQueue.splice(1, 0, card);
        this.reviewQueue.splice(i, 1);
        i--;
      }
    }
  }

  onAnswer(result: 'correct' | 'wrong') {
    if (result === 'wrong') {
      this.markWrong();
    } else {
      this.markCorrect();
    }
  }
}
