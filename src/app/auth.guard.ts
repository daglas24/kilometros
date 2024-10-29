import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('Checking authentication...'); // Log para depuración
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
    if (isAuthenticated) {
      console.log('User is authenticated'); // Log para depuración
      return true;
    } else {
      console.log('User is not authenticated, redirecting to login...'); // Log para depuración
      this.router.navigate(['/login']); // Redirigir a la página de login
      return false;
    }
  }
}

  

