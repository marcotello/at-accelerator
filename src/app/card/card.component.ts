import {Component, Input} from '@angular/core';
import {TvShowNextEpisodePipe} from "../pipes/tv-show-next-episode.pipe";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    TvShowNextEpisodePipe,
    NgStyle
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input({ required: true }) title!: string;
  @Input({ required: true }) cardWidth!: number;

}
