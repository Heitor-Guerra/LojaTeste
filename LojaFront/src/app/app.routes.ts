import { Routes } from '@angular/router';
import { loginGuard } from './login/guards/login-guard';

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },

  {
    path: "login",
    title: "Loja | Login",
    loadComponent: () => import("./login/login").then((m) => m.Login),
  },
  {
    path: "items",
    title: "Loja | Gerenciador de itens",
    loadComponent: () => import("./items/items").then((m) => m.Items),
    canActivate: [loginGuard],
  },
];
