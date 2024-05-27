import {Component, inject, input, Signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TvShowDetails} from "../models/tv-show-details.model";
import {DatePipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-tv-show-details',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './tv-show-details.component.html',
  styleUrl: './tv-show-details.component.css'
})
export class TvShowDetailsComponent {

  protected router = inject(Router);

  protected tvShowDetails: Signal<TvShowDetails> = inject(ActivatedRoute).snapshot.data['tvShowDetails'];

  back() {
    history.back();
  }
}
