import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importante para o @for funcionar

// Interface para as pastas vindas da API
interface ApiFolderSimple {
  idPasta: number;
  nome: string;
  idUser: number;
}

@Component({
  selector: 'app-new-deck',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-deck.html',
  styleUrls: ['./new-deck.css'] // Ajuste o nome do ficheiro CSS se necessário
})
export class NewDeck implements OnInit {
  deckName = '';
  // Mudamos a variável para guardar o ID selecionado (número ou string vazia)
  selectedFolderId: number | '' = ''; 
  
  folders: ApiFolderSimple[] = []; // Guardará a lista de pastas da API

  cards = [
    { question: '', answer: '' } // Inicia com um cartão vazio
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarPastas();
  }

  carregarPastas() {
    const url = `${environment.apiUrl}/Pastas`;
    this.http.get<ApiFolderSimple[]>(url).subscribe({
      next: (data) => {
        this.folders = data; // Guarda a resposta da API
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar pastas:', err)
    });
  }

  addCard() {
    this.cards.push({ question: '', answer: '' });
  }

  removeCard(index: number) {
    if (this.cards.length > 1) { // Evita excluir o último cartão
      this.cards.splice(index, 1);
    }
  }

  save() {
    // 1. Validação inicial
    if (!this.deckName.trim() || this.selectedFolderId === '') {
      alert('Por favor, preencha o nome do deck e selecione uma pasta.');
      return;
    }

    // 2. Filtra os cartões válidos (que têm frente e verso preenchidos)
    const validCards = this.cards.filter(c => c.question.trim() && c.answer.trim());
    
    if (validCards.length === 0) {
      alert('Adicione pelo menos um flashcard válido com frente e verso.');
      return;
    }

    // 3. Monta o Payload no formato exato que o C# espera
    const payload = {
      nome: this.deckName.trim(),
      idPasta: Number(this.selectedFolderId), // Garante que o ID vai como número
      flashcards: validCards.map(card => ({
        frente: card.question.trim(),
        verso: card.answer.trim()
      }))
    };

    // 4. Envia para a API
    const url = `${environment.apiUrl}/Decks`;
    
    this.http.post(url, payload).subscribe({
      next: (response: any) => {
        // response.idDeck e response.mensagem vêm da sua API
        alert('Deck e Flashcards criados com sucesso!');
        
        // Redireciona de volta para a Home após criar
        this.router.navigate(['/home']); 
      },
      error: (err) => {
        console.error('Erro ao criar o deck:', err);
        alert('Ocorreu um erro ao salvar o deck. Tente novamente.');
      }
    });
  }
}