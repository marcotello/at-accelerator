import {Component, EventEmitter, input, Output} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {TvShowNextEpisodePipe} from "../pipes/tv-show-next-episode.pipe";
import {TvShowDetails} from "../models/tv-show-details.model";
import {SlideshowComponent} from "../slideshow/slideshow.component";

@Component({
  selector: 'app-slideshow-card',
  standalone: true,
  imports: [
    CardComponent,
    TvShowNextEpisodePipe,
    SlideshowComponent
  ],
  templateUrl: './slideshow-card.component.html',
  styleUrl: './slideshow-card.component.css'
})
export class SlideshowCardComponent {

  tvShowSignal = input.required<TvShowDetails>();
  @Output() closeDialogEvent = new EventEmitter<boolean>();

  closeDialog() {
    this.closeDialogEvent.emit(true);
  }
}
