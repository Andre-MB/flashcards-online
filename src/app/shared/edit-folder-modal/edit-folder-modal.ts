import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-folder-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-folder-modal.html',
  styleUrls: ['./edit-folder-modal.css'] // Pode usar o mesmo CSS do new-folder-modal
})
export class EditFolderModal {
  @Input() folderName = ''; // Recebe o nome atual da pasta
  @Output() edited = new EventEmitter<string>(); // Emite o novo nome

  saveFolder() {
    if (this.folderName.trim()) {
      this.edited.emit(this.folderName.trim());
    }
  }

  close() {
    this.edited.emit(''); // Emite vazio para cancelar
  }
}