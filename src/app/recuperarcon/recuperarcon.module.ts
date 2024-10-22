import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarconPageRoutingModule } from './recuperarcon-routing.module';

import { RecuperarconPage } from './recuperarcon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarconPageRoutingModule
  ],
  declarations: [RecuperarconPage]
})
export class RecuperarconPageModule {}
