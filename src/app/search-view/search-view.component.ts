import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowTableComponent } from '../tv-show-table/tv-show-table.component';
import { ActivatedRoute } from "@angular/router";
import {of, Subscription} from "rxjs";
import { TvShow } from "../models/tv-show.model";
import {FormsModule} from "@angular/forms";
import {TvShowsHttpService} from "../services/tv-shows-http.service";

@Component({
  selector: 'app-search-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TvShowTableComponent, FormsModule],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit, OnDestroy {

  private fetchInitialTvShowsSubscription: Subscription | undefined;
  private searchTvShowsSubscription: Subscription | undefined;

  tvShowName: string= '';

  tvShowsSignal = signal<TvShow[]>([]);

  constructor(private activatedRoute: ActivatedRoute, private tvShowsHttpService: TvShowsHttpService) {
  }

  ngOnInit(): void {
    this.fetchInitialTvShowsSubscription = this.activatedRoute.data.subscribe(({tvShows}) => {
      this.tvShowsSignal.set(tvShows);
    });
  }

  ngOnDestroy(): void {
    this.fetchInitialTvShowsSubscription?.unsubscribe();
    this.searchTvShowsSubscription?.unsubscribe();
  }

  searchTvShow(): void {
    this.searchTvShowsSubscription = this.tvShowsHttpService.searchTVShows(this.tvShowName).subscribe(tvShows => {
      this.tvShowsSignal.set(tvShows);
    });
  }
}

