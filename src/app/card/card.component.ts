import {Component, Input} from '@angular/core';
import {TvShowNextEpisodePipe} from "../pipes/tv-show-next-episode.pipe";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    TvShowNextEpisodePipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input({ required: true }) title!: string;

}
