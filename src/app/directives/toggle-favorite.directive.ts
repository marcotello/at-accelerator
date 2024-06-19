import {Directive, HostBinding, HostListener, Input} from '@angular/core';
import {FavoritesService} from "../services/favorites.service";

@Directive({
  selector: '[appToggleFavorite]',
  standalone: true
})
export class ToggleFavoriteDirective {
  @Input({required: true, alias: 'appToggleFavorite'})
  tvShowId!: number;

  constructor(private favoritesService: FavoritesService) {}

  @HostBinding('class')
  myClass = '';

  @HostListener('click')
  onClick(){
    this.favoritesService.toggleFavorite(this.tvShowId);
  }
}
