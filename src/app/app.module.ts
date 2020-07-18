import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { DbMessageComponent } from './db-message/db-message.component';

//Services
//
import { AdoptableService } from './shared/services/adoptable.service';

//Custom Pipes
//
import { ToNumPipe } from './shared/pipes/to-num.pipe';

//Angular Bootstrap
//
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
    DbMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AdoptableService, AuthService, DbMessageService, Title, Meta
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
