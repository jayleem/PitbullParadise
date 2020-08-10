import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderModule } from '../shared/modules/header/header.module';
import { FooterModule } from '../shared/modules/footer/footer.module';
import { JumbotronModule } from '../shared/modules/jumbotron/jumbotron.module';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminNewComponent } from './admin-new/admin-new.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DbMessageComponent } from '../db-message/db-message.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AnalyticsComponent } from './analytics/analytics/analytics.component';
import { ToNumModule } from '../shared/modules/to-num/to-num.module';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminListComponent,
    AdminNewComponent,
    AdminUpdateComponent,
    AdminDetailsComponent,
    AdminLoginComponent,
    DbMessageComponent,
    AdminPanelComponent,
    AdminNavComponent,
    AnalyticsComponent,
    AdminDashboardComponent
  ],
  exports: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HeaderModule,
    FooterModule,
    JumbotronModule,
    ToNumModule,
    ChartsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
