import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameQuery } from 'src/app/stores/game/game.query';
import { GameService } from 'src/app/stores/game/game.service';

@Component({
  selector: 'app-word-length-selector',
  templateUrl: './word-length-selector.component.html',
  styleUrls: ['./word-length-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordLengthSelectorComponent implements OnInit {
  public selectedLength!: number | 'random';

  constructor(
    public readonly gameQuery: GameQuery,
    private readonly gameService: GameService
  ) {}

  ngOnInit(): void {
    this.selectedLength = this.gameQuery.availableWordLengths[0];
  }

  public selectWordLength(wordLength: number): void {
    this.selectedLength = wordLength;
  }

  public selectRandom(): void {
    this.selectedLength = 'random';
  }

  public goNext(): void {
    this.gameService.selectWordLength(this.selectedLength);
  }
}
