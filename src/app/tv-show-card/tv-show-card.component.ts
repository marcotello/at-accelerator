import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TvShowDetails} from "../models/tv-show-details.model";
import {DatePipe, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tv-show-card',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    NgStyle
  ],
  templateUrl: './tv-show-card.component.html',
  styleUrl: './tv-show-card.component.css'
})
export class TvShowCardComponent {

  @Input({ required: true }) tvShow!: TvShowDetails;

  @Output() tvShowId = new EventEmitter<number>();

  removeTvShowFromFavorites(id: number) {
    this.tvShowId.emit(id);
  }
}
