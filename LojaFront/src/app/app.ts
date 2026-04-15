import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { LoginService } from './login/services/login-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private service: LoginService = inject(LoginService);
  private router: Router = inject(Router);
  protected readonly title = signal('Loja');

  isLogged():boolean {
    return this.service.isLogged();
  }

  logout(): void {
    this.router.navigate(['/login']).then();
    this.service.logout();
  }
}
