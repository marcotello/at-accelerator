import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowTableComponent } from '../tv-show-table/tv-show-table.component';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { TvShow } from "../models/tv-show.model";

@Component({
  selector: 'app-search-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TvShowTableComponent],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit, OnDestroy {

  private fetchInitialTvShowsSubscription: Subscription | undefined;

  tvShowsSignal = signal<TvShow[]>([]);

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.fetchInitialTvShowsSubscription = this.activatedRoute.data.subscribe(({tvShows}) => {
      this.tvShowsSignal.set(tvShows);
    });
  }

  ngOnDestroy(): void {
    this.fetchInitialTvShowsSubscription?.unsubscribe();
  }
}

