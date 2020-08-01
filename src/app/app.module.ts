import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Angular Default Components
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Angular Generated Components
//
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { JumbotronComponent } from './partials/jumbotron/jumbotron.component';
import { AdoptablesComponent } from './adoptables/adoptables.component';
import { DogDetailsComponent } from './adoptables/dog-details/dog-details.component';
import { DogListComponent } from './adoptables/dog-list/dog-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DogAdoptionFormComponent } from './adoption/dog-adoption-form/dog-adoption-form.component';
import { DonateComponent } from './donate/donate.component';
import { AdminComponent } from './admin/admin.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { AdminNewComponent } from './admin/admin-new/admin-new.component';
import { AdminUpdateComponent } from './admin/admin-update/admin-update.component';
import { AdminDetailsComponent } from './admin/admin-details/admin-details.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AnalyticsComponent } from './admin/analytics/analytics/analytics.component'
import { DbMessageComponent } from './db-message/db-message.component';

//Services
//
import { AdoptableService } from './shared/services/adoptable.service';
import { DbMessageService } from './shared/services/db-message.service';
import { AuthService } from './shared/services/auth.service';
import { HttpInterceptorService } from './shared/services/http-interceptor.service';

//Custom Pipes
//
import { ToNumPipe } from './shared/pipes/to-num.pipe';

//Angular Bootstrap
//
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Charts
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    JumbotronComponent,
    AdoptablesComponent,
    DogDetailsComponent,
    DogListComponent,
    PageNotFoundComponent,
    DogAdoptionFormComponent,
    DonateComponent,
    ToNumPipe,
    AdminComponent,
    AdminListComponent,
    AdminNewComponent,
    AdminUpdateComponent,
    AdminDetailsComponent,
    AdminLoginComponent,
    DbMessageComponent,
    AdminPanelComponent,
    AdminNavComponent,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    AdoptableService, AuthService, DbMessageService, Title, Meta,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
