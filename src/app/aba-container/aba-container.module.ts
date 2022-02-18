import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ABAContainerComponent } from './aba-container.component';


@NgModule({
  declarations: [ABAContainerComponent],
  imports: [
    CommonModule, FormsModule, IonicModule
  ],
  exports: [ABAContainerComponent]
})
export class ABAContainerModule { }
