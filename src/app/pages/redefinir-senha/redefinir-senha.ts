import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './redefinir-senha.html',
  styleUrls: ['./redefinir-senha.css'] // Pode reutilizar o css do login
})
export class RedefinirSenha {
  novaSenha = '';
  confirmarSenha = '';

  constructor(private auth: AuthService, private router: Router) {}

  salvarNovaSenha() {
    if (this.novaSenha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    if (this.novaSenha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    this.auth.redefinirSenha(this.novaSenha).subscribe({
      next: () => {
        alert('Senha atualizada com sucesso! Bem-vindo(a) de volta.');
        // Finalmente libertamos o utilizador para a aplicação principal
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        alert('Ocorreu um erro ao guardar a nova senha.');
      }
    });
  }
}