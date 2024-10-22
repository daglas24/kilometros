import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TiendaPageRoutingModule } from './tienda-routing.module';
import { TiendaPage } from './tienda.page';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar esto

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendaPageRoutingModule,
    HttpClientModule // Importa el HttpClientModule aquí
  ],
  declarations: [TiendaPage]
})
export class TiendaPageModule { }
