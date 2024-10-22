import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'; // Asegúrate de tener el servicio UserService

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private userService: UserService) {} // Inyecta UserService y Router

  onSubmit(form: NgForm) { // Especifica el tipo NgForm
    if (form.valid) {
      // Procesar datos si el formulario es válido
      console.log('Formulario válido', form.value);
      
      // Llamar al servicio para registrar el usuario en el CRUD
      this.userService.createUser(form.value).subscribe(
        (response) => {
          console.log('Usuario registrado exitosamente:', response);
          
          // Redirigir al login o tienda después del registro
          this.router.navigate(['/login']); // Aquí rediriges a la página de login
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
