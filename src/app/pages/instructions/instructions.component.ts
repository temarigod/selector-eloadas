import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameQuery } from 'src/app/stores/game/game.query';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstructionsComponent implements OnInit {
  constructor(public readonly gameQuery: GameQuery) {}

  ngOnInit(): void {}
}
