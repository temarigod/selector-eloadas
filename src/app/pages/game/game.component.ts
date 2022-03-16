import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppRoute } from 'src/app/enums/app-route.enum';
import { GameQuery } from 'src/app/stores/game/game.query';
import { GameService } from 'src/app/stores/game/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
  AppRoute = AppRoute;

  constructor(
    public readonly gameQuery: GameQuery,
    private readonly gameService: GameService
  ) {}

  ngOnInit(): void {}

  endGame(): void {
    this.gameService.endGame();
  }

  startNewGame(): void {
    this.gameService.startNewGame();
  }
}
