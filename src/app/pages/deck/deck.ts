import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // IMPORTADO
import { environment } from '../../../environments/environment'; // IMPORTADO
import { FlashcardComponent } from '../../components/flashcard/flashcard';

interface Card {
  id: number;
  question: string;
  answer: string;
  level: number;
  nextReview: number;
  flipped?: boolean; // Útil para o jogo da memória
}

@Component({
  selector: 'app-deck',
  standalone: true,
  templateUrl: './deck.html',
  styleUrls: ['./deck.css'],
  imports: [FlashcardComponent],
})
export class Deck implements OnInit {
  deckId: string | null = null;
  flashcards: Card[] = [];

  studyQueue: Card[] = [];
  reviewQueue: Card[] = [];
  intervalId: any = null;

  mode: 'time' | 'queue' | 'memory' = 'time';
  
  // Variáveis exclusivas do Jogo da Memória
  memoryCards: any[] = [];
  selectedCards: any[] = [];
  shuffledMemoryDeck: any[] = []; // Guarda a ordem do deck embaralhado para o jogo todo
  currentLevel: number = 1;
  totalLevels: number = 1;
  matchesInCurrentLevel: number = 0;


  // Injetamos o HttpClient aqui
  constructor(
      private route: ActivatedRoute, 
      private http: HttpClient,
      private cdr: ChangeDetectorRef // <-- ADICIONADO AQUI
  ) {}

  ngOnInit() {
    this.deckId = this.route.snapshot.paramMap.get('id');

    this.route.queryParams.subscribe((params) => {
      this.mode = params['mode'] || 'time';
      
      // Quando tivermos o ID e o Modo, buscamos na API
      if (this.deckId) {
        this.carregarFlashcardsDaApi();
      }
    });
  }

  // NOVA FUNÇÃO: Busca os dados na API
  carregarFlashcardsDaApi() {
    const url = `${environment.apiUrl}/Decks/${this.deckId}/flashcards`;
    console.log(`[RASTREADOR 1] - A chamar a API na rota: ${url}`);
    
    this.http.get<any[]>(url).subscribe({
      next: (cardsDaApi) => {
        console.log(`[RASTREADOR 2] - A API respondeu com sucesso! Dados brutos recebidos:`, cardsDaApi);

        if (!cardsDaApi || cardsDaApi.length === 0) {
            console.log(`[RASTREADOR 3] - A API devolveu uma lista vazia de flashcards para este deck.`);
        }

        // Mapeamos os dados
        this.flashcards = cardsDaApi.map((c) => {
            console.log(`[RASTREADOR 4] - A mapear o cartão com ID: ${c.idFlashcard}`);
            return {
              id: c.idFlashcard,
              question: c.frente,
              answer: c.verso,
              level: 0,
              nextReview: 0,
              flipped: false
            };
        });

        console.log(`[RASTREADOR 5] - Mapeamento completo. Cartões prontos para estudo:`, this.flashcards);

        // ATENÇÃO: Só iniciamos o modo DEPOIS que os cartões chegaram!
        this.initMode();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('[ERRO DO RASTREADOR] - Erro ao carregar flashcards:', err);
        alert('Não foi possível carregar os cartões.');
      }
    });
  }

  initMode() {
    if (this.mode === 'time') {
      this.studyQueue = [...this.flashcards];
      this.startReviewLoop();
    }
    if (this.mode === 'queue') {
      this.studyQueue = [...this.flashcards];
    }
    if (this.mode === 'memory') {
      this.initMemoryGame();
    }
  }


  

  // --- O RESTO DO SEU CÓDIGO CONTINUA IGUAL! ---

  // 1. Inicia ou reinicia o jogo do zero
  initMemoryGame() {
    // Embaralha TODOS os flashcards do deck para que as fases sejam aleatórias
    this.shuffledMemoryDeck = [...this.flashcards].sort(() => Math.random() - 0.5);
    
    // Calcula o total de fases (cada fase tem no máximo 12 flashcards)
    this.totalLevels = Math.ceil(this.shuffledMemoryDeck.length / 12) || 1;
    this.currentLevel = 1;

    // Carrega a primeira fase
    this.loadMemoryLevel();
  }


  // 2. Carrega as cartas específicas do nível atual
  loadMemoryLevel() {
    this.matchesInCurrentLevel = 0;
    this.selectedCards = [];

    // Calcula quais 12 flashcards vamos pegar com base no nível (slice: 0 a 12, 12 a 24...)
    const startIndex = (this.currentLevel - 1) * 12;
    const levelFlashcards = this.shuffledMemoryDeck.slice(startIndex, startIndex + 12);

    // Duplica criando a Frente e o Verso
    const duplicated = levelFlashcards.flatMap((card) => [
      { ...card, type: 'q', flipped: false, matched: false },
      { ...card, type: 'a', flipped: false, matched: false },
    ]);

    // Embaralha as até 24 cartas geradas para montar o tabuleiro
    this.memoryCards = duplicated.sort(() => Math.random() - 0.5);
  }

  // 3. Lógica do clique (já com a sua verificação de certo e errado)
  selectMemoryCard(card: any) {
    if (this.selectedCards.length === 2 || card.flipped || card.matched) return;

    card.flipped = true;
    this.selectedCards.push(card);

    if (this.selectedCards.length === 2) {
      setTimeout(() => {
        const [a, b] = this.selectedCards;

        if (a.id === b.id && a.type !== b.type) {
           a.matched = true;
           b.matched = true;
           this.matchesInCurrentLevel++; // Conta que encontrou um par

           // Verifica se encontrou todos os pares desta fase
           if (this.matchesInCurrentLevel === (this.memoryCards.length / 2)) {
              this.avancarNivel();
           }
        } else {
           a.flipped = false;
           b.flipped = false;
        }

        this.selectedCards = [];
      }, 1000);
    }
  }

  // 4. Lógica para passar de fase ou finalizar o jogo
  avancarNivel() {
    // Um pequeno atraso para o utilizador ver a última carta a virar antes de trocar a tela
    setTimeout(() => {
       if (this.currentLevel < this.totalLevels) {
          this.currentLevel++;
          this.loadMemoryLevel();
       } else {
          alert('🎉 Parabéns! Você encontrou todos os pares de todas as fases!');
          // Opcional: Reiniciar o jogo para jogar de novo
          this.initMemoryGame();
       }
    }, 800); 
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
    if (this.mode === 'queue') {
      const card = this.currentCard;
      if (!card) return;
      this.studyQueue.shift();
      this.studyQueue.push(card);
      return;
    }

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