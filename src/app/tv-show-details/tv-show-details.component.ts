import {Component, inject, input, signal, Signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TvShowDetails} from "../models/tv-show-details.model";
import {DatePipe, DecimalPipe, I18nPluralPipe} from "@angular/common";
import {TvShowsHttpService} from "../services/tv-shows-http.service";

@Component({
  selector: 'app-tv-show-details',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    I18nPluralPipe
  ],
  templateUrl: './tv-show-details.component.html',
  styleUrl: './tv-show-details.component.css'
})
export default class TvShowDetailsComponent {

  protected episodeDetailsSignal = inject(TvShowsHttpService).getEpisodeDetails();

  protected router = inject(Router);

  protected tvShowDetails: Signal<TvShowDetails> = inject(ActivatedRoute).snapshot.data['tvShowDetails'];

  back() {
    history.back();
  }
}
