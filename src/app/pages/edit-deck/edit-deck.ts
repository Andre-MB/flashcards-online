import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

// Interfaces para tipagem
interface ApiFolder {
  idPasta: number;
  nome: string;
}

interface ApiFlashcard {
  idFlashcard: number;
  frente: string;
  verso: string;
  idDeck: number;
}

// Interface provável do GET /api/Decks/{id} (caso ele retorne os detalhes do deck)
interface ApiDeckDetails {
    idDeck: number;
    nome: string;
    idPasta: number;
    idUser: number;
}

@Component({
  selector: 'app-edit-deck', // <-- Atualizado
  standalone: true,
  templateUrl: './edit-deck.html',
  styleUrls: ['./edit-deck.css'],
  imports: [FormsModule, CommonModule],
})
export class EditDeck implements OnInit {
  deckId: string = '';
  deckName = '';
  selectedFolderId: number | '' = '';
  
  folders: ApiFolder[] = [];
  
  // Lista de flashcards para o form
  cards: { question: string, answer: string }[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // 1. Pega o ID da URL
    this.deckId = this.route.snapshot.paramMap.get('id') || '';

    // 2. Carrega a lista de pastas para o Select
    this.carregarPastas();

    // 3. Carrega os dados do Deck atual
    if (this.deckId) {
      this.carregarDetalhesDoDeck();
      this.carregarFlashcards();
    }
  }

  carregarPastas() {
    this.http.get<any[]>(`${environment.apiUrl}/Pastas`).subscribe({
      next: (data) => {
        this.folders = data;
        this.cdr.detectChanges(); // Atualiza a tela
      },
      error: (err) => console.error('Erro pastas:', err)
    });
  }

  carregarDetalhesDoDeck() {
    this.http.get<any[]>(`${environment.apiUrl}/Decks`).subscribe({
        next: (todosOsDecks) => {
          console.log('Todos os decks recebidos:', todosOsDecks);
            // Procura na lista o deck que tem o ID igual ao da URL
            // Usamos '==' para não dar conflito se um for string e outro number
            const deckAtual = todosOsDecks.find(d => d.idDeck == this.deckId);
            console.log('Deck filtrado:', deckAtual);
            if (deckAtual) {
              this.deckName = deckAtual.nome;
              this.selectedFolderId = deckAtual.idPasta;
              this.cdr.detectChanges();
            } else {
              console.error('Deck não encontrado na lista geral.');
            }
        },
        error: (err) => console.error('Erro ao buscar a lista de decks:', err)
    });
  }

  carregarFlashcards() {
    this.http.get<ApiFlashcard[]>(`${environment.apiUrl}/Decks/${this.deckId}/flashcards`).subscribe({
      next: (flashcardsDaApi) => {
        console.log('Flashcards recebidos:', flashcardsDaApi);
        // Converte do formato da API (frente/verso) para o formato do HTML (question/answer)
        this.cards = flashcardsDaApi.map(f => ({
          question: f.frente,
          answer: f.verso
        }));

        // Se o deck estiver vazio, adiciona pelo menos um campo vazio
        if (this.cards.length === 0) {
            this.addCard();
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar os flashcards:', err);
        alert('Deck não encontrado ou sem flashcards.');
        this.router.navigate(['/home']);
      }
    });
  }

  addCard() {
    this.cards.push({ question: '', answer: '' });
  }

  removeCard(index: number) {
      if (this.cards.length > 1) {
        this.cards.splice(index, 1);
      }
  }

  save() {
    if (!this.deckName.trim() || this.selectedFolderId === '') {
      alert('Preencha o nome e selecione uma pasta.');
      return;
    }

    const validCards = this.cards.filter(c => c.question.trim() && c.answer.trim());
    
    if (validCards.length === 0) {
      alert('Adicione pelo menos um flashcard válido.');
      return;
    }

    // Monta o payload conforme a estrutura que forneceu
    const payload = {
      nome: this.deckName.trim(),
      idPasta: Number(this.selectedFolderId),
      flashcards: validCards.map(card => ({
        frente: card.question.trim(),
        verso: card.answer.trim()
      }))
    };

    this.http.put(`${environment.apiUrl}/Decks/${this.deckId}`, payload).subscribe({
      next: () => {
        alert('Deck atualizado com sucesso!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro ao atualizar deck:', err);
        alert('Ocorreu um erro ao atualizar.');
      }
    });
  }
}