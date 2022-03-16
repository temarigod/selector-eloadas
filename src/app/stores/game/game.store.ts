import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { createInitialState } from './initial-state';

export interface GameState {
  availableWords: string[];
  chosenWordLength: number | null;
  word: string | null;
  attemptedLetters: string[];
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'game' })
export class GameStore extends Store<GameState> {
  constructor() {
    super(createInitialState());
  }
}
