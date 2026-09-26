import { Component,AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';


declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
  imports: [FormsModule],
})
export class Login implements AfterViewInit{
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    // 1. Tenta desenhar imediatamente (caso o script já tenha carregado)
    if (typeof google !== 'undefined' && google.accounts) {
      this.renderizarBotaoGoogle();
    } else {
      // 2. Se não carregou, coloca um "vigia" num intervalo de tempo
      const maxTentativas = 20; // Tenta por 2 segundos (20 * 100ms)
      let tentativas = 0;
      
      const intervalo = setInterval(() => {
        tentativas++;
        if (typeof google !== 'undefined' && google.accounts) {
          clearInterval(intervalo);
          this.renderizarBotaoGoogle();
        } else if (tentativas >= maxTentativas) {
          clearInterval(intervalo);
          console.error('[GSI] O script do Google não carregou.');
        }
      }, 100);
    }
  }

  renderizarBotaoGoogle() {
    try {
      google.accounts.id.initialize({
        client_id: '787281163194-tpsjfq9v5bnnvjcjd4qbblescr14440e.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleLogin(response)
      });
      
      // Associa o clique do nosso botão personalizado à janela do Google
      const customBtn = document.getElementById('custom-google-btn');
      if (customBtn) {
         customBtn.onclick = () => {
            // Isto abre a janela flutuante "Escolha a sua conta" do Google
            google.accounts.id.prompt();
         };
         console.log('[GSI] Botão personalizado pronto!');
      }

    } catch (error) {
       console.error('[GSI] Erro ao inicializar o botão:', error);
    }
  }

  // 3. A FUNÇÃO QUE ESTAVA FALTANDO: Processa o token gerado pelo Google
  handleGoogleLogin(response: any) {
    const googleToken = response.credential; // JWT do Google

    // Envia o token para a sua API C# através do AuthService
    this.auth.loginWithGoogle(googleToken).subscribe({
      next: () => {
        // Redireciona para a Home com a ajuda do NgZone
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        });
      },
      error: (err) => {
        console.error('Erro ao validar login do Google:', err);
        alert('Falha na autenticação com o Google.');
      }
    });
  }

  onLogin() {
    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        // Sucesso: O token já foi salvo pelo serviço, basta redirecionar
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // Erro: API retornou 401 Unauthorized ou outro erro
        console.error('Erro no login:', err);
        alert('Login ou senha inválidos');
      }
    });
  }
}