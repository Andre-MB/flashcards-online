import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-recuperacao',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-recuperacao.html',
  styleUrls: ['./login-recuperacao.css'] // Pode reutilizar o css do login
})
export class LoginRecuperacao implements OnInit {
  email = '';
  senhaTemporaria = '';

  constructor(
    private route: ActivatedRoute, 
    private auth: AuthService, 
    private router: Router
  ) {}

  ngOnInit() {
    // Apanha o e-mail da URL (que enviámos no Passo 1)
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  fazerLoginTemporario() {
    if (!this.email || !this.senhaTemporaria) return;

    // Usa a rota PADRÃO de login
    this.auth.login(this.email, this.senhaTemporaria).subscribe({
      next: () => {
        // MAGIA AQUI: O AuthService já guardou o token no LocalStorage.
        // Em vez de ir para a '/home', nós obrigamos o utilizador a ir redefinir a senha!
        this.router.navigate(['/redefinir-senha']);
      },
      error: () => {
        alert('Senha temporária inválida. Tente novamente.');
      }
    });
  }
}