import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameQuery } from 'src/app/stores/game/game.query';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordComponent implements OnInit {

  constructor(public readonly gameQuery: GameQuery) { }

  ngOnInit(): void {
  }

}
