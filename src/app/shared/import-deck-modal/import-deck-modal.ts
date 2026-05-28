import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-deck-modal',
  standalone: true,
  templateUrl: './import-deck-modal.html',
  styleUrls: ['./import-deck-modal.css'],
  imports: [FormsModule],
})
export class ImportDeckModal {
  deckName = '';
  folderName = '';

  createFolder() {
    console.log('Importar deck:', this.deckName);
    console.log('Pasta selecionada:', this.folderName);
    // depois vamos implementar a lógica de importação do deck
  }

  isMobile = window.innerWidth <= 768;

  ngOnInit() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }

  fileName: string = '';

  dadosJson: any[] = [];
  isDragging = false;

  // Previne o comportamento padrão do navegador ao arrastar
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  // Ao soltar o arquivo
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files) {
      this.lerArquivo(event.dataTransfer.files[0]);
    }
  }

  // Ao selecionar via clique
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.lerArquivo(file);
  }

  // Processa os arquivos
  handleFiles(files: FileList) {
    if (files.length > 0) {
      const file = files[0];
      this.fileName = file.name;
      // Aqui você pode adicionar o serviço para fazer o upload do arquivo
    }
  }

  // Lê e converte o arquivo
  lerArquivo(file: File) {
    if (!file) return;

    this.fileName = file.name;
    // Aqui você pode adicionar o serviço para fazer o upload do arquivo

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Pega a primeira planilha do arquivo
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Converte a planilha para JSON
      this.dadosJson = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log(`${file.name}`, this.dadosJson);
    };

    reader.readAsArrayBuffer(file);
  }
}
