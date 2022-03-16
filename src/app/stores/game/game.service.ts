import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoute } from 'src/app/enums/app-route.enum';
import { GameQuery } from './game.query';
import { GameStore } from './game.store';
import { createInitialState } from './initial-state';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private readonly gameStore: GameStore,
    private readonly gameQuery: GameQuery,
    private readonly router: Router
  ) {}

  public selectWordLength(length: number | 'random'): void {
    const availableWordLengths = this.gameQuery.availableWordLengths;
    const lengthToSet =
      typeof length === 'number'
        ? length
        : this.randomIntFromInterval(
            availableWordLengths[0],
            availableWordLengths[availableWordLengths.length - 1]
          );

    const availableWordsFilteredByLength = this.gameQuery.availableWords.filter(
      (word) => word.length === lengthToSet
    );

    const randomizedWordIndex = this.randomIntFromInterval(
      0,
      availableWordsFilteredByLength.length - 1
    );

    this.gameStore.update((state) => {
      return {
        ...state,
        chosenWordLength: lengthToSet,
        word: availableWordsFilteredByLength[randomizedWordIndex],
      };
    });

    this.router.navigate([AppRoute.Game]);
  }

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
    this.router.navigate([AppRoute.Instructions]);
  }

  public startNewGame(): void {
    this.resetState();
    this.router.navigate([AppRoute.WordLengthSelection]);
  }

  private resetState(): void {
    this.gameStore.update((state) => createInitialState());
  }

  private randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
