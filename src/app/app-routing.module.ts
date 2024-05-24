import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchViewComponent} from './search-view/search-view.component';
import {FavoritesViewComponent} from "./favorites-view/favorites-view.component";
import {fetchPopularShowsResolver} from "./resolvers/fetch-popular-shows.resolver";
import {TvShowDetailsComponent} from "./tv-show-details/tv-show-details.component";
import {fetchTvShowDetailsResolver} from "./resolvers/fetch-tv-show-details.resolver";

const routes: Routes = [
  {
    path: "",
    redirectTo: "search",
    pathMatch: 'full'
  },
  {
    path: "search",
    component: SearchViewComponent,
    resolve: { tvShows: fetchPopularShowsResolver},
  },
  {
    path: "favorites",
    component: FavoritesViewComponent
  },
  {
    path: "details/:tvShowId",
    component: TvShowDetailsComponent,
    resolve: { tvShowDetails: fetchTvShowDetailsResolver},
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
