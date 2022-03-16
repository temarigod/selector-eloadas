
import * as wordsModule from '../../../assets/words/hangman_words.json';
import { GameState } from './game.store';

export function createInitialState(): GameState {
  return {
    availableWords: getWordsAsStringArray(),
    attemptedLetters: [],
    word: null,
    chosenWordLength: null
  };
}

function getWordsAsStringArray(): string[] {
  const wordsModuleAsStringArray = wordsModule as string[];
  const availableWordsAsArray: string[] = [];

  for (let i = 0; i < wordsModuleAsStringArray.length; i++) {
    availableWordsAsArray[i] = wordsModuleAsStringArray[i];
  }

  return availableWordsAsArray;
}
