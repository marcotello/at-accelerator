import {Component, inject, Signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TvShowDetails} from "../models/tv-show-details.model";
import {DatePipe, DecimalPipe, I18nPluralPipe} from "@angular/common";
import {TvShowDetailsService} from "../services/tv-show-details.service";
import {SlideshowCardComponent} from "../slideshow-card/slideshow-card.component";


@Component({
  selector: 'app-tv-show-details',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    I18nPluralPipe,
    SlideshowCardComponent
  ],
  templateUrl: './tv-show-details.component.html',
  styleUrl: './tv-show-details.component.css'
})
export default class TvShowDetailsComponent {

  protected episodeDetailsSignal = inject(TvShowDetailsService).getEpisodeDetails();

  protected router = inject(Router);

  protected tvShowDetails: Signal<TvShowDetails> = inject(ActivatedRoute).snapshot.data['tvShowDetails'];

  back() {
    history.back();
  }

  showImages(id: number)
  {
    console.log('images: ' + id);
  }
}
