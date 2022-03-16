import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AppRoute } from '../enums/app-route.enum';
import { GameQuery } from '../stores/game/game.query';

@Injectable({
  providedIn: 'root',
})
export class NotInGameGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly gameQuery: GameQuery
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (!this.gameQuery.word) {
      return true;
    } else {
      return this.router.createUrlTree([AppRoute.Game]);
    }
  }
}
