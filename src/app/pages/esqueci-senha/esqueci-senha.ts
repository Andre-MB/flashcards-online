import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './esqueci-senha.html',
  styleUrls: ['./esqueci-senha.css'] // Pode reutilizar o css do login
})
export class EsqueciSenha {
  email = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  enviarEmail() {
    if (!this.email || this.isLoading) return;

    this.isLoading = true;

    this.auth.esqueciSenha(this.email).subscribe({
      next: () => {
        // Sucesso: Vai para a tela 2 e envia o e-mail pela URL para facilitar
        this.router.navigate(['/login-recuperacao'], { queryParams: { email: this.email } });
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        alert('Ocorreu um erro. Verifique se o e-mail está correto.');
        window.location.reload();
      }
    });
  }
}