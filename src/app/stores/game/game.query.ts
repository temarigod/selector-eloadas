import { Injectable } from '@angular/core';
import {
  auditTime,
  combineLatest,
  distinctUntilChanged,
  map
} from 'rxjs';
import { GameStore } from './game.store';

@Injectable({
  providedIn: 'root',
})
export class GameQuery {
  private allState$ = this.store.stateSubject.asObservable();

  public attemptedLetters$ = this.allState$.pipe(
    map((state) => state.attemptedLetters),
    distinctUntilChanged()
  );

  private word$ = this.allState$.pipe(
    map((state) => state.word),
    distinctUntilChanged()
  );

  private allLetters$ = this.allState$.pipe(
    map((state) => state.allLetters),
    distinctUntilChanged()
  );

  private foundCorrectLetters$ = combineLatest([
    this.attemptedLetters$,
    this.word$,
  ]).pipe(
    auditTime(0),
    distinctUntilChanged(),
    map(([attemptedLetters, word]) => {
      return attemptedLetters.filter((letter) => (word ?? '').includes(letter));
    })
  );

  private attemptedInvalidLetters$ = combineLatest([
    this.attemptedLetters$,
    this.word$,
  ]).pipe(
    auditTime(0),
    distinctUntilChanged(),
    map(([attemptedLetters, word]) => {
      return attemptedLetters.filter(
        (letter) => !(word ?? '').includes(letter)
      );
    })
  );

  public attemptedInvalidLettersCount$ = this.attemptedInvalidLetters$.pipe(
    map((attemptedInvalidLetters) => {
      return attemptedInvalidLetters.length;
    }),
    distinctUntilChanged()
  );

  public wordCharactersToDisplay$ = combineLatest([
    this.word$,
    this.foundCorrectLetters$,
  ]).pipe(
    auditTime(0),
    distinctUntilChanged(),
    map(([word, foundCorrectLetters]) => {
      return (word ?? '').split('').map((character) => {
        if (foundCorrectLetters.includes(character)) {
          return character;
        } else {
          return '';
        }
      });
    })
  );

  public wordLength$ = this.word$.pipe(map((word) => (word ?? '').length));

  public keyboardCharacters$ = combineLatest([
    this.attemptedLetters$,
    this.allLetters$,
  ]).pipe(
    auditTime(0),
    distinctUntilChanged(),
    map(([attemptedLetters, allLetters]) => {
      return allLetters.map((character) => {
        const disabled = attemptedLetters.includes(character);
        return {
          character,
          disabled,
        };
      });
    })
  );

  public gameIsWon$ = this.wordCharactersToDisplay$.pipe(
    map((wordCharactersToDisplay) => {
      return wordCharactersToDisplay.every((characterData) => !!characterData);
    }),
    distinctUntilChanged()
  );

  public gameIsLost$ = this.attemptedInvalidLettersCount$.pipe(
    map((attemptedInvalidLettersCount) => {
      return attemptedInvalidLettersCount >= 10;
    }),
    distinctUntilChanged()
  );

  public gameIsFinished$ = combineLatest([
    this.gameIsWon$,
    this.gameIsLost$,
  ]).pipe(
    auditTime(0),
    distinctUntilChanged(),
    map(([won, lost]) => {
      return won || lost;
    }),
    distinctUntilChanged()
  );

  public gameIsInProgress$ = this.gameIsFinished$.pipe(
    map((gameIsFinished) => {
      return !gameIsFinished;
    }),
    distinctUntilChanged()
  );

  constructor(private store: GameStore) {}
}
