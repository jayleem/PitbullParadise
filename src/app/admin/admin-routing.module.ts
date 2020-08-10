import { NgModule } from '@angular/core';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LoginGuard } from '../shared/guards/login.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AdminNewComponent } from './admin-new/admin-new.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [  
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AdminLoginComponent, canActivate : [LoginGuard], runGuardsAndResolvers: 'always'},
      { 
        path: 'dashboard', component: AdminDashboardComponent,  canActivate : [AuthGuard], runGuardsAndResolvers: 'always',
        children: [
          { path: '', redirectTo: 'analytics', pathMatch: 'full' },
          { path: 'analytics', component: AdminPanelComponent,  canActivate : [AuthGuard], runGuardsAndResolvers: 'always'},
          { path: 'new', component: AdminNewComponent,  canActivate : [AuthGuard], runGuardsAndResolvers: 'always'},
          { path: 'list', component: AdminListComponent,  canActivate : [AuthGuard], runGuardsAndResolvers: 'always'},
          { path: 'update/:params', component: AdminUpdateComponent,  canActivate : [AuthGuard], runGuardsAndResolvers: 'always'},
          { path: 'details/:params', component: AdminDetailsComponent,  canActivate : [AuthGuard], runGuardsAndResolvers: 'always'}
        ]
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [
    RouterModule]
})
export class AdminRoutingModule { }
