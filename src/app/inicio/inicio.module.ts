import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InicioPageRoutingModule } from './inicio-routing.module';
import { InicioPage } from './inicio.page';
import { MatTableModule } from '@angular/material/table'; // Importa MatTableModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    MatTableModule // Añade MatTableModule aquí
  ],
  declarations: [InicioPage]
})
export class InicioPageModule { }
