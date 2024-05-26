import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { title: "Login", path: "login", component: LoginComponent },
    { title: "Signup", path: "signup", component: SignupComponent },
    { title: "Dashboard", path: "dashboard", component: DashboardComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }];
