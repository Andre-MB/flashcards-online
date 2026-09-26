import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-folder-modal',
  standalone: true,
  templateUrl: './delete-folder-modal.html',
  styleUrls: ['./delete-folder-modal.css'] // Pode usar o estilo base dos seus modais
})
export class DeleteFolderModal {
  @Input() folderName = ''; // Recebe o nome para mostrar na mensagem
  @Output() confirmed = new EventEmitter<boolean>(); // Emite true ou false

  confirmDelete() {
    this.confirmed.emit(true);
    this.close()
  }

  close() {
    this.confirmed.emit(false);
  }
}