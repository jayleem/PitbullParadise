//Angular modules and components
//
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdoptablesComponent } from './adoptables/adoptables.component';
import { DogListComponent } from './adoptables/dog-list/dog-list.component';
import { DogDetailsComponent } from './adoptables/dog-details/dog-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DogAdoptionFormComponent } from './adoption/dog-adoption-form/dog-adoption-form.component';
import { AdminComponent } from './admin/admin.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { AdminNewComponent } from './admin/admin-new/admin-new.component';
import { AdminUpdateComponent } from './admin/admin-update/admin-update.component';
import { AdminDetailsComponent } from './admin/admin-details/admin-details.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { DonateComponent } from './donate/donate.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'donate', component: DonateComponent },
  {
    path: 'search',
    component: AdoptablesComponent,
    children: [
      { path: '', component: DogListComponent },
      { path: ':params', component: DogDetailsComponent },
    ]
  },
  { path: 'adoption/:params', component: DogAdoptionFormComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AdminLoginComponent, canActivate : [LoginGuard], runGuardsAndResolvers: 'always'},
      { path: 'panel', component: AdminPanelComponent,  canActivate : [AuthGuard], runGuardsAndResolvers: 'always'},
      { path: 'new', component: AdminNewComponent,  canActivate : [AuthGuard], runGuardsAndResolvers: 'always'},
      { path: 'list', component: AdminListComponent,  canActivate : [AuthGuard], runGuardsAndResolvers: 'always'},
      { path: 'update/:params', component: AdminUpdateComponent,  canActivate : [AuthGuard], runGuardsAndResolvers: 'always'},
      { path: 'details/:params', component: AdminDetailsComponent,  canActivate : [AuthGuard], runGuardsAndResolvers: 'always'}
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
