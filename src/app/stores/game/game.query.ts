import { Injectable } from '@angular/core';
import { createSelector, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameState, GameStore } from './game.store';

@Injectable({
  providedIn: 'root',
})
export class GameQuery {
  private selectState = (state: GameState) => state;

  private selectAttemptedLetters = createSelector(
    this.selectState,
    (state) => state.attemptedLetters
  );

  private selectWord = createSelector(this.selectState, (state) => state.word);

  private selectAllLetters = createSelector(
    this.selectState,
    (state) => state.allLetters
  );

  private selectFoundCorrectLetters = createSelector(
    this.selectAttemptedLetters,
    this.selectWord,
    (attemptedLetters, word) =>
      attemptedLetters.filter((letter) => (word ?? '').includes(letter))
  );

  private selectAttemptedInvalidLetters = createSelector(
    this.selectAttemptedLetters,
    this.selectWord,
    (attemptedLetters, word) =>
      attemptedLetters.filter((letter) => !(word ?? '').includes(letter))
  );

  private selectAttemptedInvalidLettersCount = createSelector(
    this.selectAttemptedInvalidLetters,
    (attemptedInvalidLetters) => attemptedInvalidLetters.length
  );

  private selectWordCharactersToDisplay = createSelector(
    this.selectWord,
    this.selectFoundCorrectLetters,
    (word, foundCorrectLetters) => {
      return (word ?? '').split('').map((character) => {
        if (foundCorrectLetters.includes(character)) {
          return character;
        } else {
          return '';
        }
      });
    }
  );

  private selectWordLength = createSelector(
    this.selectWord,
    (word) => (word ?? '').length
  );

  private selectKeyboardCharacters = createSelector(
    this.selectAttemptedLetters,
    this.selectAllLetters,
    (attemptedLetters, allLetters) => {
      return allLetters.map((character) => {
        const disabled = attemptedLetters.includes(character);
        return {
          character,
          disabled,
        };
      });
    }
  );

  private selectGameIsWon = createSelector(
    this.selectWordCharactersToDisplay,
    (wordCharactersToDisplay) => {
      return wordCharactersToDisplay.every((characterData) => !!characterData);
    }
  );

  private selectGameIsLost = createSelector(
    this.selectAttemptedInvalidLettersCount,
    (attemptedInvalidLettersCount) => {
      return attemptedInvalidLettersCount >= 10;
    }
  );

  private selectGameIsFinished = createSelector(
    this.selectGameIsWon,
    this.selectGameIsLost,
    (won, lost) => {
      return won || lost;
    }
  );

  private selectGameIsInProgress = createSelector(
    this.selectGameIsWon,
    this.selectGameIsLost,
    (won, lost) => {
      return !won && !lost;
    }
  );

  public allState$ = this.store.stateSubject.asObservable();

  public attemptedInvalidLettersCount$ = this.ngRxSelect$(
    this.selectAttemptedInvalidLettersCount
  );

  public wordCharactersToDisplay$ = this.ngRxSelect$(
    this.selectWordCharactersToDisplay
  );

  public gameIsWon$ = this.ngRxSelect$(this.selectGameIsWon);

  public gameIsLost$ = this.ngRxSelect$(this.selectGameIsLost);

  public gameIsInProgress$ = this.ngRxSelect$(this.selectGameIsInProgress);

  public gameIsFinished$ = this.ngRxSelect$(this.selectGameIsFinished);

  public wordLength$ = this.ngRxSelect$(this.selectWordLength);

  public keyboardCharacters$ = this.ngRxSelect$(this.selectKeyboardCharacters);

  public get word(): string | null {
    return this.ngRxSelect(this.selectWord);
  }

  public get attemptedInvalidLetters(): string[] {
    return this.ngRxSelect(this.selectAttemptedInvalidLetters);
  }

  public get attemptedLetters(): string[] {
    return this.ngRxSelect(this.selectAttemptedLetters);
  }

  public get gameIsFinished(): boolean {
    return this.ngRxSelect(this.selectGameIsFinished);
  }

  constructor(private store: GameStore) {}

  private ngRxSelect$<GameState, K>(
    mapFn: (state: GameState) => K
  ): Observable<K> {
    return this.allState$.pipe(select(mapFn as any));
  }

  private ngRxSelect<GameState, K>(mapFn: (state: GameState) => K): K {
    return mapFn(this.store.stateSubject.getValue() as any);
  }
}
