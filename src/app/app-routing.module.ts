import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WorkersiteComponent } from './components/worker/workersite/workersite.component';
import { CompanysiteComponent } from './components/company/companysite/companysite.component';


const routes: Routes = [
  // welcome
  { path: "", component: WelcomeComponent },

  // access
  { path: "login/:userType", component: LoginComponent},
  { path: "register/:userType", component: RegisterComponent},
  { path: "workersite", component: WorkersiteComponent},
  { path: "companysite", component: CompanysiteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
