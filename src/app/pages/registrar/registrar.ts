import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrar.html',
  styleUrls: ['./registrar.css']
})
export class Registrar {
  nome = '';
  email = '';
  senha = '';
  termoAceite = false;
  
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  // Validação em tempo real
  isFormValid(): boolean {
    // Regex simples e eficiente para validar formato de e-mail (exemplo@dominio.com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return (
      this.nome.trim().length > 2 &&      // Nome tem que ter pelo menos 3 letras
      emailRegex.test(this.email) &&      // E-mail tem que ser válido
      this.senha.length >= 8 &&           // Senha com mínimo de 8 caracteres
      this.termoAceite === true           // Tem que aceitar os termos
    );
  }

  onRegister() {
    if (!this.isFormValid() || this.isLoading) return;

    this.isLoading = true;

    const payload = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      termoAceite: this.termoAceite
    };

    this.auth.registrar(payload).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Conta criada com sucesso! Faça login para continuar.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        // Pode ser um erro 400 (ex: E-mail já existe)
        alert('Erro ao criar conta. O e-mail já pode estar em uso.');
      }
    });
  }
}