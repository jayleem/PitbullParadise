//Angular Default Components
//
import { NgModule } from '@angular/core';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Angular Generated Components
//
import { HomeComponent } from './home/home.component';
import { AdoptablesComponent } from './adoptables/adoptables.component';
import { DogDetailsComponent } from './adoptables/dog-details/dog-details.component';
import { DogListComponent } from './adoptables/dog-list/dog-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DogAdoptionFormComponent } from './adoption/dog-adoption-form/dog-adoption-form.component';
import { DonateComponent } from './donate/donate.component';

//Services
//
import { AdoptableService } from './shared/services/adoptable.service';
import { DbMessageService } from './shared/services/db-message.service';
import { AuthService } from './shared/services/auth.service';
import { HttpInterceptorService } from './shared/services/http-interceptor.service';

//Angular Bootstrap
//
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Charts
//
import { ChartsModule } from 'ng2-charts';

//socket.io configuration
//
import { SocketIoModule, SocketIoConfig } from '@hreimer/ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

//shared modules
//
import { HeaderModule } from './shared/modules/header/header.module';
import { FooterModule } from './shared/modules/footer/footer.module';
import { JumbotronModule } from './shared/modules/jumbotron/jumbotron.module';
import { ToNumModule } from './shared/modules/to-num/to-num.module';//contains custom pipe ToNum used in most of the adoptable components
import { BackButtonModule } from './shared/modules/back-button/back-button.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdoptablesComponent,
    DogDetailsComponent,
    DogListComponent,
    PageNotFoundComponent,
    DogAdoptionFormComponent,
    DonateComponent
  ],
  imports: [
    HeaderModule,
    FooterModule,
    JumbotronModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToNumModule,
    BackButtonModule,
    SocketIoModule.forRoot(config)//socket.io
  ],
  providers: [
    AdoptableService, AuthService, DbMessageService, Title, Meta,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
