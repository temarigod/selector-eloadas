import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameQuery } from 'src/app/stores/game/game.query';
import { GameService } from 'src/app/stores/game/game.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardComponent implements OnInit {
  constructor(
    public readonly gameQuery: GameQuery,
    private readonly gameService: GameService
  ) {}

  ngOnInit(): void {}

  public selectCharacter(character: string): void {
    this.gameService.selectCharacter(character);
  }
}
