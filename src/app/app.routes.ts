import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { pageBlockGuard } from './page-block.guard';
import { ProfileComponent } from './profile/profile.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { Component } from '@angular/core';
import { PasswordRecComponent } from './password-rec/password-rec.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent, canActivate: [pageBlockGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [pageBlockGuard],
  },
  { path: 'singup', component: SingUpComponent },
  { path: 'passwordRec', component: PasswordRecComponent },
];
