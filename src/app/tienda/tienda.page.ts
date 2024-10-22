import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DolarService } from '../services/dolar.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  dolares: any;

  constructor(
    private router: Router,
    private dolarService: DolarService
  ) {}

  ngOnInit() {
    this.getDolarValue();
  }

  getDolarValue() {
    this.dolarService.getDolar().subscribe(
      (data) => {
        this.dolares = data;
      },
      (error) => {
        console.error('Error al obtener el valor del dólar', error);
      }
    );
  }

  goToInicio() {
    this.router.navigate(['/inicio']);
  }

  irAlCarrito() {
    this.router.navigate(['/carrito']);
  }
}
