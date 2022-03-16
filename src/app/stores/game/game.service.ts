import { Injectable } from '@angular/core';
import { GameQuery } from './game.query';
import { GameStore } from './game.store';
import { createInitialState } from './initial-state';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private readonly gameStore: GameStore,
    private readonly gameQuery: GameQuery
  ) {}

  public selectCharacter(character: string): void {
    const gameIsAlreadyFinished = this.gameQuery.gameIsFinished;

    if (gameIsAlreadyFinished) {
      return;
    }

    const attemptedLetters = this.gameQuery.attemptedLetters;

    if (!attemptedLetters.includes(character)) {
      this.gameStore.update((state) => {
        return {
          ...state,
          attemptedLetters: [...state.attemptedLetters, character],
        };
      });
    }
  }

  public endGame(): void {
    this.resetState();
  }

  public startNewGame(): void {
    this.resetState();
  }

  private resetState(): void {
    this.gameStore.update((state) => createInitialState());
  }
}
