import { Routes } from '@angular/router';
import { loginGuard } from './login/guards/login-guard';
import { itemsResolver } from './items/guards/items-resolver';


export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },

  {
    path: 'login',
    title: 'Loja | Login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: 'items',
    title: 'Loja | Gerenciador de itens',
    loadComponent: () => import('./items/items').then((m) => m.Items),
    canActivate: [loginGuard],
  },
  {
    path: 'items/new',
    title: 'Loja | Adicionar item',
    loadComponent: () => import('./items/items-form/items-form').then((m) => m.ItemsForm),
    resolve: { item: itemsResolver },
  },
  {
    path: 'items/edit/:id',
    title: 'Loja | Atualizar item',
    loadComponent: () => import('./items/items-form/items-form').then((m) => m.ItemsForm),
    resolve: { item: itemsResolver },
  },
];
