import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WordLengthSelectorComponent } from './word-length-selector.component';

@NgModule({
  declarations: [WordLengthSelectorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WordLengthSelectorComponent,
      },
    ]),
  ],
})
export class WordLengthSelectorModule {}
