import { Injectable } from '@angular/core';
import { firstValueFrom, take } from 'rxjs';
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

  public async selectCharacter(character: string): Promise<void> {
    const gameIsAlreadyFinished = await firstValueFrom(
      this.gameQuery.gameIsFinished$.pipe(take(1))
    );

    if (gameIsAlreadyFinished) {
      return;
    }

    const attemptedLetters = await firstValueFrom(
      this.gameQuery.attemptedLetters$
    );

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
