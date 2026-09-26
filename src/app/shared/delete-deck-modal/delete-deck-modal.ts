import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-deck-modal',
  standalone: true,
  templateUrl: './delete-deck-modal.html',
  styleUrls: ['./delete-deck-modal.css'] // Pode reutilizar o CSS do delete-folder
})
export class DeleteDeckModal {
  @Input() deckName = ''; // Recebe o nome para mostrar no aviso
  @Output() confirmed = new EventEmitter<boolean>();

  confirmDelete() {
    this.confirmed.emit(true);
  }

  close() {
    this.confirmed.emit(false);
  }
}