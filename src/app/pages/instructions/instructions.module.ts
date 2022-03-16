import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InstructionsComponent } from './instructions.component';

@NgModule({
  declarations: [
    InstructionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: InstructionsComponent,
      },
    ]),
  ],
})
export class InstructionsModule {}
