import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; //importamos el autentificador



const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard] },//implementamos el canActive el cual nos dice, si el usuario esta auntentificado puede entrar y ver el contenido de los archivos que tienen el canActive, si no se autentifica nos redirigue al login obligatoriamente
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'combustible',
    loadChildren: () => import('./combustible/combustible.module').then(m => m.CombustiblePageModule), canActivate: [AuthGuard] },
  
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule), canActivate: [AuthGuard] },
  {
    path: 'tienda',
    loadChildren: () => import('./tienda/tienda.module').then(m => m.TiendaPageModule), canActivate: [AuthGuard] },
  {
    path: 'recuperarcon',
    loadChildren: () => import('./recuperarcon/recuperarcon.module').then(m => m.RecuperarconPageModule), canActivate: [AuthGuard] },

  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosPageModule), canActivate: [AuthGuard] },

  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersPageModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
