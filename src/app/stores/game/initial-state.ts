
import { characters } from './characters';
import { GameState } from './game.store';

export function createInitialState(): GameState {
  return {
    attemptedLetters: [],
    word: 'performance',
    allLetters: characters
  };
}
