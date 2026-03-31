import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardComponent } from '../../components/flashcard/flashcard';

@Component({
  selector: 'app-deck',
  standalone: true,
  templateUrl: './deck.html',
  styleUrls: ['./deck.css'],
  imports: [FlashcardComponent],
})
export class Deck {
  deckId: string | null = null;

  currentIndex = 0;

  flashcards = [
    {
      question: 'O que é JavaScript?',
      answer: 'Uma linguagem de programação',
      level: 0,
      nextReview: Date.now(),
    },
    {
      question: 'O que é Angular?',
      answer: 'Um framework frontend',
      level: 0,
      nextReview: Date.now(),
    },
  ];

  studyQueue: any[] = [];

  wrongCards: any[] = [];

  getDelay(level: number) {
    const delays = [
      5000, // 5s
      15000, // 15s
      30000, // 30s
      60000, // 1min
      300000, // 5min
    ];

    return delays[level] || 300000;
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.deckId = this.route.snapshot.paramMap.get('id');
    this.loadAvailableCards();
  }

  loadAvailableCards() {
    const now = Date.now();

    this.studyQueue = this.flashcards.filter((card) => card.nextReview <= now);
  }

  get currentCard() {
    return this.studyQueue[0];
  }

  get availableCards() {
    const now = Date.now();
    return this.flashcards.filter((c) => c.nextReview <= now);
  }

  // markWrong() {
  //   const card = this.studyQueue.shift(); // tira da frente

  //   if (card) {
  //     this.studyQueue.push(card); // volta pro final
  //   }
  // }

  markWrong() {
    const card = this.currentCard;

    card.level = 0;
    card.nextReview = Date.now() + 5000;

    this.removeFromQueue();
  }

  // markCorrect() {
  //   this.studyQueue.shift();
  // }

  markCorrect() {
    const card = this.currentCard;

    card.level++;
    card.nextReview = Date.now() + this.getDelay(card.level);

    this.removeFromQueue();
  }

  removeFromQueue() {
    this.studyQueue.shift();

    if (this.studyQueue.length === 0) {
      this.waitForNextCards();
    }
  }

  waitForNextCards() {
    setTimeout(() => {
      this.loadAvailableCards();
    }, 1000);
  }

  nextCard() {
    if (this.currentIndex < this.flashcards.length - 1) {
      this.currentIndex++;
    } else {
      alert('Terminou o deck!');
    }
  }

  // onAnswer(result: 'correct' | 'wrong') {
  //   if (result === 'wrong') {
  //     this.markWrong();
  //   } else {
  //     this.markCorrect();
  //   }
  // }

  onAnswer(result: 'correct' | 'wrong') {
    if (result === 'wrong') {
      this.markWrong();
    } else {
      this.markCorrect();
    }
  }
  isFinished() {
    return this.studyQueue.length === 0;
  }
}
