import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppRoute } from './enums/app-route.enum';
import { GameModule } from './pages/game/game.module';

// We could lazy load these sub pages by replacing of with dynamic import, but it is not necessary now
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: AppRoute.Game,
          loadChildren: () => of(GameModule),
        },
        {
          path: '**',
          redirectTo: AppRoute.Game,
        },
      ],
      {
        scrollPositionRestoration: 'top',
      }
    ),
  ],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
