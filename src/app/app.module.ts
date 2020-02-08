import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { WorkersiteComponent } from './components/worker/workersite/workersite.component';
import { CompanysiteComponent } from './components/company/companysite/companysite.component';
import { ProfileComponent } from './components/profile/profile.component';
import { JobpillComponent } from './components/job/jobpill/jobpill.component';
import { JobdetailComponent } from './components/job/jobdetail/jobdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    WorkersiteComponent,
    CompanysiteComponent,
    ProfileComponent,
    JobpillComponent,
    JobdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
