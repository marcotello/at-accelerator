import {Directive, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {FavoritesService} from "../services/favorites.service";

@Directive({
  selector: '[appToggleFavorite]',
  standalone: true
})
export class ToggleFavoriteDirective implements OnInit {
  @Input() tvShowId!: number;
  @Input() isFavorite: boolean = false;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    if (!this.tvShowId) {
      console.error('Error: appToggleFavorite directive requires a tvShowId input string.');
      throw new Error('appToggleFavorite directive requires a tvShowId input string.');
    }
  }

  @HostBinding('class')
  myClass = '';

  @HostListener('click')
  onClick(){
    this.favoritesService.toggleFavorite(this.tvShowId);
  }
}
