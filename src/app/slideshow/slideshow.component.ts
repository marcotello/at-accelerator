import {Component, input} from '@angular/core';
import {TvShowDetails} from "../models/tv-show-details.model";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css'
})
export class SlideshowComponent {

  currentPictureIndex = 0;
  picturesSignal = input.required<string[]>();

  selectPicture(index: number): void {
    this.currentPictureIndex = index;
  }

  protected readonly onkeydown = onkeydown;
}
