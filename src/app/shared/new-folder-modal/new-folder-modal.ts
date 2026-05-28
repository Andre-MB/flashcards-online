import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-folder-modal',
  standalone: true,
  templateUrl: './new-folder-modal.html',
  styleUrls: ['./new-folder-modal.css'],
})
export class NewFolderModal {
  @Output() created = new EventEmitter<string>();

  folderName = '';

  createFolder() {
    if (this.folderName.trim()) {
      this.created.emit(this.folderName.trim());
      this.close();
    }
  }

  close() {
    this.created.emit('');
  }
}
