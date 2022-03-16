import {
  ChangeDetectionStrategy,
  ChangeDetectorRef, Component, OnDestroy, OnInit
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GameQuery } from 'src/app/stores/game/game.query';

@Component({
  selector: 'app-stickman',
  templateUrl: './stickman.component.html',
  styleUrls: ['./stickman.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickmanComponent implements OnInit, OnDestroy {
  public invalidAttemptsCount: number = 0;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private readonly gameQuery: GameQuery,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.gameQuery.attemptedInvalidLettersCount$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((count) => {
        this.invalidAttemptsCount = count;
        this.cdr.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
