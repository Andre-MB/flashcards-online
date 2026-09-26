import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatExpansionModule } from '@angular/material/expansion';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { StudyMode } from '../../types/study-mode';

// Modais
import { ModeModal } from '../../shared/mode-modal/mode-modal';
import { NewFolderModal } from '../../shared/new-folder-modal/new-folder-modal';
import { EditFolderModal } from '../../shared/edit-folder-modal/edit-folder-modal';
import { DeleteFolderModal } from '../../shared/delete-folder-modal/delete-folder-modal';
import { DeleteDeckModal } from '../../shared/delete-deck-modal/delete-deck-modal';
import { ImportDeckModal } from '../../shared/import-deck-modal/import-deck-modal';

interface ApiDeck {
  idDeck: number;
  nome: string;
}

interface ApiFolder {
  idPasta: number;
  nome: string;
  decks: ApiDeck[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [
    CommonModule,
    MatExpansionModule,
    ModeModal,
    NewFolderModal,
    EditFolderModal,
    DeleteFolderModal,
    DeleteDeckModal,
    ImportDeckModal
  ],
  animations: [
    trigger('accordion', [
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition('closed <=> open', [animate('250ms ease-in-out')]),
    ]),
  ],
})
export class Home implements OnInit {
  folders: any[] = [];
  sidebarOpen = false;

  // Controles de Modais
  showModal = false; // Modal de estudo
  showModalNewFolder = false;
  showEditFolderModal = false;
  showDeleteFolderModal = false;
  showDeleteDeckModal = false;
  showImportDeckModal = false;

  // Variáveis de seleção
  deckToStudyId: string = ''; 
  folderToEdit: any = null;
  folderToDelete: any = null;
  deckToDelete: any = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarPastas();
  }

  // ==========================================
  // CARREGAMENTO E LAYOUT
  // ==========================================
  carregarPastas() {
    const url = `${environment.apiUrl}/Pastas/com-decks`;
    this.http.get<ApiFolder[]>(url).subscribe({
      next: (pastasDaApi) => {
        this.folders = pastasDaApi.map((pasta) => ({
          id: pasta.idPasta,
          name: pasta.nome,
          open: false,
          decks: pasta.decks ? pasta.decks.map((deck) => ({
            id: deck.idDeck.toString(),
            name: deck.nome
          })) : []
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao buscar as pastas:', err)
    });
  }

  toggleFolder(folder: any) {
    folder.open = !folder.open;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  // ==========================================
  // ESTUDO (MODAL DE MODOS)
  // ==========================================
  openDeck(deckId: string) {
    this.deckToStudyId = deckId; // Corrigido para unificar a variável!
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.deckToStudyId = '';
  }

  onModeSelected(mode: StudyMode) {
    this.showModal = false;
    if (this.deckToStudyId) {
      this.router.navigate(['/deck', this.deckToStudyId], { queryParams: { mode: mode } });
    }
  }

  // ==========================================
  // PASTAS (CRIAR, EDITAR, EXCLUIR)
  // ==========================================
  openNewFolderModal() {
    this.showModalNewFolder = true;
    if (this.sidebarOpen) this.sidebarOpen = false;
  }
  
  closeNewFolderModal() {
    this.showModalNewFolder = false;
  }

  onFolderCreated(folderName: string) {
    if (!folderName) {
      this.closeNewFolderModal();
      return;
    }
    const url = `${environment.apiUrl}/Pastas`;
    this.http.post(url, { nome: folderName }).subscribe({
      next: () => {
        this.closeNewFolderModal();
        this.carregarPastas();
      },
      error: (err) => {
        console.error('Erro ao criar pasta:', err);
        alert('Ocorreu um erro ao criar a pasta.');
      }
    });
  }

  openEditFolderModal(folder: any) {
    this.folderToEdit = folder;
    this.showEditFolderModal = true;
  }
  
  closeEditFolderModal() {
    this.showEditFolderModal = false;
    this.folderToEdit = null;
  }

  onFolderEdited(newName: string) {
    if (!newName) {
      this.closeEditFolderModal();
      return;
    }
    const url = `${environment.apiUrl}/Pastas/${this.folderToEdit.id}`;
    this.http.put(url, { nome: newName }).subscribe({
      next: () => {
        this.closeEditFolderModal();
        this.carregarPastas();
      },
      error: (err) => {
        console.error('Erro ao editar pasta:', err);
        alert('Ocorreu um erro ao editar a pasta.');
      }
    });
  }

  openDeleteFolderModal(folder: any) {
    this.folderToDelete = folder;
    this.showDeleteFolderModal = true;
  }
  
  closeDeleteFolderModal() {
    this.showDeleteFolderModal = false;
    this.folderToDelete = null;
  }

  onFolderDeleted(confirmado: boolean) {
    if (!confirmado) {
      this.closeDeleteFolderModal();
      return;
    }
    const url = `${environment.apiUrl}/Pastas/${this.folderToDelete.id}`;
    this.http.delete(url).subscribe({
      next: () => {
        this.closeDeleteFolderModal();
        this.carregarPastas();
      },
      error: (err) => {
        console.error('Erro ao excluir pasta:', err);
        alert('Ocorreu um erro ao excluir a pasta.');
        this.closeDeleteFolderModal();
      }
    });
  }

  // ==========================================
  // DECKS (CRIAR, EDITAR, EXCLUIR, IMPORTAR)
  // ==========================================
  goToCreate() {
    this.router.navigate(['deck/new']);
  }

  goToEditDeck(deckId: string) {
    console.log("click")
    this.router.navigate(['/deck/edit', deckId]);
  }

  openDeleteDeckModal(deck: any) {
    this.deckToDelete = deck;
    this.showDeleteDeckModal = true;
  }
  
  closeDeleteDeckModal() {
    this.showDeleteDeckModal = false;
    this.deckToDelete = null;
  }

  onDeckDeleted(confirmado: boolean) {
    if (!confirmado) {
      this.closeDeleteDeckModal();
      return;
    }
    const deckId = this.deckToDelete.id;
    const url = `${environment.apiUrl}/Decks/${deckId}`;
    this.http.delete(url).subscribe({
      next: () => {
        this.closeDeleteDeckModal();
        this.carregarPastas();
      },
      error: (err) => {
        console.error('Erro ao excluir deck:', err);
        alert('Ocorreu um erro ao excluir o deck.');
        this.closeDeleteDeckModal();
      }
    });
  }

  openImportDeckModal() {
    this.showImportDeckModal = true;
    if (this.sidebarOpen) this.sidebarOpen = false;
  }
  
  closeImportDeckModal() {
    this.showImportDeckModal = false;
  }

  onDeckImported(sucesso: boolean) {
    this.showImportDeckModal = false;
    if (sucesso) {
      this.carregarPastas();
    }
  }
}