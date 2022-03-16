import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { createInitialState } from './initial-state';

export interface GameState {
  word: string;
  attemptedLetters: string[];
  allLetters: string[];
}
@Injectable({
  providedIn: 'root',
})
export class GameStore {
  public stateSubject = new BehaviorSubject<GameState>(createInitialState());

  public update(callback: (state: GameState) => GameState): void {
    const existingState = this.stateSubject.getValue();

    const newState = callback(existingState);

    if (newState !== existingState) {
      this.stateSubject.next(newState);
    }
  }
}
