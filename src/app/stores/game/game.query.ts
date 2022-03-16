import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GameStore } from './game.store';

@Injectable({
  providedIn: 'root',
})
export class GameQuery {
  private get state() {
    return this.store.stateSubject.getValue();
  }

  public get attemptedLetters() {
    const state = this.state;
    return state.attemptedLetters;
  }

  private get word() {
    const state = this.state;
    return state.word;
  }

  private get allLetters() {
    const state = this.state;
    return state.allLetters;
  }

  private get foundCorrectLetters() {
    const attemptedLetters = this.attemptedLetters;
    const word = this.word;
    return attemptedLetters.filter((letter) => (word ?? '').includes(letter));
  }

  private get attemptedInvalidLetters() {
    const attemptedLetters = this.attemptedLetters;
    const word = this.word;
    return attemptedLetters.filter((letter) => !(word ?? '').includes(letter));
  }

  private get attemptedInvalidLettersCount() {
    const attemptedInvalidLetters = this.attemptedInvalidLetters;
    return attemptedInvalidLetters.length;
  }

  private get wordCharactersToDisplay() {
    const word = this.word;
    const foundCorrectLetters = this.foundCorrectLetters;
    return (word ?? '').split('').map((character) => {
      if (foundCorrectLetters.includes(character)) {
        return character;
      } else {
        return '';
      }
    });
  }

  private get wordLength() {
    const word = this.word;
    return (word ?? '').length;
  }

  private get keyboardCharacters() {
    const attemptedLetters = this.attemptedLetters;
    const allLetters = this.allLetters;
    return allLetters.map((character) => {
      const disabled = attemptedLetters.includes(character);
      return {
        character,
        disabled,
      };
    });
  }

  private get gameIsWon() {
    const wordCharactersToDisplay = this.wordCharactersToDisplay;
    return wordCharactersToDisplay.every((characterData) => !!characterData);
  }

  private get gameIsLost() {
    const attemptedInvalidLettersCount = this.attemptedInvalidLettersCount;
    return attemptedInvalidLettersCount >= 10;
  }

  public get gameIsFinished() {
    const gameIsWon = this.gameIsWon;
    const gameIsLost = this.gameIsLost;
    return gameIsWon || gameIsLost;
  }

  private get gameIsInProgress() {
    const gameIsFinished = this.gameIsFinished;
    return !gameIsFinished;
  }

  public allState$ = this.store.stateSubject.asObservable();

  public attemptedInvalidLettersCount$ = this.allState$.pipe(
    map(() => this.attemptedInvalidLettersCount)
  );

  public wordCharactersToDisplay$ = this.allState$.pipe(
    map(() => this.wordCharactersToDisplay)
  );

  public gameIsWon$ = this.allState$.pipe(map(() => this.gameIsWon));

  public gameIsLost$ = this.allState$.pipe(map(() => this.gameIsLost));

  public gameIsInProgress$ = this.allState$.pipe(
    map(() => this.gameIsInProgress)
  );

  public gameIsFinished$ = this.allState$.pipe(map(() => this.gameIsFinished));

  public wordLength$ = this.allState$.pipe(map(() => this.wordLength));

  public keyboardCharacters$ = this.allState$.pipe(
    map(() => this.keyboardCharacters)
  );

  constructor(private store: GameStore) {}
}
