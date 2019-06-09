import { ObjetoComponent } from '../objeto/objeto.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ObjetoComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ObjetoComponent]

})
export class DividirComponentsModule { }
