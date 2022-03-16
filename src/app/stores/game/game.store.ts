import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { createInitialState } from './initial-state';

export interface GameState {
  word: string;
  attemptedLetters: string[];
  allLetters: string[];
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
