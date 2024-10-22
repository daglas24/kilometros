import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recuperarcon',
  templateUrl: './recuperarcon.page.html',
  styleUrls: ['./recuperarcon.page.scss'],
})
export class RecuperarconPage {
  errorMessage: string | null = null;

  constructor() {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      // Aquí puedes agregar la lógica para enviar el correo de recuperación
      console.log('Recuperar contraseña para:', email);
      // Limpia el formulario después de enviar
      form.reset();
      this.errorMessage = null; // Limpiar mensaje de error
    } else {
      this.errorMessage = 'Por favor, ingresa un correo electrónico válido.';
    }
  }
}
