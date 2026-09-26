import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

// Interfaces para tipagem
interface ApiFolder {
  idPasta: number;
  nome: string;
}

@Component({
  selector: 'app-import-deck-modal',
  standalone: true,
  templateUrl: './import-deck-modal.html',
  styleUrls: ['./import-deck-modal.css'],
  imports: [FormsModule],
})
export class ImportDeckModal implements OnInit {
  @Output() imported = new EventEmitter<boolean>(); // Avisa o Home para atualizar ou fechar

  // Usamos selectedFolderId em vez de folderName
  selectedFolderId: number | '' = '';
  folders: ApiFolder[] = [];
  
  fileName: string = '';
  deckName: string = ''; // Extraído do fileName
  
  isDragging = false;
  isMobile = window.innerWidth <= 768;

  // Formato correto para enviar à API
  flashcardsParaEnviar: { frente: string, verso: string }[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });

    this.carregarPastas();
  }

  carregarPastas() {
    this.http.get<ApiFolder[]>(`${environment.apiUrl}/Pastas`).subscribe({
      next: (data) => this.folders = data,
      error: (err) => console.error('Erro ao carregar pastas:', err)
    });
  }

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

  // Lê e converte o arquivo
  lerArquivo(file: File) {
    if (!file) return;

    this.fileName = file.name;
    // Remove a extensão (.xlsx ou .xls) para usar como nome do deck
    this.deckName = this.fileName.replace(/\.[^/.]+$/, ""); 

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // O { header: 1 } retorna um array de arrays: [[colunaA, colunaB], [colunaA, colunaB]]
      const rows = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });
      
      this.flashcardsParaEnviar = [];

      // Itera pelas linhas a partir da primeira (índice 0)
      for (const row of rows) {
        // row[0] é a Coluna A (frente), row[1] é a Coluna B (verso)
        const frente = row[0] ? String(row[0]).trim() : '';
        const verso = row[1] ? String(row[1]).trim() : '';

        // Só adiciona se ambas as colunas tiverem conteúdo
        if (frente && verso) {
          this.flashcardsParaEnviar.push({ frente, verso });
        }
      }

      console.log(`Lidos ${this.flashcardsParaEnviar.length} cartões válidos de ${file.name}`);

      this.cdr.detectChanges();
    };

    reader.readAsArrayBuffer(file);
  }

  importarDeck() {
    if (this.selectedFolderId === '') {
      alert('Por favor, selecione uma pasta.');
      return;
    }

    if (this.flashcardsParaEnviar.length === 0) {
      alert('Nenhum flashcard válido encontrado. Certifique-se que o Excel tem conteúdo nas colunas A e B.');
      return;
    }

    const payload = {
      nome: this.deckName,
      idPasta: Number(this.selectedFolderId),
      flashcards: this.flashcardsParaEnviar
    };

    this.http.post(`${environment.apiUrl}/Decks`, payload).subscribe({
      next: () => {
        alert('Deck importado com sucesso!');
        this.imported.emit(true); // Diz ao Home que deu certo
        this.cdr.detectChanges();
        this.closeModal()
      },
      error: (err) => {
        console.error('Erro ao importar deck:', err);
        alert('Ocorreu um erro ao importar.');
      }
    });
  }

  closeModal() {
    this.imported.emit(false); // Diz ao Home apenas para fechar
  }
}