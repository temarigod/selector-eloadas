import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppRoute } from './enums/app-route.enum';
import { GameGuard } from './guards/game.guard';
import { NotInGameGuard } from './guards/not-in-game.guard';
import { GameModule } from './pages/game/game.module';
import { InstructionsModule } from './pages/instructions/instructions.module';
import { WordLengthSelectorModule } from './pages/word-length-selector/word-length-selector.module';

// We could lazy load these sub pages by replacing of with dynamic import, but it is not necessary now
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: AppRoute.Instructions,
          loadChildren: () => of(InstructionsModule),
          pathMatch: 'full'
        },
        {
          path: AppRoute.WordLengthSelection,
          loadChildren: () => of(WordLengthSelectorModule),
          canActivate: [NotInGameGuard],
        },
        {
          path: AppRoute.Game,
          loadChildren: () => of(GameModule),
          canActivate: [GameGuard],
        },
        {
          path: '**',
          redirectTo: AppRoute.Instructions,
        },
      ],
      {
        scrollPositionRestoration: 'top',
      }
    ),
  ],
  providers: [GameGuard, NotInGameGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
