import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-new-deck',
  standalone: true,
  templateUrl: './edit-deck.html',
  styleUrls: ['./edit-deck.css'],
  imports: [FormsModule],
})
export class EditDeck {
  deckName = '';
  folderName = '';

  cards = [{ question: '', answer: '' }];

  addCard() {
    this.cards.push({ question: '', answer: '' });
  }

  removeCard(index: number) {
    this.cards.splice(index, 1);
  }

  save() {
    const deck = {
      name: this.deckName,
      folder: this.folderName,
      cards: this.cards,
    };

    console.log('DECK SALVO:', deck);

    // depois vamos salvar no localStorage ou API
  }
}
