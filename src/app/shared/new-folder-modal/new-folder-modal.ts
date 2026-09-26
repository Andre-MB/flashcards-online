import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necessário para o [(ngModel)]

@Component({
  selector: 'app-new-folder-modal',
  standalone: true,
  imports: [FormsModule], // Adicione aqui
  templateUrl: './new-folder-modal.html',
  styleUrls: ['./new-folder-modal.css'],
})
export class NewFolderModal {
  @Output() created = new EventEmitter<string>();

  folderName = '';

  createFolder() {
    if (this.folderName.trim()) {
      this.created.emit(this.folderName.trim());
    }
  }

  close() {
    this.created.emit(''); // Emite vazio para o pai saber que deve apenas fechar
  }
}