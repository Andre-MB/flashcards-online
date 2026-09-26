import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

// Interface para tipar o retorno da sua API
export interface LoginResponse {
  token: string;
  nome: string;
}

@Injectable({ providedIn: 'root' })


export class AuthService {
  // URL da sua API local
  private apiUrl = `${environment.apiUrl}/Auth/login`;
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    // Mapeando a variável 'password' para a propriedade 'senha' que a API espera
    const body = { 
      email: email, 
      senha: password 
    };

    return this.http.post<LoginResponse>(this.apiUrl, body).pipe(
      tap(response => {
        // Salva o token no localStorage se a requisição for um sucesso
        localStorage.setItem('token', response.token);
        // Opcional: Salvar o nome do usuário também
        localStorage.setItem('userName', response.nome);
      })
    );
  }


  // 1. Solicita a nova senha para o e-mail
  esqueciSenha(email: string) {
    const url = `${environment.apiUrl}/Auth/esqueci-senha`;
    return this.http.post(url, { email }, { responseType: 'text' });
  }

  // 3. Muda a senha (exige o token JWT que foi salvo no Passo 2)
  redefinirSenha(novaSenha: string) {
    const url = `${environment.apiUrl}/Auth/redefinir-senha`;
    const token = localStorage.getItem('token'); // Recupera o token guardado
    
    // Passa o token no cabeçalho (Authorization: Bearer ...)
    return this.http.post(url, { novaSenha }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // NOVO MÉTODO: Registar um novo utilizador
  registrar(dadosUsuario: any) {
    const url = `${environment.apiUrl}/Auth/registrar`;
    return this.http.post(url, dadosUsuario);
  }

  isLogged() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  }

  loginWithGoogle(idToken: string) {
    const url = `${environment.apiUrl}/Auth/login-google`;
    
    // O payload tem que bater certo com o cURL: { "idToken": "string" }
    return this.http.post<any>(url, { idToken }).pipe(
      tap(response => {
        // Assume que a API C# retorna um token JWT na propriedade "token" (igual ao login normal)
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }
}