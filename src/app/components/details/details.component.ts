import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  gameRating = 0;
  gameID: string = '';
  game!: Game;
  routeSub: Subscription = new Subscription;
  gameSub: Subscription = new Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameID = params['id'];
      this.getGameDetails(this.gameID);
    });
  }

  getGameDetails(id: string): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;

        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000)
      });
  }

  getColor(value: number): string {
    if(value > 75) {
      return '#5ee432';
    } else if(value > 50) {
      return '#fffa50';
    } else if(value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  ngOnDestroy(): void {
    if(this.routeSub) {
      this.routeSub.unsubscribe();
    }

    if(this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }

}
