import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdoptablesComponent } from './adoptables/adoptables.component';
import { DogListComponent } from './adoptables/dog-list/dog-list.component';
import { DogDetailsComponent } from './adoptables/dog-details/dog-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'search',
    component: AdoptablesComponent,
    children: [
      { path: '', component: DogListComponent },
      { path: ':params', component: DogDetailsComponent },
    ]
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
